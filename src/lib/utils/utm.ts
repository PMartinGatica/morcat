/**
 * MORCAT — Captura y persistencia de parámetros UTM.
 *
 * - Lee utm_source/utm_medium/utm_campaign/utm_content/utm_term
 *   de la URL de entrada.
 * - Los persiste en sessionStorage durante toda la sesión
 *   (así sobreviven navegaciones internas dentro de la landing).
 * - Construye el payload estructurado del lead.
 */
const STORAGE_KEY = 'morcat_utm';

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export const EMPTY_UTM: UtmParams = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/** Lee los UTM de una URL (testeable: acepta URL opcional). */
export function getUtmParams(url?: string): UtmParams {
  const out: UtmParams = { ...EMPTY_UTM };
  try {
    const u = new URL(url ?? window.location.href);
    for (const key of UTM_KEYS) {
      const v = u.searchParams.get(key) ?? '';
      out[key] = v.slice(0, 120); // acotado por higiene
    }
  } catch {
    /* sin UTM */
  }
  return out;
}

/** Guarda los UTM actuales en sessionStorage. */
export function persistUtm(params?: UtmParams): UtmParams {
  const current = params ?? getUtmParams();
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* storage no disponible */
  }
  return current;
}

/** Devuelve los UTM vigentes: los de la URL actual si hay, si no los persistidos. */
export function getPersistedUtm(): UtmParams {
  const fromUrl = getUtmParams();
  const hasAny = UTM_KEYS.some((k) => fromUrl[k] !== '');
  if (hasAny) return persistUtm(fromUrl);
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UtmParams>;
      return { ...EMPTY_UTM, ...parsed };
    }
  } catch {
    /* storage no disponible o JSON inválido */
  }
  return { ...EMPTY_UTM };
}

/** Anexa los UTM a un link interno si existen. */
export function withUtm(href: string): string {
  const utm = getPersistedUtm();
  const hasAny = UTM_KEYS.some((k) => utm[k] !== '');
  if (!hasAny) return href;
  const url = new URL(href, window.location.origin);
  for (const key of UTM_KEYS) {
    if (utm[key]) url.searchParams.set(key, utm[key]);
  }
  return url.pathname + url.search;
}

export interface LeadPayload {
  source: string;
  campaign: string;
  model: string;
  name: string;
  whatsapp: string;
  email: string;
  hasLand: string;
  landLocation: string;
  intendedUse: string;
  message: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_url: string;
  timestamp: string;
}

/** Construye el payload estructurado del lead. */
export function buildLeadPayload(
  values: Partial<LeadPayload> & { source: string },
  utmOverride?: Partial<UtmParams>,
): LeadPayload {
  const utm = utmOverride ? { ...EMPTY_UTM, ...utmOverride } : getPersistedUtm();
  return {
    source: values.source ?? 'promo',
    campaign: values.campaign ?? '',
    model: values.model ?? '',
    name: values.name ?? '',
    whatsapp: values.whatsapp ?? '',
    email: values.email ?? '',
    hasLand: values.hasLand ?? '',
    landLocation: values.landLocation ?? '',
    intendedUse: values.intendedUse ?? '',
    message: values.message ?? '',
    utm_source: utm.utm_source,
    utm_medium: utm.utm_medium,
    utm_campaign: utm.utm_campaign,
    utm_content: utm.utm_content,
    utm_term: utm.utm_term,
    landing_url:
      typeof window !== 'undefined' ? window.location.pathname + window.location.search : '',
    timestamp: new Date().toISOString(),
  };
}
