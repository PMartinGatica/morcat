/**
 * Verificación de la landing promo contra el servidor en vivo.
 * Uso: node scripts/verify-promo.mjs
 *
 * Nota: las cadenas de mensajes WhatsApp y la lógica UTM se
 * verifican con scripts/run-promo-test.mjs (test unitario);
 * los chunks de producción se revisaron contra dist/_astro.
 */
const base = 'http://localhost:4321';

async function main() {
  const text = await (await fetch(`${base}/promo/viviendas-modulares`)).text();

  const checks = {
    'status hero copy': text.includes('TU PRÓXIMA') && text.includes('EMPIEZA ACÁ'),
    'hero note 18-45': text.includes('Modelos de 18 a 45 m²'),
    'noindex': text.includes('noindex, follow'),
    'quickview panels x10': (text.match(/data-qv-panel=/g) ?? []).length === 10,
    'qv whatsapp real (wa.me)': text.includes('data-qv-wa') && text.includes('wa.me/5492901586640'),
    'qv ficha completa a modelos': text.includes('/viviendas-modulares/homero') && text.includes('/viviendas-modulares/duplex-beagle'),
    'qv botones de plano x3': (text.match(/data-qv-plan=/g) ?? []).length === 3,
    'plan chips x3': (text.match(/data-plan-chip=/g) ?? []).length === 3,
    'plan lightbox': text.includes('data-plan-lightbox'),
    'sticky safe-area': text.includes('safe-area-inset-bottom'),
    'form: opciones uso': text.includes('Proyecto turístico') && text.includes('Estoy buscando'),
    'form: modelo select con 10 modelos': (text.match(/<option value="(homero|nexa|nordica|duplex|american|cabana|modulo)/g) ?? []).length === 10,
    'form: CTA QUIERO RECIBIR': text.includes('QUIERO RECIBIR INFORMACIÓN'),
    'sin Three.js en la página': !text.includes('ThreeHero') && !text.includes('architectureScene'),
    'sin navbar corporativo': !text.includes('data-navbar'),
  };
  let ok = true;
  for (const [k, v] of Object.entries(checks)) {
    console.log(`${v ? 'OK  ' : 'FAIL'} ${k}`);
    if (!v) ok = false;
  }
  if (!ok) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
