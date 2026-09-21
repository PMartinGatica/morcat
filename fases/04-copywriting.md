# Fase 4 — Copywriting: textos por sección

## Objetivo

Reescribir los textos que el cliente marcó como "muy con mi impronta"
(demasiado informales/personales) a un tono corporativo B2B, y aplicar los
cambios de contenido puntuales que pidió.

## Criterio general del cliente

- Tono **corporativo**, en segunda/tercera persona — no en primera persona
  informal.
- Evitar frases que suenen "muy personales" (ej. "los dueños tienen
  supervisión estricta en la obra" → suena a que el dueño está literalmente
  parado en la obra; corregir a algo como "supervisión técnica exclusiva").
- Evitar la palabra **"no incluye"** o cualquier condicional que genere
  desconfianza en el visitante — ese tipo de exclusiones van en el
  contrato final, no en la web pública.
- El foco del discurso debe estar en el **proyecto**, no en el terreno
  (muchos clientes no tienen terreno propio y el sistema se adapta).

## Cambios puntuales por sección

### Home / Hero de Viviendas (`src/pages/index.astro`, `viviendas-modulares/index.astro`)

- "Viviendas pensadas para el sur" → probar variantes con foco en Tierra
  del Fuego / Ushuaia / Patagonia (ej. "viviendas pensadas para Tierra del
  Fuego"). Definir la frase final con el cliente.

### Construcción (`src/pages/construccion.astro`, `src/data/construction.ts`)

- "Proyectos desde cero" → **"Proyectos a medida"**.
- "Cada obra se piensa para su terreno, su uso y su presupuesto" →
  reformular con foco en el proyecto: algo como *"cada obra se piensa para
  su proyecto, su presupuesto y la zona"* / *"adaptándose a su necesidad"*.
- "Taller" → mostrar como **"Fábrica / Taller"** (la palabra fábrica
  genera más confianza/escala que "taller").
- Aclarar que el sistema se **monta en terreno**: puede ser panelizado
  in situ o entregado como módulo terminado listo para cargar y trasladar
  — hoy el texto no distingue bien estas dos modalidades.
- Bloque de "el sistema elige según el proyecto": el cliente prefirió la
  versión con foco en **proyecto y terreno combinados**, no solo terreno.

### Desarrollo (`src/pages/desarrollos.astro`)

- "Proyectos inmobiliarios en Ushuaia" → reordenar: **provincia primero**
  (Tierra del Fuego), ciudad después (Ushuaia). Ej.: "Proyectos
  inmobiliarios en Tierra del Fuego, Ushuaia".
- Sección tipo "la mirada" / descripción de la ciudad → probar con la
  palabra **"austral"** (ej. "la ciudad más austral del fin del mundo").
  Dejar planteadas variantes, el cliente quiere elegir viendo opciones.
- Bloque de condiciones comerciales/financieras ("las condiciones
  comerciales y financieras de cada desarrollo se publicarán recién
  cuando exista información legal y comercial válida...") → el cliente lo
  ve "muy cargado/legal". Acortarlo drásticamente o sacarlo directamente
  de la web pública.
- Sección de etapas de obra: agregar mención a que se van publicando
  avances (diseño → fundación → obra → terminado). Relacionado con que
  están instalando cámaras de obrador (mencionado como posible feature
  futura — **no** es parte del alcance actual, solo dejarlo mencionado en
  el texto si el cliente lo confirma).

### Sobre Nosotros (`src/pages/nosotros.astro`)

- Hay un párrafo que el cliente marcó como "medio ofensivo"/demasiado
  personal, probablemente cerca del bloque "trabajamos en tres frentes" o
  la descripción de supervisión de obra. **Pendiente ubicar el párrafo
  exacto** — el cliente tampoco lo recordaba con precisión en la reunión.
- Actualizar métricas de la empresa (posiblemente en
  `src/components/MetricsStrip.astro` o dentro de esta página):
  - Antigüedad: **28 años** (fundada en 1998 → `foundingDate` en
    `src/config/site.ts` está `null`, cargar `1998-01-01` o similar).
  - Obras entregadas: **más de 100**.
  - Metros cuadrados construidos: **más de 200.000 m²** en total /
    **más de 100.000 m²** en viviendas industrializadas específicamente
    (son dos cifras distintas, no una sola — confirmar redacción exacta
    con el cliente antes de publicar).
  - Alcance geográfico: Argentina / Tierra del Fuego y "parte del país".

## Archivos del repo involucrados

- `src/pages/index.astro`, `construccion.astro`, `desarrollos.astro`, `nosotros.astro`
- `src/data/construction.ts`
- `src/config/site.ts` (`foundingDate`)
- `src/components/MetricsStrip.astro`

## Checklist

- [x] Reescribir Home/Hero de Viviendas — 2026-09-18. Home: se mantuvo
      "de habitar el sur" (no estaba marcado para cambiar). Viviendas
      modulares: "Viviendas pensadas para el sur" → "Viviendas pensadas
      para Tierra del Fuego."
- [x] Reescribir Construcción — 2026-09-18. Hero "desde cero" → "a
      medida"; foco proyecto+presupuesto+zona en vez de terreno+uso;
      "taller" → "fábrica" en toda la página y en `construction.ts`;
      aclarada la doble modalidad de montaje (panelizado in situ o
      módulo terminado); sistema constructivo con foco proyecto+terreno
      combinado.
- [x] Reescribir Desarrollo — 2026-09-18. "Tierra del Fuego, Ushuaia"
      (provincia primero); "Pensar la ciudad más austral del mundo.";
      etapas de obra ahora dicen "diseño, fundación, obra y entrega".
      El bloque "Compromiso de información" se acortó primero y
      **después se eliminó del todo** (Rodrigo no lo quería ni corto) —
      ver sección de ajustes adicionales más abajo.
- [ ] Ubicar y corregir el párrafo "personal/ofensivo" en Nosotros — no
      encontrado literalmente en el código actual (ni "supervisión
      estricta" ni una frase equivalente); puede que el cliente se
      refiriera a la página de otra empresa que estaban comparando, no a
      texto propio de Morcat. Queda pendiente que Rodrigo señale el
      párrafo exacto si sigue viéndolo en el sitio.
- [x] Cargar `foundingDate` (`1998-01-01`) y métricas actualizadas —
      2026-09-18: 28 años, +100 obras entregadas, +200.000 m²
      construidos, +100.000 m² en viviendas industrializadas (antes:
      15 años, +50 obras, +1000 m², conteo de "+100 viviendas"). Se
      agregó formato con separador de miles (`toLocaleString('es-AR')`)
      en `MetricsStrip.astro` para que se lea "200.000" y no "200000".
      También se corrigió "taller" → "fábrica" en `nosotros.astro`.
      **Confirmado por Rodrigo el mismo día: esos números están bien
      para publicar tal cual.**

Verificado con build + capturas de pantalla en `/`, `/viviendas-modulares`
y `/desarrollos`.

## Ajustes adicionales (2026-09-18, mismo día, instrucciones puntuales de Rodrigo vía Pablo)

- **"Tierra del Fuego, Ushuaia" en todos lados** (aunque no sea el orden
  convencional — confirmado explícitamente, "sé que está mal pero lo
  quiere así"). Se reordenó en las ~14 apariciones donde el sitio decía
  "Ushuaia, Tierra del Fuego" o "Ushuaia y Tierra del Fuego": meta
  descriptions, hero de home, footer, `structuredData.ts` (solo el campo
  `description` de texto libre — **no** se tocó `addressLocality`/
  `addressRegion`, que son campos de schema.org separados, sin orden).
- **Menos foco en "terreno", más en el proyecto/construcción modular**
  (según la reunión: "la idea es vender el módulo y no el terreno").
  Se reordenaron frases donde "terreno" aparecía primero en una lista
  (`construction.ts`, `promos.ts`), y se cambiaron los 2 CTA finales
  ("¿Tenés un terreno o una idea?" en home y construcción) a "¿Tenés un
  proyecto en mente?". No se tocaron los campos de formulario que
  preguntan por terreno (son intake funcional, no marketing) ni las FAQ
  que son literalmente sobre el terreno.
- **"Compromiso de información" eliminado** de `/desarrollos` — Rodrigo
  no lo quiere, ni siquiera la versión corta. Se sacó la tarjeta entera y
  se simplificó el layout de esa sección a una sola columna.
- **Promo `/promo/viviendas-modulares`**: el título "PENSADAS DESDE EL
  SUR." de la sección Sur no le gustó — cambiado a "PENSADAS PARA TIERRA
  DEL FUEGO." (`src/data/promos.ts`, campo `south.accentLine`).

Verificado de nuevo con build + capturas después de estos cambios.
