# MORCAT CONSTRUCTORA SRL — Web corporativa

Sitio multipágina de **MORCAT CONSTRUCTORA SRL** (Ushuaia, Tierra del Fuego, Argentina),
construido con **Astro + TypeScript + Tailwind CSS v4 + Three.js**.

> **Estado: DEMO.** El contenido visual y comercial es provisorio y está
> identificado con el indicador `DEMO CONTENT`. Ningún dato inventado se
> presenta como real.

---

## Stack

| Capa        | Tecnología |
| ----------- | ---------- |
| Framework   | Astro 5 (SSG) |
| Lenguaje    | TypeScript (strict) |
| Estilos     | Tailwind CSS v4 (`@tailwindcss/vite`) |
| 3D          | Three.js (carga diferida, con fallback estático) |
| Fuentes     | Archivo Variable + Fraunces Variable (self-hosted) |
| SEO         | `@astrojs/sitemap` + JSON-LD (Organization, WebSite, BreadcrumbList) |

## Comandos

```bash
npm run dev      # desarrollo → http://localhost:4321
npm run build    # build estático → dist/
npm run preview  # servir el build
```

## Landing de campaña `/promo/viviendas-modulares`

Destino de campañas (Meta Ads, Instagram Ads, Facebook Ads, Google Ads).
**No compite con `/viviendas-modulares`** (orgánica/SEO): por defecto es
`noindex, follow` (`FEATURES.promoIndexable: false` en `src/config/features.ts`).

Estructura (componentes en `src/components/promo/`):

- `PromoHeader` (logo + WhatsApp, sticky compacto) · `PromoHero` · `TrustStrip`
- `ProblemSection` (plan → volumen → vivienda, CSS, sin Three.js)
- `PromoModels` + `ModelQuickView` (modal/bottom sheet por modelo, sin salir de la landing)
- `FloorPlanViewer` (planos con cambio de modelo, ampliar y zoom)
- `UseCases` · `Personalization` (sujeto a proyecto) · `PromoProcess` (6 pasos, sin plazos)
- `SouthSection` · `FinancingCTA` (copy prudente) · `PromoTrust` · `PromoFAQ`
- `PromoLeadForm` (lead corto) · `PromoStickyCTA` (mobile, respeta safe-area) · `PromoFinalCta` · `PromoFooter`

Datos del contenido: `src/data/promos.ts`. Modelos: reutiliza `src/data/homes.ts`.

### WhatsApp contextual (conversión principal)

Mensajes centralizados en `src/lib/promo/whatsapp.ts` (hero, modelo con nombre y
superficie, financiación, terreno). El número se resuelve SIEMPRE desde
`src/config/site.ts → whatsapp`; sin número, los CTAs caen al formulario (nunca
se muestra un botón roto).

### UTM y payload del lead

`src/lib/utils/utm.ts` captura `utm_source/utm_medium/utm_campaign/utm_content/
utm_term`, los persiste en `sessionStorage` (`morcat_utm`) y construye el payload
estructurado que acompaña al lead:

```ts
{
  source: 'promo-viviendas-modulares', campaign, model, name, whatsapp,
  email, hasLand, landLocation, intendedUse, message,
  utm_source, utm_medium, utm_campaign, utm_content, utm_term,
  landing_url, timestamp
}
```

El formulario también precarga el modelo de interés desde `utm_content`
(ej. `homero_a01`).

### Analytics

`src/lib/analytics/track.ts` centraliza `trackEvent()` con eventos preparados
(`promo_view`, `hero_whatsapp_click`, `models_view`, `model_open`,
`model_whatsapp_click`, `floorplan_open`, `financing_click`,
`terrain_whatsapp_click`, `form_start`, `form_submit`, `form_success`,
`form_error`, `corporate_site_click`). Sin IDs reales no hay ningún request
externo.

**Dónde conectar cada herramienta (IDs reales pendientes):**

| Integración | Dónde |
| --- | --- |
| **n8n / CRM / Sheets / email** | `src/config/forms.ts → endpoint` (payload JSON con UTM) |
| **Google Analytics 4** | `src/config/features.ts → analytics.ga4` (`enabled: true`, `measurementId`) |
| **Meta Pixel** | `src/config/features.ts → analytics.metaPixel` (`enabled: true`, `pixelId`) |
| **WhatsApp** | `src/config/site.ts → whatsapp` (número internacional) |

### Tests de la landing

```bash
node scripts/run-promo-test.mjs   # lógica UTM + payload + mensajes WhatsApp (27 asserts)
node scripts/verify-promo.mjs     # verificación de la landing contra el server en vivo
```

## Rutas

| Ruta | Página |
| ---- | ------ |
| `/` | Home corporativa |
| `/viviendas-modulares` | Landing de viviendas industrializadas + catálogo filtrable |
| `/viviendas-modulares/[slug]` | Página de cada modelo (datos en `src/data/homes.ts`) |
| `/construccion` | Construcción tradicional, casas, dúplex, a medida |
| `/desarrollos` | Desarrollos inmobiliarios (sin afirmaciones financieras) |
| `/proyectos` | Portfolio con filtro por estado |
| `/proyectos/[slug]` | Página de proyecto (datos en `src/data/projects.ts`) |
| `/nosotros` | Empresa, filosofía, equipo, experiencia |
| `/contacto` | Contacto + formulario |
| `/promo/[slug]` | Landings de campaña (demo: `/promo/viviendas-modulares`) |
| `/capital` | MORCAT Capital System — **desactivada** por configuración |
| `/404` | Página de error |

## Multimedia (assets del cliente)

Las fotos y videos provistos por MORCAT están integrados en todo el sitio.
Detalle completo de la selección, criterios y dónde se usa cada archivo:
**[MEDIA.md](./MEDIA.md)**.

