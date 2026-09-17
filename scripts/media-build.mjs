/**
 * Procesa la multimedia seleccionada del cliente.
 * Uso: node scripts/media-build.mjs
 *
 * - Imágenes → src/assets/media/<grupo>/<slug>.jpg|png (optimizadas,
 *   sin metadatos, máx. 2400px) para que astro:assets genere
 *   AVIF/WebP + srcset en el build.
 * - Videos → public/media/videos/<slug>.mp4 (H.264, CRF 28, sin audio,
 *   faststart) + póster JPG en src/assets/media/posters/.
 *
 * Para cambiar una imagen: editar IMAGES/VIDEOS y volver a correr.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web';
const SRC = path.join(ROOT, 'mulmedia-cliente');
const IMG_OUT = path.join(ROOT, 'src/assets/media');
const VIDEO_OUT = path.join(ROOT, 'public/media/videos');

/** [clave destino, carpeta origen, archivo origen] */
const IMAGES = [
  // MODULARES HOME
  ['modulares/cabana-andina', 'MODULARES HOME', 'Cabaña cálida en el bosque andino.png'],
  ['modulares/bosque-01', 'MODULARES HOME', 'Cabaña moderna en el bosque (1).png'],
  ['modulares/neblinoso', 'MODULARES HOME', 'Cabaña moderna en el bosque neblinoso.png'],
  ['modulares/linea-25', 'MODULARES HOME', 'ChatGPT Image 25 abr 2026, 02_26_58 p.m..png'],
  ['modulares/atardecer', 'MODULARES HOME', 'Gemini_Generated_Image_juv4i0juv4i0juv4.png'],
  ['modulares/exterior-02', 'MODULARES HOME', '550dc1d8-6d32-46fd-80d3-355f069e8329.png'],
  ['modulares/plano-21', 'VIVIENDAS NORDICAS', 'Casa 21,5 M2 - Monoambiente - Planos.png'],
  ['modulares/plano-referencia', 'VIVIENDAS NORDICAS', 'plano_original_con_logo_morcat_esquina.jpg'],
  // VIVIENDAS NORDICAS
  ['nordicas/bosque-07', 'VIVIENDAS NORDICAS', 'Cabaña moderna en el bosque (7).png'],
  ['nordicas/bosque-08', 'VIVIENDAS NORDICAS', 'Cabaña moderna en el bosque (8).png'],
  ['nordicas/montanoso', 'VIVIENDAS NORDICAS', 'Casa moderna en el bosque montañoso.png'],
  ['nordicas/paisaje', 'VIVIENDAS NORDICAS', 'Casa moderna en paisaje natural.png'],
  ['nordicas/bosque', 'VIVIENDAS NORDICAS', 'Cabaña moderna en el bosque.png'],
  ['nordicas/otono', 'VIVIENDAS NORDICAS', 'Cabaña minimalista en el bosque otoño (1).png'],
  ['nordicas/platea-flotante', 'VIVIENDAS NORDICAS', 'Platea Flotante.png'],
  ['nordicas/plano-35', 'VIVIENDAS NORDICAS', 'Plano_35M2-removebg-preview.png'],
  // DUPLEX AUSTRAL
  ['duplex/semi-rural', 'Duplex austral', 'Casa moderna en paisaje semi-rural.png'],
  ['duplex/terrazas-jardines', 'Duplex austral', 'Casa moderna con terrazas y jardines.png'],
  ['duplex/panoramica', 'Duplex austral', 'Gemini_Generated_Image_u67ey8u67ey8u67e - copia.png'],
  ['duplex/linea-940', 'Duplex austral', 'ChatGPT Image 25 mar 2026, 10_19_18 a.m..png'],
  ['duplex/plano-alzado', 'Duplex austral', 'Plsanoalz.png'],
  // DESARROLLO INMOBILIARIO
  ['desarrollo/render-01', 'DESAROLLO INMOBILIARIO', '430b67fb22a6845860f1cd459b0348cc.jpg'],
  ['desarrollo/render-02', 'DESAROLLO INMOBILIARIO', '7e1b0879a8c6db6dcfc75f1d5015f3d3.jpg'],
  ['desarrollo/render-03', 'DESAROLLO INMOBILIARIO', 'ad52caf2b14c8a1561b8ace3a46a3165.jpg'],
  ['desarrollo/volumetria', 'DESAROLLO INMOBILIARIO', '95fe19917924236072f8099746573b48.jpg'],
];

