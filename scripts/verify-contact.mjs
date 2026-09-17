/**
 * Verifica los cambios de contacto: WhatsApp flotante, número,
 * email, textos de demo y envío de formularios.
 * Uso: node scripts/verify-contact.mjs
 */
const base = 'http://localhost:4321';
const PHONE = '5492901586640';
const EMAIL = 'morcat99@gmail.com';
const LEAD_EMAIL = 'pablomartin.gatica.untdf@gmail.com';

async function main() {
  let ok = true;
  const pages = ['/', '/contacto', '/viviendas-modulares', '/construccion', '/promo/viviendas-modulares'];

  for (const path of pages) {
    const html = await (await fetch(base + path)).text();
    const checks = {
      [`${path} · WhatsApp flotante`]: html.includes('data-wa-float'),
      [`${path} · link wa.me con número`]: html.includes(`wa.me/${PHONE}`),
      [`${path} · sin texto de demo`]: !html.includes('etapa de demostración') &&
        !html.includes('Modo demostración') &&
        !html.includes('Contenido de demostración'),
    };
    for (const [k, v] of Object.entries(checks)) {
      console.log(`${v ? 'OK  ' : 'FAIL'} ${k}`);
      if (!v) ok = false;
    }
  }

  // Email oficial en footer/contacto
  const contact = await (await fetch(base + '/contacto')).text();
  const emailOk = contact.includes(EMAIL);
  console.log(`${emailOk ? 'OK  ' : 'FAIL'} email oficial (${EMAIL}) visible`);
  if (!emailOk) ok = false;
  const oldEmail = contact.includes('contacto@morcat.com.ar');
  console.log(`${!oldEmail ? 'OK  ' : 'FAIL'} sin email viejo de ejemplo`);
  if (oldEmail) ok = false;

  // Formularios: en producción todo queda en dist/_astro/*.js
  // (en dev los imports van en módulos aparte, por eso se revisa el build).
  const { readdirSync, readFileSync, existsSync } = await import('node:fs');
  const { join } = await import('node:path');
  const distDir = join(process.cwd(), 'dist', '_astro');
  let bundles = '';
  if (existsSync(distDir)) {
    for (const f of readdirSync(distDir).filter((f) => f.endsWith('.js') && !f.includes('architectureScene'))) {
      bundles += readFileSync(join(distDir, f), 'utf8');
    }
  }
  const submitOk = bundles.includes(LEAD_EMAIL) && bundles.includes('_subject') && bundles.includes('_replyto');
  console.log(`${submitOk ? 'OK  ' : 'FAIL'} formulario envía a ${LEAD_EMAIL} (con _subject/_replyto)`);
  if (!submitOk) ok = false;

  const noDemoMsg = !bundles.includes('modo demostración');
  console.log(`${noDemoMsg ? 'OK  ' : 'FAIL'} sin mensaje de modo demostración en el bundle`);
  if (!noDemoMsg) ok = false;

  // Mensajes contextuales de WhatsApp por modelo (con número real ahora)
  const promo = await (await fetch(base + '/promo/viviendas-modulares')).text();
  const modelMsg = promo.includes('estoy%20interesado%2Fa%20en%20el%20modelo') ||
    promo.includes('interesado%2Fa en el modelo') ||
    promo.includes('interesado/a en el modelo');
  console.log(`${modelMsg ? 'OK  ' : 'FAIL'} mensaje de WhatsApp por modelo con nombre y superficie`);
  if (!modelMsg) ok = false;

  const financing = promo.includes('financiaci');
  console.log(`${financing ? 'OK  ' : 'FAIL'} mensaje de financiación presente`);
  if (!financing) ok = false;

  if (!ok) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
