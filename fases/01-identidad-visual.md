# Fase 1 — Identidad visual: paleta, logo, tipografía

## Objetivo

Alinear los colores, el logo y la tipografía del sitio a lo que definió el
cliente, que hasta ahora se venían usando valores aproximados / genéricos.

## Paleta de colores

Valores oficiales dados por el cliente (2026-09-18):

| Uso | Hex |
|---|---|
| Fondo blanco | `#FFFFFF` |
| Azul de fondo (logo y página) | `#0B1629` |
| Dorado | `#C8912A` |

**Estado actual en el repo** (`src/styles/global.css`, bloque `@theme`):

- `--color-navy-800: #0b1b2c` → parecido pero no igual a `#0B1629`.
- `--color-gold-600: #c8922e` → parecido pero no igual a `#C8912A`.
- No existe ningún token `#FFFFFF` puro; el "blanco" actual es
  `--color-warm-50: #f4f2ec` (marfil), que es literalmente lo que pide el
  cliente en la transcripción para el fondo de la sección de promo
  ("no es blanco blanco, es un blanco marfil").

### Resuelto (2026-09-18)

Se mantiene el **blanco marfil**, no se reemplaza por `#FFFFFF` puro.
Confirmado directamente por Pablo.

Además, entre las fotos de referencia que mandó Rodrigo apareció la hoja
oficial **"MORCAT CAPITAL SYSTEM — Paletas de color para redes"**, con 4
paletas ya definidas por su lado:

| Paleta | Uso | Colores |
|---|---|---|
| A · Clásica Navy & Oro | Identidad base, feed principal | Navy `#0B1629` · Dorado principal `#D4AF37` · Dorado claro `#F4D98B` · Dorado oscuro `#8A6408` · `#FFFFFF` |
| B · Midnight Esmeralda | Acento secundario, gráficos/tags | Navy `#0B1629` · Dorado `#D4AF37` · Esmeralda `#0F5C4A` · Navy claro `#1B2C4D` · `#FFFFFF` |
| C · Ivory Editorial | Fondos claros, carruseles educativos | Fondo marfil **`#F7F3E8`** · Texto navy `#0B1629` · Dorado cálido `#C8912A` · Madera `#6B4423` · Fondo secundario `#E8E2D0` |
| D · Dark Mode | Stories / modo oscuro | Negro navy `#05090F` · Dorado brillante `#F7E3A1` · Dorado `#D4AF37` · Navy medio `#1E2E4D` · `#FFFFFF` |

Esto aclara la paleta que me habían pasado por chat: `#C8912A` es
específicamente el **"dorado cálido"** de la paleta C (fondos claros/
marfil), no el dorado principal de la identidad base (que es `#D4AF37`).
En el sitio ya apliqué:

- `--color-navy-950` → `#0B1629` (coincide con el navy de las 4 paletas).
- `--color-gold-600` → `#C8912A` (coincide exacto con "dorado cálido").
- `--color-warm-50` → `#F7F3E8` (coincide exacto con "fondo marfil" de
  la paleta C) — antes tenía un valor aproximado (`#f4f2ec`).

**No toqué el resto de la escala de dorados** (`gold-300` a `gold-500`,
usados en botones/CTAs sobre fondo navy). Dato interesante: el
`gold-400` actual (`#ddaf4e`) ya es prácticamente idéntico al "dorado
principal" oficial (`#D4AF37`) — no hace falta ajustarlo. Si en algún
momento quieren que el botón principal (`btn-gold`, hoy en `gold-500
#d39a29`) use el dorado principal exacto en vez de esta aproximación,
es un cambio de una línea, pero no me pareció necesario forzarlo ahora
porque la diferencia es mínima y no fue parte de lo que pidieron.

## Logo — resuelto (2026-09-18)

- El isotipo "EMC" que preocupaba en la reunión ya no existe en el logo
  real que mandó Rodrigo: el sello dice "MORCAT CONSTRUCTORA SRL", con
  "Morcat" como elemento dominante. Ya resuelto.
- **No va a haber versión vectorial.** Confirmado explícitamente por
  Pablo: el PNG (`src/assets/media/logo/morcat-badge.png`, extraído del
  `logomorcatv1.svg` que en realidad envuelve un PNG de 1542×1542) es el
  archivo definitivo del logo, no se va a conseguir un SVG/AI/EPS real.
  Queda descartada cualquier tarea futura de "pedir el vector".
