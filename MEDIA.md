# MORCAT — Multimedia del cliente

Documentación de los assets provistos por MORCAT, cómo se procesaron y
dónde se usa cada uno.

## Origen

| Carpeta original (`mulmedia-cliente/`) | Archivos | Contenido |
| --- | --- | --- |
| `MODULARES HOME` | 48 (45 img · 3 video) | Renders de la línea modular |
| `VIVIENDAS NORDICAS` | 65 (61 img · 4 video) | Renders línea nórdica + planos reales |
| `Duplex austral` | 44 (37 img · 5 video) | Renders del dúplex + plano/alzado |
| `DESAROLLO INMOBILIARIO` | 14 (12 img · 2 video) | Renders y videos del desarrollo |
| **Total** | **171 (484 MB)** | 139 PNG · 14 MP4 · 16 JPG/JPEG · 2 PDF |

La carpeta original **no se versiona** (`.gitignore`): queda como fuente sin
procesar. Las versiones optimizadas son las que usa el sitio.

## Cómo se eligió (y cómo cambiarlo)

El entorno de trabajo no tiene visión artificial disponible, así que la
selección se hizo con criterios medibles + estado del material:

1. **Metadatos y calidad**: resolución, orientación, contraste, luminancia media.
2. **Deduplicación por hash perceptual (aHash)**: se descartaron 16 grupos de
   imágenes casi idénticas repetidas entre carpetas.
3. **Clasificación automática**: render / plano técnico / collage (por % de
   blanco, transparencia y contraste).
4. **Nombres descriptivos**: se priorizaron los archivos que el cliente ya había
   nombrado a mano (p. ej. *"Cabaña moderna en el bosque neblinoso.png"*) por
   sobre los genéricos (`ChatGPT Image …`).
5. **Verificación de composición** con mapas de color en texto (cielo/estructura/
   vegetación) para confirmar que cada finalista es un render arquitectónico.

> Hojas de contacto para revisión humana: `.tmp-media/sheets/*.jpg`
> (una grilla con numeración por carpeta). Inventario y métricas:
> `.tmp-media/inventory.json` y `.tmp-media/analysis.json`.

Para cambiar una foto: reemplazar el archivo por el mismo nombre en
`src/assets/media/…`, o cambiar la clave en `src/data/*.ts`.
Para volver a procesar desde el material original: `node scripts/media-build.mjs`
(editar antes la lista `IMAGES` / `VIDEOS`).

## Imágenes seleccionadas (25)

| Clave (`src/assets/media/`) | Origen | Dónde se usa |
| --- | --- | --- |
| `modulares/cabana-andina` | MODULARES HOME · Cabaña cálida en el bosque andino.png | Hero landing promo · Home "Qué hacemos" · Nosotros · Proyecto Línea Homero |
| `modulares/bosque-01` | MODULARES HOME · Cabaña moderna en el bosque (1).png | Modelo HOMERO A01 (portada + galería) |
| `modulares/neblinoso` | MODULARES HOME · Cabaña moderna en el bosque neblinoso.png | Modelo HOMERO A02 · Home sección Ushuaia · Landing promo "Pensadas desde el sur" |
| `modulares/linea-25` | MODULARES HOME · ChatGPT Image 25 abr 2026, 02_26_58 p.m..png | Modelo YAGAN B01 (portada) |
| `modulares/atardecer` | MODULARES HOME · Gemini_Generated_Image_juv4i0juv4i0juv4.png | Galerías · Showcase de la landing promo |
| `modulares/exterior-02` | MODULARES HOME · 550dc1d8…png | Galerías · Showcase · Proyecto Estudio Austral / Nave |
| `modulares/plano-21` | VIVIENDAS NORDICAS · **Casa 21,5 M2 - Monoambiente - Planos.png** | **Plano real 21,5 m²** (modelo HOMERO A01 + sección Planos) |
| `modulares/plano-referencia` | VIVIENDAS NORDICAS · plano_original_con_logo_morcat_esquina.jpg | /construccion → "Plano original MORCAT" |
| `modulares/nexa-austral-a00` | Render provisto por MORCAT · Cabaña de chapa negra y madera con deck.jpg | Modelo NEXA AUSTRAL A00 (portada) |
| `nordicas/bosque-07` | VIVIENDAS NORDICAS · Cabaña moderna en el bosque (7).png | Sin uso (era la portada de LAPATAIA C01) |
| `nordicas/bosque-08` | VIVIENDAS NORDICAS · Cabaña moderna en el bosque (8).png | Modelo BEAGLE D01 (portada) |
| `nordicas/montanoso` | VIVIENDAS NORDICAS · Casa moderna en el bosque montañoso.png | Galerías |
| `nordicas/paisaje` | VIVIENDAS NORDICAS · Casa moderna en paisaje natural.png | Galerías · Proyectos |
| `nordicas/bosque` | VIVIENDAS NORDICAS · Cabaña moderna en el bosque.png | Hero /viviendas-modulares · Hero Nosotros |
| `nordicas/otono` | VIVIENDAS NORDICAS · Cabaña minimalista en el bosque otoño (1).png | Galería · Showcase |
| `nordicas/platea-flotante` | VIVIENDAS NORDICAS · **Platea Flotante.png** | Sistemas constructivos · /construccion (detalle) · Landing promo (volumen) |
| `nordicas/plano-35` | VIVIENDAS NORDICAS · **Plano_35M2-removebg-preview.png** | **Plano real 35 m²** (modelo NEXA AUSTRAL A00 + sección Planos) |
| `duplex/semi-rural` | Duplex austral · Casa moderna en paisaje semi-rural.png | Hero /construccion · Proyectos |
| `duplex/terrazas-jardines` | Duplex austral · Casa moderna con terrazas y jardines.png | Proyecto Dúplex Austral (galería) |
| `duplex/duplex-austral` | Render provisto por MORCAT · Dúplex de madera y chapa negra con montañas nevadas.jpg | Proyecto Dúplex Austral (portada) |
| `duplex/panoramica` | Duplex austral · Gemini_Generated_Image_u67ey…png | Galerías |
| `duplex/linea-940` | Duplex austral · ChatGPT Image 25 mar 2026, 10_19_18 a.m..png | Galerías |
| `duplex/plano-alzado` | Duplex austral · **Plsanoalz.png** | /construccion → plano y alzado del dúplex |
| `desarrollo/render-01` | DESARROLLO · 430b67fb….jpg | Hero /desarrollos · Proyecto Costa Beagle |
| `desarrollo/render-02` | DESARROLLO · 7e1b0879….jpg | /desarrollos (galería) · Proyectos |
| `desarrollo/render-03` | DESARROLLO · ad52caf2….jpg | /desarrollos (galería) · Proyectos |
| `desarrollo/volumetria` | DESARROLLO · 95fe199….jpg | /desarrollos (galería) · Proyecto Valle Andino |

