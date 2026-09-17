/**
 * Análisis programático de la multimedia del cliente.
 * Uso: node scripts/media-analyze.mjs
 *
 * Para cada imagen calcula: dimensiones, orientación, contraste,
 * saturación, % de blanco/transparente, clasificación (render /
 * plano / collage) y un aHash para detectar duplicados visuales.
 * Salida: .tmp-media/analysis.json
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/mulmedia-cliente';
const OUT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/.tmp-media';
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const inventory = JSON.parse(fs.readFileSync(path.join(OUT, 'inventory.json'), 'utf8'));

/** Hash perceptual 8x8 (aHash) → string de 64 bits. */
async function aHash(file) {
  const { data } = await sharp(file, { limitInputPixels: false })
    .resize(8, 8, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  return Array.from(data)
    .map((v) => (v > avg ? '1' : '0'))
    .join('');
}

function hamming(a, b) {
  let d = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++;
  return d;
}

/** Proporción de píxeles casi blancos / transparentes. */
async function ratios(file) {
  const { data, info } = await sharp(file, { limitInputPixels: false })
    .resize(64, 64, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const px = info.width * info.height;
  let white = 0;
  let transparent = 0;
  let dark = 0;
  for (let i = 0; i < px; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const a = data[i * 4 + 3];
    if (a < 24) transparent++;
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (lum > 235) white++;
    if (lum < 40) dark++;
  }
  return { nearWhite: +(white / px).toFixed(3), transparent: +(transparent / px).toFixed(3), dark: +(dark / px).toFixed(3) };
}

const results = [];

for (const folder of inventory) {
  for (const item of folder.items) {
    if (!IMG_EXT.has(item.ext)) continue;
    const full = path.join(ROOT, folder.folder, item.name);
    try {
      const stats = await sharp(full, { limitInputPixels: false }).stats();
      const r = await ratios(full);
      const hash = await aHash(full);

      const w = item.width ?? 0;
      const h = item.height ?? 0;
      const ratio = h ? +(w / h).toFixed(2) : 0;
      const orientation = ratio > 1.15 ? 'landscape' : ratio < 0.87 ? 'portrait' : 'square';
      const contrast = +(
        (stats.channels[0].stdev + stats.channels[1].stdev + stats.channels[2].stdev) / 3
      ).toFixed(1);
      const saturation = +(
        (stats.channels[0].mean + stats.channels[1].mean + stats.channels[2].mean) / 3
      ).toFixed(0);

      let kind = 'render';
      const lower = item.name.toLowerCase();
      if (lower.includes('collage')) kind = 'collage';
      else if (r.transparent > 0.45) kind = 'plano';
      else if (r.nearWhite > 0.72 && contrast < 62) kind = 'plano';
      else if (lower.includes('plano') || lower.includes('solo')) kind = 'plano';

      results.push({
        folder: folder.folder,
        name: item.name,
        w,
        h,
        ratio,
        orientation,
        sizeKB: item.sizeKB,
        contrast,
        meanLum: saturation,
        nearWhite: r.nearWhite,
        transparent: r.transparent,
        darkRatio: r.dark,
        kind,
        hash,
      });
    } catch (err) {
      console.warn(`! ${item.name}: ${err.message.split('\n')[0]}`);
    }
  }
}

// Duplicados visuales (Hamming <= 6)
const groups = [];
const used = new Set();
for (let i = 0; i < results.length; i++) {
  if (used.has(i)) continue;
  const group = [i];
  used.add(i);
  for (let j = i + 1; j < results.length; j++) {
    if (used.has(j)) continue;
    if (hamming(results[i].hash, results[j].hash) <= 6) {
      group.push(j);
      used.add(j);
    }
  }
  if (group.length > 1) {
    groups.push(
      group.map((idx) => `${results[idx].folder}/${results[idx].name}`),
    );
  }
}

fs.writeFileSync(
  path.join(OUT, 'analysis.json'),
  JSON.stringify({ results, duplicateGroups: groups }, null, 2),
);

const byFolder = {};
for (const r of results) {
  byFolder[r.folder] ??= { render: 0, plano: 0, collage: 0, landscape: 0, portrait: 0, square: 0, hd: 0 };
  byFolder[r.folder][r.kind]++;
  byFolder[r.folder][r.orientation]++;
  if (r.w >= 1600) byFolder[r.folder].hd++;
}
console.log('=== RESUMEN POR CARPETA ===');
for (const [folder, s] of Object.entries(byFolder)) {
  console.log(
    `${folder}\n  renders: ${s.render} | planos: ${s.plano} | collages: ${s.collage}\n  landscape: ${s.landscape} | portrait: ${s.portrait} | square: ${s.square} | ≥1600px: ${s.hd}`,
  );
}
console.log(`\nGrupos de duplicados visuales: ${groups.length}`);
groups.slice(0, 12).forEach((g) => console.log(`  · ${g.length} similares: ${g.slice(0, 4).join('  |  ')}${g.length > 4 ? ' …' : ''}`));
