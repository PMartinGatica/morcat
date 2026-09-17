# MORCAT — Carpeta de imágenes públicas

## Estado actual: DEMO

El sitio usa ilustraciones vectoriales propias (line art arquitectónico)
como imágenes provisorias. Se resuelven desde `src/components/illustrations/`
según la clave indicada en los datos (`src/data/homes.ts`, `src/data/projects.ts`).

## Cómo reemplazar por imágenes reales

1. Colocar las fotos/renders aquí con nombres claros, por ejemplo:
   - `public/images/models/homero-a01.webp`
   - `public/images/projects/casa-bosque-sur.webp`
   - `public/images/hero/ushuaia.webp`
2. En `src/data/homes.ts` / `src/data/projects.ts`, reemplazar la clave
   de ilustración por la ruta absoluta (empieza con `/`):
   ```ts
   coverImage: '/images/models/homero-a01.webp',
   ```
3. `src/components/MediaImage.astro` renderiza `<img>` para rutas. Para
   imágenes raster se recomienda `astro:assets <Image>` con formatos
   AVIF/WebP (srcset + sizes) para las imágenes de hero.

## Estructura sugerida

```
public/images/
  hero/        # fotos de hero (Ushuaia, obra, renders)
  models/      # fotos/renders por modelo
  projects/    # fotos por proyecto
  plans/       # planos reales (PDF/SVG/PNG)
  logo/        # logo oficial SVG (reemplaza logo-morcat-placeholder.svg)
  og-cover.svg # imagen para Open Graph (reemplazar por foto real)
public/logo/   # variantes del logo oficial
public/videos/ # videos de obra (opcional)
```