## Videos seleccionados (5)

Todos recomprimidos con ffmpeg: H.264, CRF 28, sin audio, `+faststart`,
ancho máx. 720 px. Los pósters se generan con astro:assets (AVIF/WebP).

| Clave (`public/media/videos/`) | Origen | Original → Optimizado | Dónde se usa |
| --- | --- | --- | --- |
| `construccion-timelapse` | MODULARES HOME · cinematic-construction-timelapse…mp4 | 2.1 MB → **0.65 MB** | /construccion (montaje de módulo) |
| `interior-hogar` | Duplex austral · un_hogar_acogedor_para_una_familia_de.mp4 | 2.2 MB → **0.79 MB** | Landing promo (showcase, interior) |
| `orbital-nordicas` | VIVIENDAS NORDICAS · smooth-cinematic-90-degree-orbital…(1).mp4 | 2.2 MB → **0.87 MB** | Landing promo (showcase, exterior) |
| `exterior-duplex` | Duplex austral · fixed-camera-view-of-the-same-modern-house…mp4 | 2.2 MB → **1.28 MB** | /construccion (recorrido dúplex) |
| `desarrollo-obra` | DESARROLLO · 202608231407.mp4 (vertical, 13,8 s) | 10.3 MB → **1.61 MB** | /desarrollos |

Los videos **no se descargan solos**: `preload="none"` + póster + carga al
entrar en viewport (y sin autoplay si el usuario pidió movimiento reducido).

## Material NO utilizado

- **Collages** (`collage_cabins.png`, `collage_cabins_panoramic.png`, 46–47 MB):
  son grillas de varias imágenes, no sirven como foto de sección.
- **Capturas y duplicados**: `Captura.PNG`, `descarga.png`, y los 16 grupos de
  imágenes casi idénticas repetidas entre carpetas.
- **PDF de planos** (`Seccion J - Propuesta.pdf`, `SR. plano en planta.pdf`):
  el entorno no tiene rasterizador de PDF (poppler/ghostscript). Se pueden
  convertir a PNG/JPG y sumar cuando haya herramienta disponible.
- **Grupos grandes de variantes** (`ChatGPT Image …`): se tomó solo la mejor
  variante por tema; el resto queda disponible en la carpeta original.

## Convención de honestidad

Las imágenes y videos son **renders y visualizaciones** provistos por MORCAT,
no fotos de obras entregadas. Por eso:

- Modelos y proyectos siguen marcados con `demo: true` hasta confirmación.
- Las galerías de obra y el material del desarrollo llevan el sello
  `DEMO` / `REFERENCIA` con la aclaración "no representan obras entregadas".
- Los planos reales disponibles (21,5 m² y 35 m²) se usan como planos del
  modelo; el resto de los modelos usa planos esquemáticos de referencia.
