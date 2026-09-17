/**
 * Selección asistida de multimedia + vista previa en texto.
 * Uso: node scripts/media-select.mjs
 *
 * Puntúa cada imagen (resolución, orientación, contraste, nombre
 * descriptivo, duplicados) y dibuja un mapa de color aproximado
 * para verificar la composición sin poder ver las imágenes.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/mulmedia-cliente';
const OUT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/.tmp-media';
const { results, duplicateGroups } = JSON.parse(fs.readFileSync(path.join(OUT, 'analysis.json'), 'utf8'));

// Índice de duplicados: nombre → cluster
const dupOf = new Map();
duplicateGroups.forEach((group, gi) => group.forEach((key) => dupOf.set(key, gi)));

const DESCRIPTIVE = /caba|casas?|modern|bosque|monta|nieve|paisaje|jard|terraza|hogar|andino|oto|neblin|natural|minimal|panor|dormi|interior|living|hall|cocina|fachada/i;
const JUNK = /collage|desktop\.ini|captura|sin t[ií]tulo|fueraasd|con logo/i;

function score(r) {
  let s = 0;
  const key = `${r.folder}/${r.name}`;
  if (DESCRIPTIVE.test(r.name)) s += 40;
  if (JUNK.test(r.name)) s -= 60;
  if (r.kind === 'render') s += 10;
  if (r.kind === 'collage') s -= 80;
  if (r.w >= 2400) s += 18;
  else if (r.w >= 1800) s += 12;
  else if (r.w >= 1200) s += 6;
  else if (r.w < 900) s -= 12;
  if (r.orientation === 'landscape') s += 12;
  if (r.orientation === 'portrait') s += 2;
  if (r.contrast >= 35 && r.contrast <= 90) s += 8;
  if (r.contrast < 22) s -= 18;
  if (r.meanLum < 45 || r.meanLum > 215) s -= 10;
  if (r.nearWhite > 0.5) s -= 25;
  s += Math.min(6, Math.round(r.ratio * 3));
  r.dupCluster = dupOf.has(key) ? dupOf.get(key) : null;
  return s;
}

for (const r of results) r.score = score(r);

const byFolder = {};
for (const r of results) (byFolder[r.folder] ??= []).push(r);

console.log('=== CANDIDATOS POR CARPETA (top 10) ===');
for (const [folder, items] of Object.entries(byFolder)) {
  const sorted = [...items].sort((a, b) => b.score - a.score);
  console.log(`\n--- ${folder} ---`);
  for (const r of sorted.slice(0, 10)) {
    console.log(
      `  ${String(r.score).padStart(4)}  ${r.w}x${r.h} ${r.orientation.padEnd(9)} ${r.kind.padEnd(7)} dup:${r.dupCluster ?? '-'} ${r.name}`,
    );
  }
}

/** Mapa de color aproximado (texto). */
async function preview(file) {
  const W = 44;
  const H = 15;
  const { data, info } = await sharp(file, { limitInputPixels: false })
    .resize(W, H, { fit: 'fill' })
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
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const sat = max - min;
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

const finals = results
  .filter((r) => r.kind === 'render' && !JUNK.test(r.name))
  .sort((a, b) => b.score - a.score)
  .slice(0, 12);

console.log('\n\n=== VISTA PREVIA DE FINALISTAS (# oscuro, W blanco, + gris claro, . gris, b/B azul, g/G verde, y/Y cálido) ===');
for (const r of finals) {
  const file = path.join(ROOT, r.folder, r.name);
  try {
    const rows = await preview(file);
    console.log(`\n[${r.score}] ${r.folder} / ${r.name}  (${r.w}x${r.h}, contraste ${r.contrast})`);
    console.log(rows.map((l) => '   ' + l).join('\n'));
  } catch (e) {
    console.log(`  ! ${r.name}: ${e.message.split('\n')[0]}`);
  }
}