/** [clave, carpeta origen, archivo origen] */
const VIDEOS = [
  ['construccion-timelapse', 'MODULARES HOME', 'cinematic-construction-timelapse-of-a-modern-wood-.mp4'],
  ['interior-hogar', 'Duplex austral', 'un_hogar_acogedor_para_una_familia_de.mp4'],
  ['orbital-nordicas', 'VIVIENDAS NORDICAS', 'smooth-cinematic-90-degree-orbital-camera-movement (1).mp4'],
  ['exterior-duplex', 'Duplex austral', 'fixed-camera-view-of-the-same-modern-house-structu.mp4'],
  ['desarrollo-obra', 'DESAROLLO INMOBILIARIO', '202608231407.mp4'],
];

const TRANSPARENT = new Set(['nordicas/plano-35']);

let images = 0;
let videos = 0;
const problems = [];

for (const [key, folder, file] of IMAGES) {
  const input = path.join(SRC, folder, file);
  if (!fs.existsSync(input)) {
    problems.push(`falta: ${folder}/${file}`);
    continue;
  }
  const isPlan = key.includes('plano');
  const isPng = TRANSPARENT.has(key);
  const out = path.join(IMG_OUT, `${key}.${isPng ? 'png' : 'jpg'}`);
  fs.mkdirSync(path.dirname(out), { recursive: true });

  let pipeline = sharp(input, { limitInputPixels: false }).rotate();
  pipeline = isPlan
    ? pipeline.resize({ width: 1800, withoutEnlargement: true })
    : pipeline.resize({ width: 2400, withoutEnlargement: true });

  if (isPng) {
    await pipeline.png({ compressionLevel: 9, palette: false }).toFile(out);
  } else {
    await pipeline.jpeg({ quality: isPlan ? 88 : 82, mozjpeg: true }).toFile(out);
  }
  const kb = Math.round(fs.statSync(out).size / 1024);
  images++;
  console.log(`img  ${key.padEnd(30)} ${String(kb).padStart(5)} KB`);
}

fs.mkdirSync(VIDEO_OUT, { recursive: true });
fs.mkdirSync(path.join(IMG_OUT, 'posters'), { recursive: true });

for (const [key, folder, file] of VIDEOS) {
  const input = path.join(SRC, folder, file);
  if (!fs.existsSync(input)) {
    problems.push(`falta: ${folder}/${file}`);
    continue;
  }
  const out = path.join(VIDEO_OUT, `${key}.mp4`);
  const poster = path.join(IMG_OUT, 'posters', `${key}.jpg`);

  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-i', input,
    '-vf', "scale='min(720,iw)':-2",
    '-c:v', 'libx264', '-crf', '28', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart',
    out,
  ]);

  execFileSync('ffmpeg', [
    '-y', '-v', 'error',
    '-ss', '1', '-i', input,
    '-frames:v', '1', '-vf', "scale='min(1440,iw)':-2",
    poster,
  ]);

  const mb = (fs.statSync(out).size / 1e6).toFixed(2);
  const posterKB = Math.round(fs.statSync(poster).size / 1024);
  videos++;
  console.log(`vid  ${key.padEnd(30)} ${mb.padStart(6)} MB  (poster ${posterKB} KB)`);
}

console.log(`\nImágenes procesadas: ${images}  |  Videos: ${videos}`);
if (problems.length) {
  console.log('Problemas:');
  problems.forEach((p) => console.log('  ! ' + p));
}
