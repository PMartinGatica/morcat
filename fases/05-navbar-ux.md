# Fase 5 — Navbar y fondo (UX)

## Objetivo

Corregir dos comportamientos visuales que el cliente notó al navegar el
sitio en la reunión.

## 1. Navbar con color fijo

Hoy la barra de navegación es semi-transparente tipo "sello de agua" y va
cambiando de tono según el fondo de la sección sobre la que se hace
scroll. El cliente quiere que el navbar tenga **un color de fondo fijo**
(el azul `#0B1629`), para que el logo se vea siempre igual, sin que
"desaparezca" o pierda contraste al cambiar de sección.

Archivos: `src/components/Navbar.astro`, `src/components/MobileMenu.astro`.

## 2. Degradé de fondo entre secciones

El cliente sí quiere mantener la idea de que el fondo general de la
página varíe de tono a medida que se baja (para marcar visualmente el
cambio de tema: viviendas → desarrollo → construcción), pero:

- Debe ir siempre dentro de la misma familia de azules (arranca azul,
  termina en un negro azulado — no un azul plano uniforme en toda la
  página).
- No tiene que quedar "todo tan cerrado"/uniforme como está ahora en
  algunos tramos.
- La cuadrícula (grid) de fondo que ya existe le gustó, mantenerla.

Esto es distinto del punto 1: el fondo de la página puede seguir
cambiando de tono, lo que **no** puede cambiar es el fondo del navbar.

## Archivos del repo involucrados

- `src/components/Navbar.astro`
- `src/components/MobileMenu.astro`
- `src/styles/global.css` (tokens de navy, degradés de sección)
- `src/layouts/BaseLayout.astro`

## Checklist

- [x] Fijar el fondo del navbar a `#0B1629` sólido (sin transparencia
      dependiente del scroll) — 2026-09-18. `.navbar` en `global.css`
      ahora usa `background: var(--color-navy-950)` siempre (ya es
      exactamente `#0B1629`), en vez de empezar transparente y pasar a
      `rgb(5 13 22 / 0.86)` con blur al hacer scroll. El borde/sombra
      sutil al scrollear se mantuvo (eso no lo pidió cambiar). Verificado
      con captura antes y después de hacer scroll — el color no cambia.
- [x] Verificar que el logo mantenga buen contraste en ese fondo fijo —
      sí, se ve bien.
- [x] Agrandar el logo 1.5x — 2026-09-18, pedido puntual del cliente.
      `markClass` por defecto en `Logo.astro`: de `h-10/h-11` (40/44px) a
      `h-[60px]/h-[66px]`. Afecta Navbar y Footer (los que usan el
      tamaño por defecto); los usos de `/promo/*` (`PromoHeader`,
      `PromoFooter`) tienen su propio `markClass` y no se tocaron.
- [ ] Revisar el degradé de fondo entre secciones: mantener familia de
      azules, ir de azul a negro-azulado, sin quedar plano/uniforme.
- [ ] Confirmar que la cuadrícula de fondo se mantiene igual (no se pidió
      cambiarla).
