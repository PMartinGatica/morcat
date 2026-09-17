/**
 * MORCAT — Materiales de la escena arquitectónica.
 * Todos son básicos (sin luces ni sombras) por rendimiento.
 */
import * as THREE from 'three';

export interface SceneMaterials {
  mainLine: THREE.LineBasicMaterial;
  goldLine: THREE.LineBasicMaterial;
  dimLine: THREE.LineBasicMaterial;
  points: THREE.PointsMaterial;
  volume: THREE.MeshBasicMaterial;
  mountainLine: THREE.LineBasicMaterial;
}

export function createSceneMaterials(): SceneMaterials {
  return {
    // Líneas principales de la vivienda (blanco cálido)
    mainLine: new THREE.LineBasicMaterial({
      color: 0xf4f2ec,
      transparent: true,
      opacity: 0.55,
    }),
    // Acentos dorados (detalles arquitectónicos)
    goldLine: new THREE.LineBasicMaterial({
      color: 0xd39a29,
      transparent: true,
      opacity: 0.85,
    }),
    // Líneas secundarias / guías
    dimLine: new THREE.LineBasicMaterial({
      color: 0x163450,
      transparent: true,
      opacity: 0.7,
    }),
    // Puntos del terreno (relevamiento)
    points: new THREE.PointsMaterial({
      color: 0x9ca3a8,
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    }),
    // Volumen translúcido final
    volume: new THREE.MeshBasicMaterial({
      color: 0xf4f2ec,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    // Silueta de montañas al fondo (Canal Beagle)
    mountainLine: new THREE.LineBasicMaterial({
      color: 0x163450,
      transparent: true,
      opacity: 0.9,
    }),
  };
}

export function disposeMaterials(m: SceneMaterials): void {
  m.mainLine.dispose();
  m.goldLine.dispose();
  m.dimLine.dispose();
  m.points.dispose();
  m.volume.dispose();
  m.mountainLine.dispose();
}
