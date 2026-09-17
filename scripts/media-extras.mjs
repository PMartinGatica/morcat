/**
 * Vista previa de planos y desarrollo + datos de los videos.
 * Uso: node scripts/media-extras.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/mulmedia-cliente';

const TARGETS = [
  ['VIVIENDAS NORDICAS', 'Casa 21,5 M2 - Monoambiente - Planos.png'],
  ['VIVIENDAS NORDICAS', 'Plano_35M2-removebg-preview.png'],
  ['VIVIENDAS NORDICAS', 'plano_original_con_logo_morcat_esquina.jpg'],
  ['Duplex austral', 'Plsanoalz.png'],
  ['VIVIENDAS NORDICAS', 'Platea Flotante.png'],
  ['VIVIENDAS NORDICAS', 'Captura.PNG'],
  ['DESAROLLO INMOBILIARIO', '430b67fb22a6845860f1cd459b0348cc.jpg'],
  ['DESAROLLO INMOBILIARIO', '95fe19917924236072f8099746573b48.jpg'],
  ['DESAROLLO INMOBILIARIO', '7e1b0879a8c6db6dcfc75f1d5015f3d3.jpg'],
  ['DESAROLLO INMOBILIARIO', 'WhatsApp Image 2026-09-10 at 5.11.03 PM.jpeg'],
  ['DESAROLLO INMOBILIARIO', 'descarga.png'],
  ['DESAROLLO INMOBILIARIO', 'ad52caf2b14c8a1561b8ace3a46a3165.jpg'],
];

const W = 40;
const H = 13;

async function preview(file) {
  const { data, info } = await sharp(file, { limitInputPixels: false })
    .resize(W, H, { fit: 'fill' })
    .flatten({ background: '#ffffff' })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rows = [];
  for (let y = 0; y < info.height; y++) {
    let line = '';
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const sat = Math.max(r, g, b) - Math.min(r, g, b);
      let ch;
      if (v < 42) ch = '#';
      else if (sat < 26) ch = v > 205 ? 'W' : v > 120 ? '+' : '.';
      else if (b >= r && b >= g) ch = v > 150 ? 'b' : 'B';
      else if (g >= r && g >= b) ch = v > 130 ? 'g' : 'G';
      else ch = v > 150 ? 'y' : 'Y';
      line += ch;
    }
    rows.push(line);
  }
  return rows;
}

for (const [folder, name] of TARGETS) {
  const file = path.join(ROOT, folder, name);
  if (!fs.existsSync(file)) {
    console.log(`\n! no existe: ${folder}/${name}`);
    continue;
  }
  try {
    const rows = await preview(file);
    console.log(`\n=== ${folder} / ${name} ===`);
    console.log(rows.map((l) => '   ' + l).join('\n'));
  } catch (e) {
    console.log(`\n! ${name}: ${e.message.split('\n')[0]}`);
  }
}

console.log('\n\n=== VIDEOS ===');
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.toLowerCase().endsWith('.mp4')) acc.push(full);
  }
  return acc;
}

for (const file of walk(ROOT)) {
  try {
    const out = execFileSync(
      'ffprobe',
      [
        '-v', 'error',
        '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height,r_frame_rate,duration',
        '-show_entries', 'format=size,bit_rate',
        '-of', 'default=noprint_wrappers=1',
        file,
      ],
      { encoding: 'utf8' },
    ).trim().replace(/\n/g, '  ');
    const mb = (fs.statSync(file).size / 1e6).toFixed(1);
    console.log(`  ${mb} MB  ${path.basename(path.dirname(file))}/${path.basename(file)}\n      ${out}`);
  } catch (e) {
    console.log(`  ! ${path.basename(file)}: ${e.message.split('\n')[0]}`);
  }
}