- Integrado en `src/components/Logo.astro` vía `astro:assets` (Astro lo
  optimiza a WebP en build: 776KB → 4-20KB según el tamaño mostrado).
- El logo se ve siempre sobre fondo `#0B1629` (azul oscuro), con detalle
  en dorado. El navbar sigue siendo semi-transparente y cambia de tono al
  hacer scroll — eso es tema de [Fase 5 — Navbar](05-navbar-ux.md), no de
  esta fase.

## Tipografía

- El cliente quiere usar una fuente estilo **Brush Script** ("Brack
  Script") para títulos/nombres, pero ni la variante más apretada
  (ilegible) ni la más abierta — busca una intermedia, legible también en
  mobile.
- **Nuevo dato (2026-09-18, vía Pablo):** Rodrigo también anda buscando
  la fuente **Haettenschweiler** para sus textos. Es una fuente
  condensada/industrial (mayúsculas muy angostas y altas, estilo cartel
  militar/deportivo — nada que ver con la script cursiva de arriba), así
  que probablemente sea para otro uso: titulares muy anchos/impactantes,
  no para el nombre "Morcat". Falta confirmar en qué contexto la quiere
  usar (¿headers del sitio?, ¿piezas de redes?).
  - **Ojo con la licencia:** Haettenschweiler es una fuente comercial de
    Monotype (viene con MS Office/Windows) — no está pensada para
    incrustar en una web pública sin licencia de "web font". Para el mock
    de tipografía conviene incluir una alternativa gratuita de look
    parecido (condensada/industrial), ej. *Anton*, *Bebas Neue* o
    *Oswald* (700), y aclararle esto al cliente antes de asumir que se
    puede usar la original tal cual.
- Tipografía actual del sitio (`src/styles/global.css`):
  `Archivo Variable` (sans) y `Fraunces Variable` (serif/display) vía
  `@fontsource-variable`. No hay ninguna script/manuscrita ni condensada
  instalada hoy.
- Acción sugerida: armar una página de muestra (mock) con 3-4 variantes de
  script (ej. Google Fonts: *Playfair Display SC*, *Pinyon Script*,
  *Alex Brush*, *Sacramento*, *Tangerine* en distintos grosores) **y**
  2-3 variantes condensadas tipo Haettenschweiler (*Anton*, *Bebas Neue*,
  *Oswald*) para que el cliente elija de ambos grupos antes de instalar
  nada definitivamente.

## Archivos del repo involucrados

- `src/styles/global.css` (tokens de color, fuentes)
- `src/config/site.ts` (referencia al logo placeholder)
- `src/components/Logo.astro`
- `src/components/Navbar.astro`, `src/components/MobileMenu.astro`

## Checklist

- [x] Blanco: se mantiene marfil, no se cambia a `#FFFFFF` — 2026-09-18.
      Se corrigió el hex exacto a `#F7F3E8` (oficial, según hoja de
      paleta "Morcat Capital System") en vez del valor aproximado previo.
- [x] Actualizar `--color-navy-950` (fondo base de `body`) a `#0B1629` exacto — 2026-09-18.
- [x] Actualizar `--color-gold-600` a `#C8912A` exacto — 2026-09-18.
- [x] Logo real integrado, confirmado como definitivo (sin versión
      vectorial futura) — 2026-09-18. Verificado visualmente con capturas
      en navbar desktop, mobile, header y footer de promo — se lee bien
      en todos los tamaños actuales (36-44px).
  - [x] **Favicon actualizado** — 2026-09-18. Se generaron PNGs del
    logo real en varios tamaños (16, 32, 48, 192, 512 + apple-touch-icon
    180 + favicon.ico) a partir de
    `src/assets/media/logo/morcat-badge.png`, reemplazando el
    `favicon.svg` placeholder genérico (ya borrado). A tamaños chicos
    (16-48px) el texto "MORCAT" se lee poco (normal en un logo con
    tanto detalle), pero el anillo dorado y el símbolo "MC" arriba se
    reconocen bien — mismo comportamiento que ya se veía en el navbar.
    También se corrigió `theme-color` en `HeadMeta.astro` de `#081522`
    (aproximado) a `#0B1629` (exacto).
- [ ] Elegir variante de tipografía — 2026-09-18: Pablo decidió **dejar
      la tipografía actual por ahora** (no aplicar ninguna del mockup
      todavía). Le va a mostrar `/tipografia-mock` a Rodrigo en persona y
      volvemos con lo que diga. La página de mockup queda publicada
      (con `noindex`) hasta que se decida.
