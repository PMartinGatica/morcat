/**
 * ============================================================
 *  MORCAT CONSTRUCTORA SRL — CONFIGURACIÓN DEL SITIO
 * ============================================================
 *  Toda la información pública de contacto y de la empresa se
 *  centraliza acá. Cambiar un dato aquí lo actualiza en todo
 *  el sitio (navbar, footer, contacto, datos estructurados SEO).
 *
 *  ⚠️  DATOS DEMO / PENDIENTES:
 *  - domain: dominio definitivo sin confirmar (usar https://...).
 *  - logo: ya es el real (src/assets/media/logo/morcat-badge.png),
 *    confirmado como definitivo — no habrá versión vectorial.
 * ============================================================
 */

export const SITE = {
  /** Nombre comercial corto (navbar, footer). */
  companyName: 'MORCAT',
  /** Razón social completa. */
  legalName: 'MORCAT CONSTRUCTORA SRL',
  /** Dominio definitivo — TODO: confirmar con MORCAT. */
  domain: 'https://www.morcat.com.ar',

  /** Redes sociales. */
  instagram: 'https://www.instagram.com/_morcat',
  instagramHandle: '@_morcat',
  facebook: 'https://www.facebook.com/morcatt?locale=es_LA' as string | null,

  /**
   * WhatsApp — número oficial de MORCAT. Formato internacional sin
   * símbolos (móvil Argentina: 549 + área + número).
   * +54 2901 40-9885 → 5492901409885
   */
  whatsapp: '5492901409885',

  /** Email oficial de MORCAT. */
  email: 'contacto@morcat.ar',
  emailDemo: false,

  /** Dirección publicada. */
  address: 'Transporte Villarino 474',
  city: 'Ushuaia',
  province: 'Tierra del Fuego',
  country: 'Argentina',
  /** Horario publicado (lunes a viernes). */
  openingHours: '09:00 – 20:00',
  /** Horario de sábados. */
  openingHoursSaturday: '10:30 – 16:00',

  /** Zona horaria (para structured data). */
  timezone: 'America/Argentina/Ushuaia',

  /** Coordenadas aproximadas de Ushuaia (para LocalBusiness). */
  latitude: -54.8019,
  longitude: -68.303,

  /** Fecha de fundación (1998 → 28 años de trayectoria en 2026). */
  foundingDate: '1998-01-01' as string | null,

  /** Año actual para el footer. */
  get year(): number {
    return new Date().getFullYear();
  },
} as const;

/** Utilidades para construir URLs absolutas. */
export function absoluteUrl(path = '/'): string {
  const base = SITE.domain.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Link de WhatsApp listo para usar, o null si no hay número. */
export function whatsappLink(
  message: string = 'Hola MORCAT, quiero información sobre un proyecto.',
): string | null {
  if (!SITE.whatsapp) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type SiteConfig = typeof SITE;
