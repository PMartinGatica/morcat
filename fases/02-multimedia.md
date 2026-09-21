# Fase 2 — Multimedia: fotos y videos por sección

## Objetivo

Reemplazar las fotos/videos elegidos "a criterio" (sin validar con el
cliente) por el material que Rodrigo efectivamente aprobó en la reunión, y
completar lo que falta (planos, videos de estructura, etc.).

## Origen del material

- **Material curado y en uso hoy en el sitio:** `src/assets/media/`
  (subcarpetas `desarrollo/`, `duplex/`, `modulares/`, `nordicas/`,
  `posters/`).
- **Material crudo del cliente (por WhatsApp):** `mulmedia-cliente/`
  (subcarpetas `DESAROLLO INMOBILIARIO/`, `Duplex austral/`,
  `MODULARES HOME/`, `VIVIENDAS NORDICAS/` y otras). Acá hay bastante más
  variedad que lo que ya se subió a `src/assets/media/` — incluye videos
  `.mp4`, renders `.png` (ChatGPT/Gemini), planos `.pdf` y fotos reales.
- **`fotoswsp/`** (carpeta suelta en la raíz del repo, sin revisar
  todavía): son capturas de WhatsApp del 2026-09-17 (mismo día de la
  reunión) — probablemente las fotos puntuales que el cliente fue
  mandando en vivo mientras hablaban de qué imagen va en cada modelo.
  Falta cruzarlas con los timestamps de la transcripción para saber a
  qué sección corresponde cada una.

Hay que cruzar ambas carpetas: lo que está en `mulmedia-cliente/` es la
fuente completa; `src/assets/media/` es el subconjunto que ya se optimizó
y usó en el sitio. Falta revisar `mulmedia-cliente/` para encontrar lo que
el cliente pidió en la reunión y que **todavía no está** en el sitio.

## Pedidos concretos de la reunión

- **Hero / secciones "Aero"** (la sección principal de fondo en cada
  página): reemplazar foto fija por **video** de interior o exterior.
- **Vista orbital actual:** rechazada — el techo se ve mal (agregado que
  "queda raro"). Buscar en `mulmedia-cliente/VIVIENDAS NORDICAS/` o
  similar una toma con el techo derecho.
- **Dos modelos de dúplex industrializados** puntuales: son los que el
  cliente quiere "empujar fuerte" — usar las fotos de mejor definición
  disponibles, evitando el modelo con el agregado de diseño que no le
  gustó. Confirmar cuáles son exactamente (falta identificar los nombres
  de archivo con el cliente).
- **Modelos con "vela"** en el diseño: preferir esas variantes sobre las
  que no la tienen.
- Evitar renders con flores en el frente (pidió explícitamente sacarlas).
- **Plano grande de un proyecto en Alem** (edificio) para usar como
  referencia visual en la sección Desarrollo — buscar en
  `mulmedia-cliente/DESAROLLO INMOBILIARIO/` (hay un `.pdf` de planos en
  `Duplex austral/` también, revisar cuál es el correcto).
- **Video de estructura** (hormigón + steel frame) para combinar con el
  video de interior existente — la idea del cliente es un carrusel de 2
  videos (cambio manual con click o automático), no reemplazar uno por
  otro.
- Para la **landing de promo** (`/promo/...`, ver Fase 6), prefiere fotos
  "chiquitas"/oscuras (estética actual, tendencia) como imagen inicial.

## Archivos del repo involucrados

- `src/assets/media/**`
- `src/lib/media/manifest.ts` (mapea qué imagen/video va en cada
  componente/sección)
- `src/components/promo/PromoHero.astro`, `PromoShowcase.astro`,
  `PromoModels.astro`
- `src/pages/viviendas-modulares/index.astro`, `[slug].astro`
- `src/pages/desarrollos.astro`
- `src/data/homes.ts`, `src/data/projects.ts` (referencian los assets)

## Catálogo completo (2026-09-18)

Se catalogaron los 174 archivos de `mulmedia-cliente/` (4 agentes en
paralelo, uno por subcarpeta) más las 18 fotos de `fotoswsp/`. Resumen:

### ✅ Resuelto — hero de la home era un sketch 3D, Rodrigo quería una foto

