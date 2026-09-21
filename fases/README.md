# Correcciones Morcat — Reunión del jueves 2026-09-17

Guía de trabajo dividida en fases, basada en la transcripción de la reunión
(`jueves, 12 h 09 min p.m..txt`) y en los mensajes posteriores del cliente.
Cada fase tiene su propio archivo con objetivo, tareas, archivos del repo
involucrados y preguntas abiertas que faltan resolver con Rodrigo (Morcat).

No se toca código de producción hasta confirmar el orden de trabajo. Vamos
fase por fase; al cerrar una, se marca acá y se pasa a la siguiente.

## Estado general

| # | Fase | Estado |
|---|------|--------|
| 1 | [Identidad visual: paleta, logo, tipografía](01-identidad-visual.md) | **En progreso** — colores y logo real aplicados, falta tipografía y confirmar blanco |
| 2 | [Multimedia: fotos y videos por sección](02-multimedia.md) | **En progreso** — catálogo completo hecho, video orbital reemplazado, quedan decisiones para confirmar con Rodrigo |
| 3 | [Modelos: nomenclatura y datos](03-modelos-nomenclatura.md) | Pendiente |
| 4 | [Copywriting: textos por sección](04-copywriting.md) | Pendiente |
| 5 | [Navbar y fondo (UX)](05-navbar-ux.md) | Pendiente |
| 6 | [Contacto y footer](06-contacto-footer.md) | Pendiente |
| 7 | [Cotizador / estimador online](07-cotizador.md) | **Hecho** — implementado en `/promo/viviendas-modulares`, verificado |
| 8 | [Tracking y SEO (pixel, GA4, publicista)](08-tracking-seo.md) | Pendiente |

## Fuentes

- Transcripción completa de la reunión: `../jueves, 12 h 09 min p.m..txt`
- Material de referencia del cliente (fotos/videos por WhatsApp): `../mulmedia-cliente/`
- Media ya curada y en uso en el sitio: `../src/assets/media/`

## Datos ya confirmados por el cliente (no depende de la transcripción)

- **Paleta oficial:**
  - Azul de fondo (logo y página): `#0B1629` — aplicado.
  - Dorado: `#C8912A` — aplicado.
  - Blanco: se mantiene el **marfil** actual (`#f4f2ec`), no se pasa a
    `#FFFFFF` puro — confirmado 2026-09-18.
- **Logo:** el archivo real que va a existir es el PNG (sello circular)
  que ya está en `src/assets/media/logo/morcat-badge.png` — confirmado
  que **no habrá versión vectorial** (el cliente no tiene el archivo
  fuente). Ya integrado en el sitio.
- **Hosting:** el sitio se despliega en **Hostinger**. El proyecto Astro está
  configurado en modo `static` (sin adapter de servidor), o sea que hoy es
  HTML/CSS/JS puro — cualquier feature nueva (como el cotizador) tiene que
  respetar esa restricción o sumar explícitamente un backend externo.
- **Pedido nuevo de Rodrigo:** sumar un cotizador/estimador en la web, a modo
  de "gancho" similar al que ya usan por WhatsApp (ver captura: piden tipo de
  obra, metros y contacto, y reciben una estimación).
