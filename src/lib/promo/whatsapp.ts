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

export type PromoWhatsAppKind = 'hero' | 'model' | 'financing' | 'terrain' | 'commission';

export const PROMO_WHATSAPP_MESSAGES: Record<PromoWhatsAppKind, string> = {
  hero: 'Hola MORCAT, vi la publicación de viviendas modulares y quisiera recibir información.',
  financing:
    'Hola MORCAT, quisiera consultar las opciones de financiación disponibles para viviendas modulares.',
  terrain:
    'Hola MORCAT, tengo un terreno y quisiera saber qué modelo podría adaptarse a mi proyecto.',
  model:
    'Hola MORCAT, estoy interesado/a en un modelo de vivienda modular y quisiera recibir más información.',
  commission:
    'Hola MORCAT, quiero información sobre el programa de comisión por venta de proyectos.',
};

/** Mensaje para un modelo puntual (nombre + superficie). */
export function modelWhatsAppMessage(modelName: string, surface: number): string {
  return `Hola MORCAT, estoy interesado/a en el modelo ${modelName} de ${surface} m². Quisiera recibir más información.`;
}

/** Mensaje con el resultado del cotizador (tipo + m² + estimación). */
export function cotizadorWhatsAppMessage(
  typeName: string,
  surface: number,
  totalUsd: number,
  installmentUsd: number,
): string {
  return `Hola MORCAT, hice una estimación en la web: ${typeName} de ${surface} m² (USD ${totalUsd.toLocaleString('es-AR')} llave en mano, o desde USD ${installmentUsd.toLocaleString('es-AR')}/mes en 48 cuotas). Quisiera avanzar con la cotización real.`;
}

/** Link de WhatsApp contextual, o null si no hay número. */
export function promoWhatsAppLink(kind: PromoWhatsAppKind): string | null {
  return whatsappLink(PROMO_WHATSAPP_MESSAGES[kind]);
}

/** Link de WhatsApp para un modelo puntual. */
export function modelWhatsAppLink(modelName: string, surface: number): string | null {
  return whatsappLink(modelWhatsAppMessage(modelName, surface));
}
