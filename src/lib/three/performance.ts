/**
 * MORCAT — Detección de capacidades del dispositivo.
 * Decide calidad de la escena, DPR y soporte de WebGL.
 */

export type SceneQuality = 'low' | 'high';

/** Detecta si el navegador soporta WebGL. */
export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

/** Detecta preferencia de movimiento reducido. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Detecta si estamos en un dispositivo móvil / pantalla chica. */
export function isMobileDevice(): boolean {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
      (navigator.maxTouchPoints ?? 0) > 1)
  );
}

/** Estima la calidad de la escena. */
export function detectQuality(): SceneQuality {
  if (isMobileDevice()) return 'low';
  const cores = navigator.hardwareConcurrency ?? 0;
  if (cores > 0 && cores < 4) return 'low';
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem && mem <= 2) return 'low';
  return 'high';
}

/** Límite de devicePixelRatio según calidad. */
export function clampDPR(quality: SceneQuality): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  return Math.min(dpr, quality === 'low' ? 1.25 : 2);
}

/** Factor de reducción de detalle (puntos, densidad) según calidad. */
export function detailFactor(quality: SceneQuality): number {
  return quality === 'low' ? 0.5 : 1;
}

/** Si el dispositivo es débil, devolver true para usar fallback estático. */
export function shouldUseStaticFallback(): boolean {
  if (!supportsWebGL()) return true;
  if (prefersReducedMotion()) return true;
  // Dispositivos muy limitados → fallback estático.
  const cores = navigator.hardwareConcurrency ?? 0;
  if (cores > 0 && cores < 2) return true;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem && mem <= 1) return true;
  return false;
}
