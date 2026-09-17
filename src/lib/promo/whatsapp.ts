/**
 * MORCAT — Mensajes contextuales de WhatsApp para la landing
 * de campaña (/promo/*).
 *
 * Centraliza la generación de URLs/mensajes: el número se
 * resuelve SIEMPRE desde src/config/site.ts (nunca hardcodeado).
 * Si no hay número configurado, las funciones devuelven null y
 * los componentes caen al formulario o a Instagram.
 */
import { whatsappLink } from '../../config/site';

export type PromoWhatsAppKind = 'hero' | 'model' | 'financing' | 'terrain';

export const PROMO_WHATSAPP_MESSAGES: Record<PromoWhatsAppKind, string> = {
  hero: 'Hola MORCAT, vi la publicación de viviendas modulares y quisiera recibir información.',
  financing:
    'Hola MORCAT, quisiera consultar las opciones de financiación disponibles para viviendas modulares.',
  terrain:
    'Hola MORCAT, tengo un terreno y quisiera saber qué modelo podría adaptarse a mi proyecto.',
  model:
    'Hola MORCAT, estoy interesado/a en un modelo de vivienda modular y quisiera recibir más información.',
};

/** Mensaje para un modelo puntual (nombre + superficie). */
export function modelWhatsAppMessage(modelName: string, surface: number): string {
  return `Hola MORCAT, estoy interesado/a en el modelo ${modelName} de ${surface} m². Quisiera recibir más información.`;
}

/** Link de WhatsApp contextual, o null si no hay número. */
export function promoWhatsAppLink(kind: PromoWhatsAppKind): string | null {
  return whatsappLink(PROMO_WHATSAPP_MESSAGES[kind]);
}

/** Link de WhatsApp para un modelo puntual. */
export function modelWhatsAppLink(modelName: string, surface: number): string | null {
  return whatsappLink(modelWhatsAppMessage(modelName, surface));
}
