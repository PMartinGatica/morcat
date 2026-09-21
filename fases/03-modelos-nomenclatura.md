# Fase 3 — Modelos: nomenclatura y datos

## Objetivo

Aplicar el sistema de códigos por modelo que pidió el cliente, para que
tanto él como sus clientes puedan referenciar un modelo sin ambigüedad
("el Homero A01" en vez de tener que aclarar de cuál Homero hablan).

## Esquema pedido por el cliente (línea "Homero" como ejemplo)

Código ascendente según metraje, dentro de cada línea:

| Código | Superficie |
|---|---|
| A00 | 18 m² |
| A01 | 21 m² |
| A02 | 24,5 / 25 m² |
| A03 | 28 m² |

Tope de la línea "Amero" en 28 m² (350 cm × 8 m) — el cliente no quiere
pasar de ahí porque el traslado del módulo se vuelve muy complicado por
encima de ese tamaño (dúplex y modulares grandes son otra categoría, con
tope distinto, 370–380).

## Inconsistencia encontrada en `src/data/homes.ts`

Los datos actuales **no** siguen ese orden ascendente:

- `homero-a01` → `HOMERO A01` → **21 m²** ✅ coincide con el esquema del cliente.
- `homero-a02` → `HOMERO A02` → **18 m²** ❌ debería ser menor código
  (A00) si sigue la lógica de "a más superficie, número más alto".

Además no existe ningún modelo `A00` (18 m² como código base) ni `A03`
(28 m²) todavía — hay que confirmar con el cliente si:

1. Simplemente hay que renombrar `homero-a02` (18 m²) a `homero-a00`, y
2. Falta cargar un modelo de 28 m² como `homero-a03`.

Los otros modelos (`yagan-b01` 25 m², `lapataia-c01` 35 m², `beagle-d01`
45 m²) usan otro prefijo de letra por línea (B, C, D) — eso parece
consistente con "cada línea tiene su propia serie de códigos", pero
conviene confirmarlo explícitamente con Rodrigo antes de tocar nada.

## Archivos del repo involucrados

- `src/data/homes.ts` (fuente de verdad de modelos, `id`, `name`, `surface`, `line`)
- `src/pages/viviendas-modulares/index.astro` y `[slug].astro` (listado y ficha)
- `src/components/HomeModelCard.astro`
- `src/components/promo/PromoModels.astro`, `ModelQuickView.astro` (landing de promo)

## Checklist

- [x] Confirmar con Rodrigo el criterio de numeración — 2026-09-18:
      **es global y ascendente por metraje** ("el metro cuadrado más
      chico sería A00 y va creciendo 01, 02, 03... a medida que aumentan
      los m² de cada proyecto"). Esto aplica dentro de la serie
      Homero/Serie Austral (el prefijo de letra A); Yagan/Lapataia/
      Beagle son líneas distintas con su propia letra (B, C, D), no se
      les pidió cambiar nada.
- [x] Renombrado `homero-a02` (18 m²) → **`homero-a00`** — 2026-09-18.
      Actualizado en `src/data/homes.ts` (`id`, `slug`, `name`), y en
      las 2 referencias que quedaban: `src/data/promos.ts`
      (`featuredHomeSlugs`) y `src/components/promo/ModelQuickView.astro`
      (mapa `LINES`). Verificado con build — la ruta
      `/viviendas-modulares/homero-a00` se generó bien.
- [ ] Cargar el modelo faltante de 28 m² (A03) — **todavía no hay specs
      ni fotos reales para un modelo distinto de 28 m²** dentro de la
      serie Homero (no confundir con `yagan-b01`, que es 25 m² pero de
      otra línea). No inventé un modelo con datos ficticios — falta
      definir con Rodrigo si esto sale de material nuevo o si alguna
      línea existente se resignifica.
- [ ] Verificar que las superficies mostradas en cada ficha coincidan con
      los metrajes reales de los planos (`floorPlans`) — el comentario del
      archivo ya advierte que solo hay planos reales para 21 m² y 35 m²,
      el resto son esquemáticos.
