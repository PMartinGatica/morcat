/**
 * MORCAT — Escena arquitectónica Three.js.
 *
 * Concepto: una vivienda abstracta que "se construye"
 * progresivamente — primero el relevamiento de puntos del
 * terreno, luego la planta, las paredes, la cubierta y por
 * último las aberturas en dorado; al final el volumen
 * translúcido se materializa. Cámara con deriva lenta,
 * paralaje mínimo al mouse y ligera reacción al scroll.
 *
 * Desacoplada del contenido: recibe un <canvas> y se gestiona
 * sola (resize, visibility, reduced-motion, dispose).
 */
import * as THREE from 'three';
import { createRenderer } from './createRenderer';
import { CameraController } from './cameraController';
import { createSceneMaterials, disposeMaterials } from './materials';
import { disposeObject3D, disposeRenderer } from './cleanup';
import {
  detectQuality,
  detailFactor,
  prefersReducedMotion,
  shouldUseStaticFallback,
  supportsWebGL,
} from './performance';

export interface ArchitectureSceneHandle {
  /** true si la escena WebGL pudo crearse. */
  isSupported: boolean;
  start(): void;
  dispose(): void;
}

export interface ArchitectureSceneOptions {
  canvas: HTMLCanvasElement;
  /** Enfoque preferido; 'auto' detecta por hardware. */
  quality?: 'auto' | 'low' | 'high';
}

/* ------------------------------------------------------------------ */
/* Geometría de la vivienda (secuencia de construcción)                 */
/* ------------------------------------------------------------------ */

interface HouseGeometry {
  geometry: THREE.BufferGeometry;
  /** Cantidad de segmentos de la secuencia principal. */
  segmentCount: number;
  /** Líneas doradas (aberturas) incluidas en la secuencia. */
  goldStart: number;
}

const HOUSE = {
  w: 3.2, // ancho (x)
  d: 2.6, // profundidad (z)
  h: 1.7, // altura de muro (y)
  r: 1.15, // altura de cumbrera sobre el muro
};

