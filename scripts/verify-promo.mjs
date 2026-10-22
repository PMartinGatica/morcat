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
    'hero note (m² desde)': text.includes('Modelos desde 18 m²'),
    'noindex': text.includes('noindex, follow'),
    // Catálogo de la promo: 8 modelos (sin los 2 dúplex, excluidos de esta campaña).
    'quickview panels x8': (text.match(/data-qv-panel=/g) ?? []).length === 8,
    'qv whatsapp real (wa.me)': text.includes('data-qv-wa') && text.includes('wa.me/5492901586640'),
    'qv ficha completa a modelos': text.includes('/viviendas-modulares/homero') && text.includes('/viviendas-modulares/modulo-kuar'),
    'sin dúplex en la promo': !text.includes('data-qv-panel="duplex-austral"') && !text.includes('data-qv-panel="duplex-beagle"'),
    'sin botones de plano (se sacaron)': !text.includes('data-qv-plan') && !text.includes('data-plan-chip') && !text.includes('data-plan-lightbox'),
    'sticky safe-area': text.includes('safe-area-inset-bottom'),
    'form: opciones uso': text.includes('Proyecto turístico') && text.includes('Estoy buscando'),
    'form: modelo select con 8 modelos': (text.match(/<option value="(homero|nexa|nordica|american|cabana|modulo)/g) ?? []).length === 8,
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
