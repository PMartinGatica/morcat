/**
 * MORCAT — Envío de leads de formulario.
 *
 * Orden:
 *  1. `FORMS.endpoint` (n8n / CRM / API) si está configurado.
 *  2. Envío por email sin backend (`FORMS.email`) — servicio de
 *     reenvío AJAX con asunto, tabla legible y `_replyto` para
 *     responder directo al visitante.
 *  3. Si nada funciona, el formulario ofrece un `mailto:` con la
 *     consulta ya redactada.
 */
import { FORMS } from '../../config/forms';

export type SubmitChannel = 'endpoint' | 'email' | 'none';

export interface SubmitResult {
  ok: boolean;
  channel: SubmitChannel;
}

export type LeadValues = object;

function entriesOf(values: LeadValues): [string, string][] {
  return Object.entries(values).filter(
    (entry): entry is [string, string] => typeof entry[1] === 'string',
  );
}

/** Campos legibles para el email / mailto. */
const LABELS: Record<string, string> = {
  source: 'Origen',
  campaign: 'Campaña',
  model: 'Modelo de interés',
  name: 'Nombre',
  lastname: 'Apellido',
  whatsapp: 'WhatsApp',
  email: 'Email',
  hasLand: '¿Tiene terreno?',
  landLocation: 'Ubicación del terreno',
  intendedUse: 'Uso previsto',
  message: 'Mensaje',
  phone: 'Teléfono',
  projectType: 'Tipo de proyecto',
  utm_source: 'UTM source',
  utm_medium: 'UTM medium',
  utm_campaign: 'UTM campaign',
  utm_content: 'UTM content',
  utm_term: 'UTM term',
  landing_url: 'Página',
  timestamp: 'Fecha',
};

const ORDER = [
  'name',
  'lastname',
  'whatsapp',
  'phone',
  'email',
  'projectType',
  'model',
  'hasLand',
  'landLocation',
  'intendedUse',
  'message',
  'source',
  'campaign',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'landing_url',
  'timestamp',
];

function orderedEntries(values: LeadValues): [string, string][] {
  const entries = entriesOf(values);
  const keys = entries.map(([k]) => k);
  const ordered = ORDER.filter((k) => keys.includes(k));
  const rest = keys.filter((k) => !ORDER.includes(k));
  const byKey = new Map(entries);
  return [...ordered, ...rest]
    .map((k) => [LABELS[k] ?? k, byKey.get(k) ?? ''] as [string, string])
    .filter(([, v]) => v !== '');
}

/** Cuerpo de texto plano de la consulta (para mailto y logs). */
export function buildPlainText(values: LeadValues): string {
  return orderedEntries(values)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

/** mailto listo para usar con la consulta redactada. */
export function buildMailto(values: LeadValues, to = FORMS.email.to): string {
  const source = (values as { source?: string }).source ?? '';
  const isLead = source.includes('promo');
  const subject = `${FORMS.email.subject}${isLead ? ' · Campaña' : ''}`;
  const body = buildPlainText(values);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function withTimeout(): { signal: AbortSignal; done: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORMS.timeoutMs);
  return { signal: controller.signal, done: () => clearTimeout(timer) };
}

/** Envía el lead por el canal configurado. */
export async function submitLead(
  values: LeadValues,
  options: { subject?: string } = {},
): Promise<SubmitResult> {
  // 1 · Endpoint propio
  if (FORMS.endpoint) {
    const { signal, done } = withTimeout();
    try {
      const res = await fetch(FORMS.endpoint, {
        method: FORMS.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal,
      });
      done();
      if (res.ok) return { ok: true, channel: 'endpoint' };
      return { ok: false, channel: 'none' };
    } catch {
      done();
      return { ok: false, channel: 'none' };
    }
  }

  // 2 · Email sin backend
  if (FORMS.email.enabled) {
    const { signal, done } = withTimeout();
    const replyTo = (values as { email?: string }).email;
    try {
      const res = await fetch(FORMS.email.ajaxUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...values,
          _subject: options.subject ?? FORMS.email.subject,
          _template: 'table',
          _captcha: 'false',
          _replyto: replyTo || undefined,
        }),
        signal,
      });
      done();
      if (res.ok) return { ok: true, channel: 'email' };
      return { ok: false, channel: 'none' };
    } catch {
      done();
      return { ok: false, channel: 'none' };
    }
  }

  return { ok: false, channel: 'none' };
}

/** Mensaje de éxito según el canal usado. */
export function successMessage(channel: SubmitChannel): string {
  return channel === 'endpoint' ? FORMS.realSuccessMessage : FORMS.emailSuccessMessage;
}
