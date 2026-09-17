/**
 * Prueba del envío de consultas por email (FormSubmit AJAX).
 * Uso: node scripts/test-lead-email.mjs
 *
 * Envía UNA consulta de prueba al email configurado en
 * src/config/forms.ts. La primera vez, el destinatario recibe un
 * mail de activación que debe confirmar.
 */
import { FORMS } from '../src/config/forms.ts';

const payload = {
  name: 'PRUEBA AUTOMÁTICA',
  lastname: 'Sitio MORCAT',
  whatsapp: '+54 2901 58-6640',
  email: 'pablomartin.gatica.untdf@gmail.com',
  projectType: 'Vivienda modular',
  model: 'homero-a01',
  hasLand: 'Sí',
  landLocation: 'Ushuaia (prueba)',
  intendedUse: 'Vivienda',
  message:
    'Prueba de integración del formulario del sitio web. Si recibís este mail, el envío de consultas funciona correctamente.',
  source: 'test-integracion',
  landing_url: '/promo/viviendas-modulares',
  timestamp: new Date().toISOString(),
};

console.log('POST →', FORMS.email.ajaxUrl);

const res = await fetch(FORMS.email.ajaxUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // Simula el contexto del navegador (FormSubmit rechaza pedidos
    // sin origen de página web).
    Origin: 'http://localhost:4321',
    Referer: 'http://localhost:4321/promo/viviendas-modulares',
  },
  body: JSON.stringify({
    ...payload,
    _subject: `${FORMS.email.subject} · PRUEBA`,
    _template: 'table',
    _captcha: 'false',
    _replyto: payload.email,
  }),
});

const text = await res.text();
console.log('status:', res.status);
console.log('respuesta:', text.slice(0, 600));
process.exitCode = res.ok ? 0 : 1;
