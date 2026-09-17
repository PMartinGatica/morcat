/**
 * MORCAT — Creación del renderer WebGL con límites de
 * rendimiento: DPR acotado, antialias según calidad, alpha.
 */
import * as THREE from 'three';
import type { SceneQuality } from './performance';
import { clampDPR } from './performance';

export interface RendererOptions {
  quality: SceneQuality;
  alpha?: boolean;
}

export function createRenderer(
  canvas: HTMLCanvasElement,
  opts: RendererOptions,
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: opts.quality === 'high',
    alpha: opts.alpha ?? true,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true,
  });

  renderer.setPixelRatio(clampDPR(opts.quality));
  renderer.setClearColor(0x000000, 0); // transparent → el fondo lo pinta el CSS

  return renderer;
}
