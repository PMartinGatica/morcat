# Fase 7 — Cotizador / estimador online

## Pedido

Rodrigo (cliente) pidió sumar en la web un cotizador/estimador, como el que
ya usan por WhatsApp: piden **tipo de obra** (ej. "Construcción Nueva —
Steel Framing / Seco"), **metros cuadrados** y **contacto**, y a cambio
reciben una estimación. Funciona bien como "gancho" y quieren replicarlo
en el sitio.

Pregunta que quedó abierta en el chat: *"¿se puede hacer esto sabiendo que
el sitio se despliega en Hostinger?"*

## Restricción técnica real

El proyecto está en `astro.config.mjs` sin ningún adapter de servidor
(`output` no está seteado → modo `static` por defecto). Eso quiere decir
que **hoy el sitio compila a HTML/CSS/JS puro**, sin backend propio. Esto
es justamente lo que permite subirlo a Hostinger como hosting de archivos
estáticos (lo más simple/barato). Cualquier feature nueva tiene que
respetar esa arquitectura, o sumar explícitamente algo externo.

## Opciones

### Opción A — Calculadora 100% client-side (recomendada para arrancar)

Un formulario (tipo de obra + m²) que calcula una **estimación por rango**
en el navegador, usando una tabla de precio-por-m² según tipo de obra
(steel framing, modular, dúplex, etc.), sin llamar a ningún servidor.
Al final, muestra el rango estimado y un botón que arma un mensaje de
WhatsApp pre-cargado con esos datos (reutilizando `whatsappLink()` de
`src/config/site.ts`), replicando el mismo flujo que ya usan a mano.

- **Ventajas:** funciona en cualquier hosting estático, incluido
  Hostinger, sin costos ni infraestructura nueva. Se puede implementar
  como un componente Astro + un poco de JS, reutilizando el patrón que ya
  existe en `src/components/ContactForm.astro`.
- **Limitación:** es una estimación por fórmula/tabla, no algo
  conversacional ni "inteligente" como puede sonar la respuesta del bot de
  WhatsApp en la captura (que da una respuesta más elaborada y
  personalizada).
- **Falta del cliente:** la tabla de precios por m² y tipo de obra (no la
  tenemos — es información comercial sensible que solo la tiene Rodrigo).

### Opción B — Cotizador conectado a un servicio externo

Si lo que quieren replicar es más parecido al bot de WhatsApp de la
captura (respuesta elaborada, quizás generada con IA), hace falta un
backend que reciba los datos y devuelva la estimación. Como Hostinger
shared hosting no corre el backend de este proyecto Astro (a menos que se
contrate un plan con Node.js), la forma de hacerlo sin cambiar de hosting
es:

- El sitio estático sigue igual, pero el formulario del cotizador hace un
  `fetch` a una función serverless externa (ej. Cloudflare Workers,
  Vercel Functions, o un endpoint simple en el propio hosting de WhatsApp
  Business si ya tienen uno armado ahí).
- Esa función es la que calcula/genera la respuesta y se la devuelve al
  navegador.
- **Ventajas:** permite lógica más compleja o incluso IA si más adelante
  lo piden.
- **Costo/complejidad:** hay que mantener un servicio aparte (aunque sea
  chico), y probablemente tenga algún costo mensual (la mayoría de estas
  funciones serverless tienen capa gratuita generosa para este volumen).

## Recomendación

Arrancar por la **Opción A**: cubre el pedido real ("que la web tenga el
mismo gancho que el WhatsApp") sin sumar infraestructura ni depender de
que el hosting cambie. Se puede evolucionar a la Opción B más adelante si
el cliente pide algo más sofisticado.

## Archivos del repo involucrados (a crear/tocar)

- Nuevo componente, ej. `src/components/Cotizador.astro` (o dentro de
  `src/components/promo/` si va enfocado a la landing de modulares).
- `src/config/site.ts` (reutilizar `whatsappLink()`).
- Posible nueva tabla de datos, ej. `src/data/pricing.ts` (con la
  información que falta del cliente).
- Página donde se muestra: a definir con el cliente (¿home?, ¿página
  propia `/cotizador`?, ¿dentro de la landing de promo?).

## Checklist

- [x] Decidido (2026-09-18): arrancamos por la **Opción A** (calculadora simple).
- [x] Tabla de precios recibida — 2026-09-20, por WhatsApp de Rodrigo.
      Guardada en `src/data/pricing.ts` con comentario de origen y fecha.
      **Hallazgo útil:** la cuota del "Plan Habitar" (48 cuotas) coincide
      con `(m² × precio/m²) / 48` — se verificó contra los 2 de 3
      ejemplos que dio Rodrigo (módulo: 465 USD ✅, vivienda: 781,25 USD
      ✅; dúplex: la fórmula da 926 USD contra los 923 USD que pasó él,
      diferencia menor de redondeo). Esto evita mantener dos tablas
      separadas — un solo precio por m² alcanza para calcular ambas
      cifras.
- [x] Definido dónde vive — 2026-09-20: en la landing de promo
      (`/promo/viviendas-modulares`), como sección nueva entre "Tierra
      del Fuego" y "Financiación" (la sección de campaña paga es donde
      dijo Rodrigo que "entran con ese gancho").
- [x] Implementado y conectado a WhatsApp — 2026-09-20.
      `src/components/promo/Cotizador.astro`: selector de tipo de obra
      (3 tarjetas), slider de m² (rango dinámico según el tipo elegido),
      resultado en vivo (llave en mano + cuota Plan Habitar), botón que
      arma el link de WhatsApp con el mensaje ya redactado
      (`cotizadorWhatsAppMessage()` en `lib/promo/whatsapp.ts`). 100%
      client-side, sin backend — funciona en Hostinger tal cual está.
      Verificado con Playwright: cambié tipo de obra y arrastré el
      slider al máximo, los números se recalculan bien y el link de
      WhatsApp se arma con el texto correcto. Probado en desktop y
      mobile. Encontré y corregí un bug del slider (arrancaba mostrando
      el precio más caro en vez del más barato al cargar la página).
- [x] **Corrección 2026-09-20:** todo el mensaje que mandó Rodrigo era
      para publicarse en el sitio — no solo la tabla de m². Se
      malinterpretó inicialmente la comisión como un acuerdo privado
      Pablo-Rodrigo; Pablo aclaró que no, que es contenido para la web.
      Se corrigió:
  - **Otros planes de financiación** (40/60, financiación 100%
    bancarizada, obra gris, platea, remodelaciones) — ya no quedan solo
    en `pricing.ts`: se muestran en una grilla de tarjetas en
    `FinancingCTA.astro` (sección "Financiación" de la landing de
    promo), reemplazando el copy genérico anterior ("sin cuotas, tasas
    ni montos", que ya no aplicaba una vez que hubo números reales).
  - **Plan Etapa 4** (diseño y platea → estructura y revestimiento →
    instalaciones y aberturas → revestimiento interior) — se muestra
    como lista numerada debajo de la grilla de planes.
  - **Comisión por venta (3%)** — se agregó como bloque "Programa de
    referidos" al final de la sección de Financiación, con su propio
    botón de WhatsApp (mensaje dedicado en
    `cotizadorWhatsAppMessage`/`PROMO_WHATSAPP_MESSAGES.commission` en
    `lib/promo/whatsapp.ts`). Dato guardado en `SALES_COMMISSION` en
    `pricing.ts`.
      Verificado con build + Playwright (capturas de la sección completa
      y del link de WhatsApp de la comisión).
