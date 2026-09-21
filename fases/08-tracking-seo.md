# Fase 8 — Tracking y SEO (pixel, GA4, publicista)

## Objetivo

Dejar el sitio preparado para que el publicista de Rodrigo pueda conectar
sus herramientas de campaña, sin que eso dependa de un desarrollo nuevo
cada vez.

## Contexto de la reunión

- La landing de campaña (`/promo/...`) es la que el publicista va a pautar
  en Google y Meta (Instagram/Facebook). El cliente confirmó que la
  estructura general de esa landing está bien encaminada.
- Faltan instalar ahí:
  - **Meta Pixel** (Facebook/Instagram Ads).
  - **Google Ads / GA4** (tag de conversión / analítics).
- Eso lo gestiona el publicista, no es parte del desarrollo web — pero el
  sitio tiene que dejar un lugar claro para insertar esos scripts sin
  tocar el resto del código cada vez.
- Posicionamiento SEO (palabras clave: "construcción", "modulares", etc.)
  quedó mencionado como un trabajo aparte a cotizar con el publicista, no
  parte de este alcance — pero relacionado, ya que el proyecto ya tiene
  `@astrojs/sitemap` y `src/lib/seo/structuredData.ts` armados.

## Archivos del repo involucrados

- `src/components/HeadMeta.astro` (donde deberían insertarse los tags de
  Meta Pixel / GA4 si se cargan directamente en el HTML).
- `src/lib/analytics/track.ts` (ya existe una capa de tracking — revisar
  si conviene centralizar ahí el pixel/GA4 en vez de pegarlo suelto en el
  head).
- `src/lib/seo/structuredData.ts`, `astro.config.mjs` (`@astrojs/sitemap`,
  ya filtra `/promo/*` y `/capital` del sitemap principal — correcto,
  esas son landings de campaña, no páginas para indexar).
- `src/pages/promo/[slug].astro`

## Checklist

- [ ] Definir con el publicista dónde van los IDs de Meta Pixel y
      Google Ads/GA4 (variables de entorno / config, no hardcodeado).
- [ ] Confirmar que `src/lib/analytics/track.ts` pueda centralizar ambos
      sin duplicar lógica.
- [ ] Verificar que la landing de promo cargue esos scripts sólo ahí (no
      en todo el sitio) si así lo pide el publicista.
- [ ] (Fuera de alcance de desarrollo, a cotizar aparte) SEO / posicionamiento.