`src/pages/index.astro` usaba `<ThreeHero />`, una animación Three.js de
un dibujo de casa que se arma en 3D (no una foto). Reemplazado
(2026-09-18) por la foto real
`mulmedia-cliente/MODULARES HOME/WhatsApp Image 2026-03-03 at 3.59.35 PM.jpeg`
(vivienda negra de noche, bahía y ciudad de Ushuaia de fondo, sin
flores, techo prolijo) — copiada a
`src/assets/media/modulares/hero-nocturna-ushuaia.jpg`. Como
`ThreeHero.astro` y todo `src/lib/three/` quedaron sin ningún otro uso,
se borraron junto con las dependencias `three` y `@types/three` del
`package.json` (código muerto, no tenía sentido dejarlo).

### ✅ Resuelto — vista orbital rechazada

Confirmado con evidencia visual directa (extraje frames con `ffmpeg`):
`public/media/videos/orbital-nordicas.mp4` (el video que está hoy en
`PromoShowcase`, carrusel "Recorré una vivienda") tiene un defecto de
render real — al acercarse la cámara, la madera del alero se ve
derretida/deformada. Coincide exactamente con la queja de Rodrigo
("mira el techo, es un asco").

**Reemplazado (2026-09-18)** por
`mulmedia-cliente/VIVIENDAS NORDICAS/smooth-cinematic-90-degree-orbital-camera-movement (4).mp4`
— mismo tipo de toma orbital, techo prolijo verificado cuadro por
cuadro, con de fondo la bahía + ciudad de Ushuaia + montañas nevadas
(muy superior en identidad local a la anterior). Se re-codificó a
~2 Mbps (antes pesaba 6MB a 8Mbps) para que pese similar a los demás
videos del sitio (quedó en 1.3MB, video-only, sin audio, igual que el
resto). Se actualizó también el póster
(`src/assets/media/posters/orbital-nordicas.jpg`) con un frame del
video nuevo. Verificado en el navegador (dev server + Playwright) — se
ve bien en el carrusel de la landing de promo.

### ⚠️ Problema de autenticidad encontrado (sin resolver)

`public/media/videos/desarrollo-obra.mp4` (usado en
`src/pages/desarrollos.astro`) **no es una obra de Morcat**: al extraer
frames se ve claramente un edificio en una localidad mediterránea
(techos de tejas rojas, palmeras, cipreses — estilo Chipre/Grecia), no
Ushuaia. Coincide con un video de referencia/inspiración que Rodrigo
tenía guardado (`DESAROLLO INMOBILIARIO/202608231407.mp4`), no con
material propio. **No lo reemplacé** porque no encontré, en ninguna de
las 4 carpetas, un video real de una obra de Morcat en hormigón/steel
frame — hace falta que Rodrigo lo consiga (o se filme una obra actual
con la cámara de obrador que mencionó en la reunión).

### 📋 Mejores candidatos por carpeta (a confirmar con Rodrigo antes de publicar)

**MODULARES HOME** (línea Homero/Amero, 18-28 m²) — candidatos a
hero/imagen principal, todos sin flores y con techo prolijo verificado:
`ChatGPT Image 18 mar 2026, 10_33_36 a.m..png` (tiene "vela" — frente
vidriado triangular), `ChatGPT Image 24 feb 2026, 07_46_20 p.m..png`,
`ChatGPT Image 3 mar 2026, 02_13_07 p.m..png` (fondo con luces de
Ushuaia), `ChatGPT Image 4 jun 2026, 01_09_59/01_15_50 p.m..png` (par,
con "vela" + fondo Ushuaia), y **`WhatsApp Image 2026-03-03 at
3.59.35 PM.jpeg`** (prioridad alta: es un archivo que llegó directo por
WhatsApp del cliente, probable señal de que ya lo aprobó). A evitar:
`ChatGPT Image 25 abr 2026, 02_26_58 p.m..png` y `ChatGPT Image 30 may
2026, 12_32_43 p.m..png` (flores prominentes), `ChatGPT Image 27 abr
2026, 03_27_52 p.m..png` (techo con caja elevada mal resuelta — mismo
tipo de problema que la vista orbital).

**Duplex austral** — no se encontraron fotos reales (todo es render
IA). Dos "familias" de diseño identificadas como posibles "los dos
modelos" que Rodrigo quiere priorizar: **Modelo A, con vela** (base
clara + gable de madera en voladizo tipo ala — ej.
`87b2c7cd-2c8c-4755-aaa0-b4e96a0e7fa0.png`,
`Gemini_Generated_Image_b653oob653oob653.png`,
**`Imagen1.png`**) y **Modelo B, sin vela**
(negro corrugado + techo mono-pendiente — ej. `ChatGPT Image 10 mar
2026, 01_59_39 p.m..png`, `Casa moderna en paisaje semi-rural.png`).
Candidato al "agregado que no le gustó": `Gemini_Generated_Image_u67ey8u67ey8u67e
- copia.png` (invernadero de vidrio pegado al costado, se ve
claramente fuera de lugar).

