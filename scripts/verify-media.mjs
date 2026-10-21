/**
 * Verificación de multimedia integrada (servidor en vivo).
 * Uso: node scripts/verify-media.mjs
 */
const base = 'http://localhost:4321';

const routes = [
  '/',
  '/viviendas-modulares',
  '/viviendas-modulares/homero',
  '/viviendas-modulares/nexa-austral',
  '/construccion',
  '/desarrollos',
  '/proyectos',
  '/proyectos/duplex-austral',
  '/nosotros',
  '/promo/viviendas-modulares',
];

async function main() {
  let ok = true;

  for (const route of routes) {
    const res = await fetch(base + route);
    const html = await res.text();
    const pictures = (html.match(/<picture/g) ?? []).length;
    const avif = (html.match(/type="image\/avif"/g) ?? []).length;
    const webp = (html.match(/type="image\/webp"/g) ?? []).length;
    const videos = (html.match(/data-video-figure/g) ?? []).length;
    const srset = (html.match(/srcset=/g) ?? []).length;

    const pass = res.status === 200 && pictures > 0 && avif > 0 && webp > 0;
    if (!pass) ok = false;
    console.log(
      `${pass ? 'OK  ' : 'FAIL'} ${route.padEnd(36)} ${res.status}  <picture>:${String(pictures).padStart(2)}  avif:${String(avif).padStart(2)}  webp:${String(webp).padStart(2)}  srcset:${String(srset).padStart(2)}  videos:${videos}`,
    );
  }

  // Assets concretos
  const assets = [
    '/media/videos/interior-hogar.mp4',
    '/media/videos/construccion-timelapse.mp4',
    '/media/videos/desarrollo-obra.mp4',
  ];
  for (const a of assets) {
    const res = await fetch(base + a, { method: 'HEAD' });
    const pass = res.status === 200;
    if (!pass) ok = false;
    console.log(`${pass ? 'OK  ' : 'FAIL'} asset ${a} → ${res.status}`);
  }

  // La landing promo debe incluir los videos del showcase
  const promo = await (await fetch(base + '/promo/viviendas-modulares')).text();
  const posters = (promo.match(/poster="/g) ?? []).length;
  const preloadNone = (promo.match(/preload="none"/g) ?? []).length;
  const checks = {
    'promo: videos del showcase': (promo.match(/data-video-figure/g) ?? []).length >= 2,
    'promo: hero con imagen real': promo.includes('cabana-andina'),
    'promo: planos reales': promo.includes('plano-21') && promo.includes('plano-35'),
    'promo: sin ilustraciones viejas': !promo.includes('ArchIllustration'),
    'videos: poster optimizado': posters >= 2,
    'videos: preload=none (no descargan solos)': preloadNone >= 2,
  };
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
