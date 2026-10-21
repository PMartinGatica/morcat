/**
 * Pruebas de lógica de la landing promo (UTM + WhatsApp).
 * Se ejecuta con: node scripts/run-promo-test.mjs
 * (el bundle lo genera esbuild).
 */
import {
  getUtmParams,
  getPersistedUtm,
  buildLeadPayload,
  EMPTY_UTM,
} from '../src/lib/utils/utm';
import {
  modelWhatsAppMessage,
  modelWhatsAppLink,
  promoWhatsAppLink,
  PROMO_WHATSAPP_MESSAGES,
} from '../src/lib/promo/whatsapp';

let failures = 0;

function assert(cond: boolean, label: string): void {
  if (cond) {
    console.log(`  ✓ ${label}`);
  } else {
    failures++;
    console.error(`  ✗ ${label}`);
  }
}

console.log('— UTM —');
const utm = getUtmParams(
  'https://www.morcat.com.ar/promo/viviendas-modulares?utm_source=instagram&utm_medium=paid_social&utm_campaign=modulares_agosto&utm_content=homero_a01&utm_term=test',
);
assert(utm.utm_source === 'instagram', 'utm_source capturado');
assert(utm.utm_medium === 'paid_social', 'utm_medium capturado');
assert(utm.utm_campaign === 'modulares_agosto', 'utm_campaign capturado');
assert(utm.utm_content === 'homero_a01', 'utm_content capturado');
assert(utm.utm_term === 'test', 'utm_term capturado');
assert(JSON.stringify(getUtmParams('https://x.com/sin-utm')) === JSON.stringify(EMPTY_UTM), 'sin UTM → vacío');

console.log('— Payload —');
const payload = buildLeadPayload(
  {
    source: 'promo-viviendas-modulares',
    campaign: utm.utm_campaign,
    model: 'homero_a01',
    name: 'Ana Pérez',
    whatsapp: '+54 9 2901 123456',
    email: 'ana@ejemplo.com',
    hasLand: 'Sí',
    landLocation: 'Valle de Andorra',
    intendedUse: 'Vivienda',
    message: 'Quiero información',
  },
  utm, // en el navegador esto proviene de window.location; acá se pasa explícito
);
assert(payload.source === 'promo-viviendas-modulares', 'source correcto');
assert(payload.model === 'homero_a01', 'model en payload');
assert(payload.name === 'Ana Pérez', 'name en payload');
assert(payload.whatsapp === '+54 9 2901 123456', 'whatsapp en payload');
assert(payload.hasLand === 'Sí', 'hasLand en payload');
assert(payload.landLocation === 'Valle de Andorra', 'landLocation en payload');
assert(payload.intendedUse === 'Vivienda', 'intendedUse en payload');
assert(payload.utm_source === 'instagram', 'utm_source llega al payload');
assert(payload.utm_medium === 'paid_social', 'utm_medium llega al payload');
assert(payload.utm_campaign === 'modulares_agosto', 'utm_campaign llega al payload');
assert(payload.utm_content === 'homero_a01', 'utm_content llega al payload');
assert(payload.utm_term === 'test', 'utm_term llega al payload');
assert(typeof payload.timestamp === 'string' && payload.timestamp.length > 0, 'timestamp presente');
assert('landing_url' in payload, 'landing_url presente en el payload');

console.log('— WhatsApp —');
const msg = modelWhatsAppMessage('Homero');
assert(msg.includes('Homero'), 'mensaje de modelo incluye el nombre');
assert(PROMO_WHATSAPP_MESSAGES.hero.includes('viviendas modulares'), 'mensaje hero contextual');
assert(PROMO_WHATSAPP_MESSAGES.financing.includes('financiación'), 'mensaje financiación contextual');
assert(PROMO_WHATSAPP_MESSAGES.terrain.includes('terreno'), 'mensaje terreno contextual');
assert(modelWhatsAppLink('Homero') === null, 'sin número configurado → link null (fallback honesto)');
assert(promoWhatsAppLink('hero') === null, 'promoWhatsAppLink hero null sin número');

console.log('— Persistencia (fallback sin sessionStorage) —');
const persisted = getPersistedUtm();
assert(typeof persisted === 'object' && persisted !== null, 'getPersistedUtm no lanza en entornos sin storage');

if (failures > 0) {
  console.error(`\n${failures} prueba(s) fallaron`);
  process.exit(1);
}
console.log('\nTodas las pruebas pasaron ✓');