**✅ "Vela" confirmado (2026-09-18, por Pablo):** son las ventanas
**angostas y altas ("tipo vela/candle")** en la pared lateral clara —
no el faldón del techo en voladizo como había interpretado el agente.
Pablo confirmó mandando `Duplex austral/Imagen1.png` como ejemplo
exacto (dos ventanas verticales angostas sobre el revestimiento
blanco/gris, al lado de la franja de madera). Esto confirma que
**Modelo A** (arriba) es el modelo "con vela" que Rodrigo quiere
priorizar. `Imagen1.png` tiene un cantero chico de flores
amarillas/blancas en la base de la entrada — si se usa como foto
final conviene recortar o buscar el mismo ángulo sin ese cantero
(`87b2c7cd-2c8c-4755-aaa0-b4e96a0e7fa0.png` y
`Gemini_Generated_Image_b653oob653oob653.png` son el mismo modelo sin
ese detalle).

**Todavía sin confirmar:** cuál es exactamente el segundo modelo
prioritario ("sin vela") y el modelo con el "agregado que no le
gustó" — mis candidatos arriba siguen siendo una interpretación.

Los 2 PDFs de planos de esta carpeta son de vivienda individual (86 m²
y 80 m²), no el plano de Alem.

**Nota estructural (2026-09-18):** en el sitio no existe hoy un
catálogo de "modelos de dúplex" análogo a `src/data/homes.ts` (los
modulares Homero/Amero) — el dúplex aparece como una sola referencia
genérica (plano + video + galería) dentro de la página de Construcción
(`src/data/construction.ts`, `src/pages/construccion.astro`) y como
"proyectos" de ejemplo demo en `src/data/projects.ts` (`duplex-kuar`,
ficticio). Si Rodrigo quiere mostrar los "dos modelos" como productos
distintos (con nombre, metraje, galería propia), hace falta decidir si
se agregan a `homes.ts` como una nueva línea, o se arma una estructura
de datos nueva — todavía no lo hice porque es una decisión de
arquitectura de contenido, no solo de reemplazar una foto.

**VIVIENDAS NORDICAS** — candidatos fuertes a hero:
`Gemini_Generated_Image_gk16nogk16nogk16.png` (única con Ushuaia real
de fondo: barcos+bahía), `Gemini_Generated_Image_bwtenrbwtenrbwte.png`,
`Gemini_Generated_Image_iqo2nqiqo2nqiqo2.png`. Video hero candidato:
`animame-esta-imagen (1).mp4`. Única foto real de la carpeta:
`ChatGPT Image 27 abr 2026, 02_54_23 p.m..png` (losa de hormigón real,
no sirve como hero, sí como foto de fundación).

### ✅ Resuelto — plano de Alem como hero de Desarrollo

Confirmado por Rodrigo (vía Pablo, 2026-09-18): el candidato que había
identificado (`DESAROLLO INMOBILIARIO/WhatsApp Image 2026-09-10 at
5.11.03 PM.jpeg`) es el que quería usar como hero de `/desarrollos`.
Se recortó (de 1286×1599 a 1286×700) para sacar el logo viejo
"MC MORCAT S.R.L." que traía superpuesto en la esquina inferior
izquierda — con ese logo dentro hubiera quedado pisado por el texto del
hero y además es un diseño de marca distinto al que ya está en uso.
Guardado en `src/assets/media/desarrollo/plano-alem.jpg` y aplicado en
`src/pages/desarrollos.astro` (reemplazó a `desarrollo/render-01`).
Verificado visualmente — el gradiente navy de siempre sobre el plano
blanco queda bien, se lee todo.

