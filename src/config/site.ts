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
 *  - whatsapp / whatsappOffice: números NO cargados todavía.
 *    Mientras estén vacíos, los botones de WhatsApp se ocultan
 *    y se reemplazan por el formulario / Instagram.
 *  - email: dirección provisional, marcada como demo.
 *  - logo: se usa un placeholder hasta recibir el SVG oficial.
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
  facebook: null as string | null,

  /**
   * WhatsApp — número oficial de MORCAT.
   * Formato internacional sin símbolos (móvil Argentina: 549 + área + número).
   * +54 2901 58-6640 → 5492901586640
   */
  whatsapp: '5492901586640',
  whatsappOffice: '5492901586640',

  /** Email oficial de MORCAT. */
  email: 'morcat99@gmail.com',
  emailDemo: false,

  /** Dirección publicada. */
  address: 'Transporte Villarino 474',
  city: 'Ushuaia',
  province: 'Tierra del Fuego',
  country: 'Argentina',
  /** Horario publicado. */
  openingHours: '09:00 – 18:00',

  /** Zona horaria (para structured data). */
  timezone: 'America/Argentina/Ushuaia',

  /** Coordenadas aproximadas de Ushuaia (para LocalBusiness). */
  latitude: -54.8019,
  longitude: -68.303,

  /** Fecha de fundación — NO cargada. Dejar null hasta confirmar. */
  foundingDate: null as string | null,

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
  office = false,
): string | null {
  const number = office ? SITE.whatsappOffice : SITE.whatsapp;
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type SiteConfig = typeof SITE;