function buildHouseGeometry(): HouseGeometry {
  const { w, d, h, r } = HOUSE;
  const hw = w / 2;
  const hd = d / 2;
  const ridge = h + r;

  // Esquinas de la planta (sentido horario visto desde arriba)
  const corners = [
    new THREE.Vector3(-hw, 0, -hd), // 0
    new THREE.Vector3(hw, 0, -hd), // 1
    new THREE.Vector3(hw, 0, hd), // 2
    new THREE.Vector3(-hw, 0, hd), // 3
  ];
  const tops = corners.map((c) => c.clone().setY(h));
  const ridgeEnds = [
    new THREE.Vector3(-hw, ridge, 0),
    new THREE.Vector3(hw, ridge, 0),
  ];

  const segments: [THREE.Vector3, THREE.Vector3, boolean][] = [];

  // Fase 1 — Planta (6 segmentos: perímetro + diagonales)
  for (let i = 0; i < 4; i++) segments.push([corners[i], corners[(i + 1) % 4], false]);
  segments.push([corners[0], corners[2], false]);
  segments.push([corners[1], corners[3], false]);

  // Fase 2 — Paredes: vértices verticales + perímetro superior
  for (const c of corners) segments.push([c, c.clone().setY(h), false]);
  for (let i = 0; i < 4; i++) segments.push([tops[i], tops[(i + 1) % 4], false]);

  // Fase 3 — Cubierta: cumbrera + pendientes
  segments.push([ridgeEnds[0], ridgeEnds[1], false]);
  segments.push([ridgeEnds[0], corners[0].clone().setY(h), false]);
  segments.push([ridgeEnds[0], corners[3].clone().setY(h), false]);
  segments.push([ridgeEnds[1], corners[1].clone().setY(h), false]);
  segments.push([ridgeEnds[1], corners[2].clone().setY(h), false]);

  // Fase 4 — Aberturas (dorado): puerta + 2 ventanas
  const doorW = 0.42;
  const doorH = 0.85;
  const doorBase = new THREE.Vector3(0, 0.06, hd + 0.001);
  const doorCorners = [
    doorBase.clone().add(new THREE.Vector3(-doorW / 2, 0, 0)),
    doorBase.clone().add(new THREE.Vector3(doorW / 2, 0, 0)),
    doorBase.clone().add(new THREE.Vector3(doorW / 2, doorH, 0)),
    doorBase.clone().add(new THREE.Vector3(-doorW / 2, doorH, 0)),
  ];
  for (let i = 0; i < 4; i++) segments.push([doorCorners[i], doorCorners[(i + 1) % 4], true]);

  const winW = 0.5;
  const winH = 0.55;
  const winY = 0.75;
  for (const wx of [-0.95, 0.95]) {
    const c = [
      new THREE.Vector3(wx - winW / 2, winY, hd + 0.001),
      new THREE.Vector3(wx + winW / 2, winY, hd + 0.001),
      new THREE.Vector3(wx + winW / 2, winY + winH, hd + 0.001),
      new THREE.Vector3(wx - winW / 2, winY + winH, hd + 0.001),
    ];
    for (let i = 0; i < 4; i++) segments.push([c[i], c[(i + 1) % 4], true]);
  }

  const goldStart = segments.findIndex(([, , g]) => g);
  const positions = new Float32Array(segments.length * 6);
  const colors = new Float32Array(segments.length * 6);
  const MAIN = new THREE.Color(0xf4f2ec).multiplyScalar(0.85);
  const GOLD = new THREE.Color(0xd39a29);

  segments.forEach(([a, b, gold], i) => {
    const o = i * 6;
    positions[o] = a.x;
    positions[o + 1] = a.y;
    positions[o + 2] = a.z;
    positions[o + 3] = b.x;
    positions[o + 4] = b.y;
    positions[o + 5] = b.z;
    const c = gold ? GOLD : MAIN;
    colors[o] = c.r;
    colors[o + 1] = c.g;
    colors[o + 2] = c.b;
    colors[o + 3] = c.r;
    colors[o + 4] = c.g;
    colors[o + 5] = c.b;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setDrawRange(0, 0);

  return { geometry, segmentCount: segments.length, goldStart };
}

/** Volumen translúcido final (caja + cubierta a dos aguas). */
function buildVolumeGeometry(): THREE.BufferGeometry {
  const { w, d, h, r } = HOUSE;
  const hw = w / 2;
  const hd = d / 2;
  const ridge = h + r;

  // Prisma: base + 4 paredes + 2 faldones de techo
  const pts = [
    [-hw, 0, -hd],
    [hw, 0, -hd],
    [hw, 0, hd],
    [-hw, 0, hd],
    [-hw, h, -hd],
    [hw, h, -hd],
    [hw, h, hd],
    [-hw, h, hd],
    [-hw, ridge, 0],
    [hw, ridge, 0],
  ] as const;

  const faces: [number, number, number][] = [
    // base
    [0, 2, 1],
    [0, 3, 2],
    // paredes
    [4, 5, 1],
    [4, 1, 0],
    [5, 6, 2],
    [5, 2, 1],
    [6, 7, 3],
    [6, 3, 2],
    [7, 4, 0],
    [7, 0, 3],
    // techos
    [7, 9, 4],
    [4, 9, 5],
    [6, 8, 7],
    [6, 9, 8],
  ];

  const positions = new Float32Array(faces.length * 9);
  faces.forEach(([a, b, c], i) => {
    const o = i * 9;
    for (const [j, idx] of [[o, a], [o + 3, b], [o + 6, c]] as const) {
      positions[j] = pts[idx][0];
      positions[j + 1] = pts[idx][1];
      positions[j + 2] = pts[idx][2];
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

/** Campo de puntos del terreno (relevamiento) — determinístico. */
function buildPointsField(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  let seed = 20240517;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const half = 7;
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * half * 2;
    positions[i * 3 + 1] = 0.005;
    positions[i * 3 + 2] = (rand() - 0.5) * half * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

/** Silueta de montañas (homenaje al entorno fueguino). */
function buildMountains(): THREE.BufferGeometry {
  const peaks: [number, number][] = [
    [-14, 1.1],
    [-11, 3.4],
    [-9.4, 2.2],
    [-7.6, 4.6],
    [-5.6, 2.8],
    [-3.4, 5.1],
    [-1.2, 3.0],
    [1.4, 4.4],
    [3.6, 2.6],
    [5.8, 4.9],
    [8.0, 2.4],
    [10.4, 3.8],
    [13, 1.2],
  ];
  const positions = new Float32Array(peaks.length * 3);
  peaks.forEach(([x, y], i) => {
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = -9.5;
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geometry;
}

/* ------------------------------------------------------------------ */
/* Escena                                                              */
/* ------------------------------------------------------------------ */

export function createArchitectureScene(
  opts: ArchitectureSceneOptions,
): ArchitectureSceneHandle {
  const { canvas } = opts;

  if (!supportsWebGL() || shouldUseStaticFallback()) {
    return { isSupported: false, start: () => {}, dispose: () => {} };
  }

  const quality = opts.quality === 'auto' || !opts.quality ? detectQuality() : opts.quality;
  const reducedMotion = prefersReducedMotion();
  const factor = detailFactor(quality);

  let renderer: THREE.WebGLRenderer | null = null;
  try {
    renderer = createRenderer(canvas, { quality });
  } catch {
    return { isSupported: false, start: () => {}, dispose: () => {} };
  }

  const scene = new THREE.Scene();
  const materials = createSceneMaterials();

  // --- Vivienda en construcción ---
  const house = buildHouseGeometry();
  const houseLines = new THREE.LineSegments(house.geometry, new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
  }));
  scene.add(houseLines);

  const volumeMesh = new THREE.Mesh(buildVolumeGeometry(), materials.volume);
  volumeMesh.visible = false;
  scene.add(volumeMesh);

  // --- Terreno: puntos de relevamiento ---
  const pointCount = Math.round(260 * factor);
  const points = new THREE.Points(buildPointsField(pointCount), materials.points);
  scene.add(points);

  // --- Grilla base sutil ---
  const grid = new THREE.GridHelper(16, 16, 0x163450, 0x0f2236);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.55;
  scene.add(grid);

  // --- Montañas al fondo ---
  const mountains = new THREE.Line(buildMountains(), materials.mountainLine);
  scene.add(mountains);

  // --- Cámara ---
  const controller = new CameraController(canvas.clientWidth / Math.max(canvas.clientHeight, 1));

  // --- Estado de animación ---
  const CYCLE = 9.5; // duración del ciclo de construcción (s)
  const revealEnd = 0.74; // fracción del ciclo dedicada a dibujar líneas
  const totalVerts = house.segmentCount * 2;
  const goldVerts = (house.segmentCount - house.goldStart) * 2;
  const mainVerts = totalVerts - goldVerts;

  let rafId = 0;
  let running = false;
  let lastTime = 0;
  let elapsed = 0;
  let disposed = false;
  let paused = false;

  const input = { pointerX: 0, pointerY: 0, scroll: 0 };

  function easeInOut(p: number): number {
    return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  }

  function updateProgress(p: number): void {
    // p en [0, 1] del ciclo total
    const reveal = Math.min(1, p / revealEnd);
    const eased = easeInOut(reveal);

    const drawnMain = Math.floor(mainVerts * eased);
    const goldProgress = Math.max(0, (eased - 0.82) / 0.18);
    const drawnGold = Math.floor(goldVerts * Math.min(1, goldProgress));
    house.geometry.setDrawRange(0, drawnMain + drawnGold);

    // Volumen translúcido al final
    const volP = Math.max(0, (p - 0.74) / 0.1);
    volumeMesh.visible = volP > 0;
    materials.volume.opacity = 0.075 * Math.min(1, volP);

    // Puntos: aparecen con la planta
    materials.points.opacity = 0.65 * Math.min(1, reveal * 2.4);
  }

  function renderStatic(): void {
    updateProgress(1);
    controller.frameStatic();
    if (renderer) renderer.render(scene, controller.camera);
  }

  function frame(now: number): void {
    if (disposed) return;
    if (!lastTime) lastTime = now;
    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    if (!paused) {
      elapsed += dt;
      const p = (elapsed % CYCLE) / CYCLE;
      updateProgress(p);
      controller.update(dt, input);
    }

    if (renderer) renderer.render(scene, controller.camera);
    rafId = requestAnimationFrame(frame);
  }

  // --- Eventos ---
  function onResize(): void {
    if (!renderer) return;
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    controller.resize(w / h);
    renderer.setSize(w, h, false);
  }
  const ro = new ResizeObserver(onResize);
  ro.observe(canvas);

  function onVisibility(): void {
    paused = document.hidden;
    if (!document.hidden) lastTime = 0;
  }
  document.addEventListener('visibilitychange', onVisibility);

  function onPointer(e: PointerEvent): void {
    input.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    input.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  }
  window.addEventListener('pointermove', onPointer, { passive: true });

  function onScroll(): void {
    input.scroll = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 1.6)));
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- API pública ---
  function start(): void {
    if (running || disposed) return;
    running = true;
    onResize();
    if (reducedMotion) {
      renderStatic();
      return;
    }
    rafId = requestAnimationFrame(frame);
  }

  function dispose(): void {
    if (disposed) return;
    disposed = true;
    running = false;
    cancelAnimationFrame(rafId);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    ro.disconnect();
    disposeObject3D(scene);
    disposeMaterials(materials);
    disposeRenderer(renderer);
    renderer = null;
  }

  return { isSupported: true, start, dispose };
}