**DESAROLLO INMOBILIARIO** — dos fotos reales de obra en hormigón
(cielo nublado, terreno de tierra): `95fe19917924236072f8099746573b48.jpg`
y `651e3f94480f8603163c542888a47d21.jpg` — buenos candidatos a hero
real de la sección Desarrollo. **Candidato fuerte al plano de Alem:**
`WhatsApp Image 2026-09-10 at 5.11.03 PM.jpeg` — plano grande de un
edificio de varias unidades con marcas en rojo (coincide con "se
modificó" que dijo Rodrigo). **No until confirmado por el cliente.**

### ❌ Gaps que no se resolvieron (no hay material disponible)

1. **Video de estructura real** (hormigón + steel frame, obra propia de
   Morcat) — no existe en ninguna de las 4 carpetas. Todo lo encontrado
   es o bien renders IA conceptuales (`Platea Flotante.png`,
   `Gemini_Generated_Image_2yu0po2yu0po2yu0.png`) o video de otra
   empresa/obra (ver problema de autenticidad arriba).
2. **Plano grande de Alem** — solo hay un candidato probable (ver
   arriba), sin confirmar.
3. **Cuál modelo tiene "la vela" exactamente** y **cuáles son los "dos
   modelos" de dúplex a priorizar** — son interpretaciones de los
   agentes basadas en la descripción de la reunión, no certezas.

## Checklist

- [x] Revisar `mulmedia-cliente/` completa carpeta por carpeta y catalogar
      qué hay (fotos reales vs renders IA, videos, planos) — 2026-09-18,
      con 4 agentes en paralelo. Ver catálogo arriba.
- [x] Reemplazar la vista orbital actual por una con techo correcto —
      2026-09-18.
- [x] **Vela confirmada y aplicada** — 2026-09-18. Rodrigo eligió
      `Duplex austral/ChatGPT Image 4 jun 2026, 12_01_57 p.m..png` como
      la casa "con vela" (ventanas angostas tipo vela en el lateral) —
      ahora es el **hero de `/construccion`**
      (`src/assets/media/duplex/hero-vela.png`, antes `duplex/semi-rural`).
      Sumó otras dos fotos de dúplex a la galería del proyecto
      `duplex-kuar` en `projects.ts`:
      `duplex/atardecer-madera.png` y `duplex/linea-modelos.png` (esta
      última muestra 3 modelos juntos con las montañas de fondo).
      Sigue pendiente el "segundo modelo sin vela" y el modelo con el
      "agregado que no le gusta" — Rodrigo todavía no los confirmó.
- [x] **Foto real de Modulares aplicada** — 2026-09-18. Rodrigo confirmó
      `MODULARES HOME/Copilot_20260507_131521.png` como una obra real
      construida (no render). Reemplazó el render placeholder en
      `nosotros.astro` ("Nuestra forma de construir"), y se sacó el
      badge "RENDER" que tenía antes.
- [x] **Video de estructura — resuelto parcialmente** — 2026-09-18. El
      archivo que parecía el candidato ideal
      (`DESAROLLO INMOBILIARIO/202608231407 (1).mp4`, zoom a tabiquería
      steel-frame) resultó ser un compilado de varias tomas de otros
      países (arranca en Chipre, sigue con un edificio en Brasil con el
      logo de otra constructora en la malla de seguridad, termina con
      skyline de una ciudad costera con pileta — nada que ver con
      Ushuaia). Se recortó a **solo 1.6s** de la toma de estructura
      limpia (sin logos ni fondo reconocible, aprox. t=1.67s a t=3.33s
      del clip original) y se subió como
      `public/media/videos/desarrollo-estructura.mp4`, ahora al lado del
      video existente en `/desarrollos` (antes había un solo video +
      grilla de fotos; ahora son 2 videos lado a lado + la grilla de
      fotos debajo). Sigue pendiente conseguir metraje 100% real y
      propio de Morcat — este es un parche razonable con lo disponible,
      no un reemplazo definitivo.
- [ ] Reemplazar `desarrollo-obra.mp4` (el primer video, hoy sigue
      siendo una obra en Chipre/Grecia, no de Morcat) en cuanto haya
      metraje propio.
- [x] Hero de `/desarrollos` migrado de imagen genérica a video parcial
      (ver arriba) — el hero de portada en sí sigue siendo el plano de
      Alem (imagen fija, ver más arriba), no video.
- [ ] Ajustar imágenes de la landing de promo modular a las versiones
      oscuras/chicas preferidas.
- [ ] Revisar `fotoswsp/` contra los timestamps de la transcripción para
      terminar de cruzar qué foto puntual corresponde a cada momento de
      la charla (hecho parcialmente: ya se identificaron el logo, la
      paleta de colores, el flyer con teléfono/dirección, y varias fotos
      de referencia de estilo — ver Fase 1 y Fase 6).
