# Fase 6 — Contacto y footer

## Objetivo

Actualizar los datos de contacto públicos, hoy provisorios/demo según las
notas del propio `src/config/site.ts`.

## Mail corporativo

- Hoy el formulario de contacto usa `morcat99@gmail.com` (confirmado en
  `src/config/site.ts`, `email`, y coincide con lo que el cliente llamó
  "mail personal" en la reunión — usa esa cuenta también para bancos y
  trámites personales, quiere separarla).
- Crear un mail corporativo con dominio propio, ej. `info@morcat.ar` o
  `contacto@morcat.ar` (el cliente ya tiene el dominio).
- Mientras tanto, mantener `morcat99@gmail.com` visible en paralelo (el
  cliente va a avisar por redes que se comuniquen al nuevo corporativo,
  hasta migrar del todo).
- **Pendiente del cliente:** la casilla de correo corporativa en sí
  (crearla es un paso externo al código, en el hosting de mail).

## Teléfonos

- `src/config/site.ts` hoy sólo tiene un número cargado
  (`whatsapp` / `whatsappOffice`, ambos iguales: `5492901586640`).
- El cliente mencionó que van a usar **dos teléfonos**. Una de las fotos
  de referencia que mandó Rodrigo (`fotoswsp/WhatsApp Image 2026-09-17 at
  12.46.34 PM.jpeg`, un flyer real de "Promoción Platea") trae los dos
  números de contacto impresos: **2901-586640** (coincide con el que ya
  está cargado) y **2901 409885** (el segundo, todavía no cargado). No lo
  apliqué solo porque no me pidieron tocar `site.ts` en este mensaje —
  queda listo para cargar en cuanto se confirme.
- El mismo flyer trae la dirección **"Transporte Villarino 464 – USH"**,
  que **no coincide** con la cargada en `site.ts` (`Transporte Villarino
  474`). Puede ser un typo del flyer o del dato cargado — hay que
  confirmar cuál es la correcta antes de tocarla.

## Horarios

- `src/config/site.ts` ya tiene `openingHours: '09:00 – 18:00'`. El
  cliente mencionó en la reunión un horario "hasta las 19 hs más o
  menos" para el footer — confirmar si hay que actualizar este valor.

## Archivos del repo involucrados

- `src/config/site.ts` (fuente única: `email`, `emailDemo`, `whatsapp`,
  `whatsappOffice`, `openingHours`)
- `src/components/Footer.astro`
- `src/components/ContactForm.astro`, `src/lib/forms/submit.ts` (a dónde
  llega el formulario)
- `src/pages/contacto.astro`

## Checklist

- [ ] Recibir el mail corporativo definitivo — confirmado 2026-09-18:
      **Rodrigo lo va a definir él mismo**, no depende de nosotros. Mientras
      tanto sigue `morcat99@gmail.com` en `site.ts`, sin tocar.
- [x] Segundo teléfono cargado — 2026-09-18: `whatsappOffice` ahora es
      `5492901409885` (el del flyer "Promoción Platea"), confirmado por
      Rodrigo. Ya no está duplicado del principal.
- [x] Dirección actualizada — 2026-09-18: `address` pasó de "Transporte
      Villarino 474" a **"Transporte Villarino 464"** (la del flyer),
      confirmada por Rodrigo como la correcta.
- [x] Horario de cierre actualizado — 2026-09-18: `openingHours` pasó de
      `09:00 – 18:00` a **`09:00 – 19:00`**, confirmado por Rodrigo.

Verificado con build tras los 3 cambios en `site.ts`.
