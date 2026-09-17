/**
 * MORCAT — Capa de eventos (analytics) centralizada.
 *
 * Reglas:
 * - NO instalar varias herramientas.
 * - Una sola función trackEvent().
 * - NO realizar requests externos mientras no existan IDs reales
 *   (configurados en src/config/features.ts → analytics).
 * - En desarrollo los eventos se loguean en consola para
 *   depuración; en producción quedan listos para conectarse a
 *   GA4 / Meta Pixel / Google Ads cuando se carguen los IDs.
 */
import { FEATURES } from '../../config/features';

export type PromoEventName =
  | 'promo_view'
  | 'hero_whatsapp_click'
  | 'models_view'
  | 'model_open'
  | 'model_whatsapp_click'
  | 'floorplan_open'
  | 'financing_click'
  | 'terrain_whatsapp_click'
  | 'form_start'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'corporate_site_click';

export type EventParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

const { ga4, metaPixel } = FEATURES.analytics;

function pushGa4(name: string, params: EventParams): void {
  // GA4 vía dataLayer (gtag). Solo si hay measurementId real.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...params });
}

function pushMetaPixel(name: string, params: EventParams): void {
  // Meta Pixel vía fbq. Solo si hay pixelId real.
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', name, params);
  }
}

/**
 * Registra un evento de forma centralizada.
 * Sin IDs configurados: no se dispara ningún request externo.
 */
export function trackEvent(name: PromoEventName, params: EventParams = {}): void {
  const payload: EventParams = { event_name: name, ...params, ts: Date.now() };

  if (import.meta.env.DEV) {
    // Depuración en desarrollo (sin enviar nada a la red).
    console.info('[track]', name, params);
  }

  if (ga4.enabled && ga4.measurementId) pushGa4(name, payload);
  if (metaPixel.enabled && metaPixel.pixelId) pushMetaPixel(name, payload);
}

/** Helper: trackear clics en links (fire-and-forget). */
export function trackLinkClick(
  el: Element | null,
  name: PromoEventName,
  params: EventParams = {},
): void {
  el?.addEventListener('click', () => trackEvent(name, params), { once: true });
}