```
src/assets/media/     # imágenes optimizadas (25) + pósters de video
public/media/videos/  # videos comprimidos (5, 0.65–1.61 MB cada uno)
mulmedia-cliente/     # material original sin procesar (no versionado)
```

- **Imágenes**: `MediaImage.astro` resuelve por clave y usa `astro:assets`
  `<Picture>` → **AVIF + WebP + fallback JPG** con `srcset` y `sizes`
  (sin CLS). En build se generan ~270 variantes.
- **Videos**: `VideoPlayer.astro` con póster optimizado, `preload="none"`,
  carga al entrar en viewport y sin autoplay con `prefers-reduced-motion`.
- **Scripts de medios** (material original → listo para el sitio):
  ```bash
  node scripts/media-inventory.mjs   # inventario + hojas de contacto
  node scripts/media-analyze.mjs     # métricas, dedupe (aHash), clasificación
  node scripts/media-select.mjs      # ranking de candidatos + vista previa
  node scripts/media-build.mjs       # optimiza imágenes y recomprime videos
  node scripts/verify-media.mjs      # verifica la integración en vivo
  ```

## Estructura

```
src/
  components/          # Navbar, MobileMenu, Footer, tarjetas, formularios…
    promo/             # Landing de campaña (header, hero, modelos, quick view…)
    illustrations/     # Line art arquitectónico (fallback / planos esquemáticos)
  config/              # site.ts · forms.ts · features.ts  ← PUNTO DE CONFIGURACIÓN
  data/                # homes.ts · projects.ts · construction.ts · promos.ts  ← CONTENIDO
  layouts/             # BaseLayout (chrome completo) · PromoLayout (chrome reducido)
  lib/
    three/             # Escena Three.js desacoplada
    media/             # manifest.ts (índice de imágenes del cliente)
    analytics/         # track.ts (trackEvent centralizado)
    promo/             # whatsapp.ts (mensajes contextuales)
    seo/               # structuredData.ts (JSON-LD)
    utils/             # reveal, demo, format, utm
  pages/               # rutas
  styles/global.css    # sistema visual (paleta MORCAT)
```

## Datos REALES vs DEMO — convención

- Todo dato no confirmado tiene `demo: true` en su fuente de datos.
- El indicador `DEMO CONTENT` se muestra en desarrollo siempre y en
  producción según `FEATURES.showDemoBadges` (`src/config/features.ts`).
- No hay precios, plazos, financiación, métricas de trayectoria ni
  testimonios inventados. Los campos sin dato muestran `—`.

## Puntos de reemplazo (cuando MORCAT provea datos reales)

| Qué | Dónde |
| --- | ----- |
| **Logo SVG oficial** | Reemplazar `src/components/Logo.astro` y `public/images/logo/logo-morcat-placeholder.svg` |
| **Fotos / renders** | `src/assets/media/…` (misma clave = misma foto) · ver `MEDIA.md` |
| **Videos** | `public/media/videos/*.mp4` + póster en `src/assets/media/posters/` |
| **Modelos** | `src/data/homes.ts` (nombre, superficie, specs, features, planos) |
| **Planos** | `src/assets/media/**/plano-*.png` + claves en `homes.ts → floorPlans` |
| **Proyectos** | `src/data/projects.ts` (obras, estados, avances) |
| **WhatsApp** | `src/config/site.ts → whatsapp / whatsappOffice` (formato internacional sin `+`) |
| **Email** | `src/config/site.ts → email` |
| **Formularios** | `src/config/forms.ts → endpoint` (n8n / CRM / API) o `email.to` (envío por mail) |
| **Dominio** | `src/config/site.ts → domain` (afecta canonical y sitemap) |
| **Horarios / dirección** | `src/config/site.ts` |
| **MORCAT Capital** | `src/config/features.ts → capitalEnabled` (requiere info legal/comercial validada) |
| **Landing de campaña** | `src/data/promos.ts` (cada slug genera `/promo/<slug>`) |

## Three.js

- Escena conceptual en `src/lib/three/` (vivienda que se construye: puntos →
  planta → paredes → cubierta → aberturas → volumen translúcido).
- Carga diferida (`import()`): Three.js solo se descarga si el dispositivo
  lo soporta y no tiene `prefers-reduced-motion`.
- Fallback estático (póster wireframe) si no hay WebGL o el hardware es débil.
- Cleanup completo: `dispose`, `cancelAnimationFrame`, `ResizeObserver`,
  `visibilitychange`, DPR acotado, calidad mobile reducida.

## Formularios y leads

- Validación + loading + éxito en el cliente (mejora progresiva).
- Envío resuelto en `src/lib/forms/submit.ts`, en este orden:
  1. **`FORMS.endpoint`** (n8n / CRM / API) si está configurado.
  2. **Email sin backend** (`FORMS.email`) — servicio de reenvío AJAX a
     `pablomartin.gatica.untdf@gmail.com`, con asunto, tabla legible y
     `_replyto` para responder directo al visitante.
     ⚠️ La primera consulta dispara un mail de **activación** que el
     destinatario debe confirmar una sola vez.
  3. **Fallback `mailto:`** con la consulta ya redactada si el envío
     automático falla (o si no hay ningún canal configurado).
- `src/config/forms.ts` centraliza destinatario, asunto y mensajes.

## WhatsApp

- Número oficial en `src/config/site.ts → whatsapp` (`5492901586640`).
- **Botón flotante** en todo el sitio (`WhatsAppFloat.astro`): se oculta
  cuando hay un modal abierto o el formulario en pantalla; en la landing
  de campaña se muestra solo en desktop porque en celular ya existe la
  barra sticky.
- Mensajes **contextuales** por sección y por modelo
  (`src/lib/promo/whatsapp.ts`).

#   m o r c a t  
 