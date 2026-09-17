/**
 * ============================================================
 *  MORCAT — CARACTERÍSTICAS / FLAGS DEL SITIO
 * ============================================================
 *  Controla secciones y comportamientos que todavía no están
 *  listos para producción.
 * ============================================================
 */

export const FEATURES = {
  /**
   * MORCAT CAPITAL SYSTEM — sección de inversión / fideicomisos.
   * Desactivada hasta que exista información legal y comercial
   * validada. Cuando se habilite, /capital deja de redirigir.
   */
  capitalEnabled: false,

  /**
   * Muestra el indicador "DEMO CONTENT" sobre datos no confirmados.
   * En desarrollo aparece siempre; en producción se puede ocultar
   * poniendo esto en false.
   */
  showDemoBadges: true,

  /**
   * Indica si el sitio se encuentra en etapa de demo (avisos
   * globales en el pie). En false: el sitio se presenta como
   * versión final; los badges por dato no confirmado siguen
   * dependiendo de `showDemoBadges`.
   */
  siteInDemo: false,

  /**
   * Métricas de trayectoria — DATOS CONFIRMADOS POR MORCAT.
   * `prefix` permite mostrar "+50" sin inventar formato.
   * Si un dato deja de ser válido: value en null (se muestra "—").
   */
  metrics: [
    {
      label: 'Años de trayectoria',
      prefix: '',
      value: 15 as number | null,
      suffix: '',
      demo: false,
    },
    {
      label: 'Obras entregadas',
      prefix: '+',
      value: 50 as number | null,
      suffix: '',
      demo: false,
    },
    {
      label: 'm² construidos',
      prefix: '+',
      value: 1000 as number | null,
      suffix: '',
      demo: false,
    },
    {
      label: 'Viviendas industrializadas',
      prefix: '+',
      value: 100 as number | null,
      suffix: '',
      demo: false,
    },
  ],

  /**
   * Indicadores de analytics.
   * IDs REALES pendientes: no se inventan. Mientras estén
   * vacíos, trackEvent() solo registra en consola (dev) y no
   * realiza ningún request externo.
   */
  analytics: {
    ga4: { enabled: false, measurementId: '' },
    metaPixel: { enabled: false, pixelId: '' },
  },

  /**
   * Indexación de landing de campaña (/promo/*).
   * Por defecto las landings de performance NO se indexan
   * (noindex, follow) para no competir con la landing orgánica
   * /viviendas-modulares.
   */
  promoIndexable: false,

  /**
   * Umbrales de scroll y animación.
   */
  navSolidAfter: 32,
} as const;

export type FeaturesConfig = typeof FEATURES;
