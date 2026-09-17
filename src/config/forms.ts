/**
 * ============================================================
 *  MORCAT — CONFIGURACIÓN DE FORMULARIOS
 * ============================================================
 *  Los formularios están preparados para conectarse a:
 *  - n8n (webhook) · CRM · API propia   → FORMS.endpoint
 *  - email                              → FORMS.email
 *
 *  ORDEN DE ENVÍO (src/lib/forms/submit.ts):
 *   1. Si hay `endpoint` → POST ahí (n8n / CRM / API).
 *   2. Si no, y `email.enabled` → envío por email sin backend
 *      (servicio de reenvío AJAX). Requiere confirmar el mail de
 *      activación la primera vez que llega una consulta.
 *   3. Si falla → se ofrece un mailto con la consulta ya redactada.
 * ============================================================
 */

export type FormProvider = 'n8n' | 'api' | 'email' | 'none';

export const FORMS = {
  /**
   * Endpoint propio que recibe las consultas.
   * Ejemplo n8n: https://n8n.tudominio.com/webhook/morcat-contacto
   * Si está vacío, se usa el envío por email.
   */
  endpoint: '',

  /** Proveedor destino (informativo; el endpoint real lo define). */
  provider: 'email' as FormProvider,

  /**
   * Envío de consultas por email (sin backend).
   * FormSubmit reenvía el POST a la casilla indicada y arma una
   * tabla legible. La respuesta del visitante se configura con
   * `_replyto`, así se puede contestar directo desde el mail.
   */
  email: {
    enabled: true,
    /** Casilla que recibe las consultas. */
    to: 'pablomartin.gatica.untdf@gmail.com',
    /** Endpoint AJAX del servicio de reenvío. */
    ajaxUrl: 'https://formsubmit.co/ajax/pablomartin.gatica.untdf@gmail.com',
    /** Asunto del email. */
    subject: 'Nueva consulta desde la web de MORCAT',
  },

  /** Método HTTP usado al enviar. */
  method: 'POST',

  /** Timeout de la petición (ms). */
  timeoutMs: 12000,

  /** Mensaje de éxito cuando se envió por email. */
  emailSuccessMessage:
    '¡Listo! Recibimos tu consulta y te contactamos a la brevedad.',

  /** Mensaje de éxito cuando hay endpoint propio (n8n / CRM). */
  realSuccessMessage: 'Gracias, tu consulta fue enviada. Te contactamos a la brevedad.',

  /** Mensaje cuando falla el envío automático. */
  errorMessage:
    'No pudimos enviar la consulta automáticamente. Probá de nuevo o escribinos por WhatsApp.',

  /** Tipos de proyecto del selector. */
  projectTypes: [
    'Vivienda modular',
    'Casa',
    'Dúplex',
    'Construcción',
    'Desarrollo inmobiliario',
    'Otro',
  ],
} as const;

export type FormsConfig = typeof FORMS;
