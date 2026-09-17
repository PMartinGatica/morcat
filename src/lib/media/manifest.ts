/**
 * MORCAT — Manifiesto de multimedia real (assets del cliente).
 *
 * Las imágenes procesadas viven en src/assets/media/. Este módulo
 * las indexa por clave (sin extensión) para que MediaImage pueda
 * resolverlas con astro:assets (AVIF/WebP + srcset + sizes).
 *
 * Para reemplazar una imagen: dejar el archivo con el mismo
 * nombre en src/assets/media/... (o actualizar la clave en los
 * datos) y volver a compilar.
 */
import type { ImageMetadata } from 'astro';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export const MEDIA: Record<string, ImageMetadata> = {};

for (const [filePath, mod] of Object.entries(modules)) {
  const key = filePath
    .replace('/src/assets/media/', '')
    .replace(/\.(jpe?g|png|webp|avif)$/i, '');
  MEDIA[key] = mod.default;
}

/** Devuelve los metadatos de una imagen del cliente, o undefined. */
export function getMedia(key: string): ImageMetadata | undefined {
  return MEDIA[key];
}

/** Todas las claves disponibles (útil para depurar). */
export function mediaKeys(): string[] {
  return Object.keys(MEDIA).sort();
}
