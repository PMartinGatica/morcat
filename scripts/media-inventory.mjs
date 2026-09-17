/**
 * Inventario + hojas de contacto de la multimedia del cliente.
 * Uso: node scripts/media-inventory.mjs
 *
 * Genera:
 *  - .tmp-media/inventory.json  (metadatos de cada archivo)
 *  - .tmp-media/sheets/*.jpg    (grillas para revisión visual)
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const ROOT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/mulmedia-cliente';
const OUT = 'D:/insolva/Desarrollo/Deepseek-harnes/morcat-web/.tmp-media';
const SHEETS = path.join(OUT, 'sheets');
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const VID_EXT = new Set(['.mp4', '.mov', '.webm']);

const THUMB_W = 320;
const THUMB_H = 240;
const COLS = 5;
const ROWS = 6;
const PER_SHEET = COLS * ROWS;

fs.mkdirSync(SHEETS, { recursive: true });

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (!entry.name.toLowerCase().endsWith('desktop.ini')) acc.push(full);
  }
  return acc;
}

function shortName(name) {
  const base = path.parse(name).name;
  return base.length > 26 ? `${base.slice(0, 25)}…` : base;
}

function labelSvg(index, text) {
  return Buffer.from(
    `<svg width="${THUMB_W}" height="${THUMB_H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${THUMB_W}" height="34" fill="rgb(5 13 22 / 0.88)"/>
      <text x="10" y="23" font-family="Arial" font-size="19" font-weight="bold" fill="#d39a29">${String(index).padStart(3, '0')}</text>
      <text x="52" y="23" font-family="Arial" font-size="14" fill="#f4f2ec">${text.replace(/[<>&]/g, '')}</text>
    </svg>`,
  );
}

const files = walk(ROOT);
const folders = [...new Set(files.map((f) => path.dirname(f)))];
const inventory = [];

for (const folder of folders) {
  const folderName = path.basename(folder);
  const entries = fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((e) => e.isFile() && !e.name.toLowerCase().endsWith('desktop.ini'))
    .map((e) => e.name)
    .sort();

  const items = [];
  for (const name of entries) {
    const full = path.join(folder, name);
    const ext = path.extname(name).toLowerCase();
    const type = IMG_EXT.has(ext) ? 'image' : VID_EXT.has(ext) ? 'video' : 'other';
    const sizeKB = Math.round(fs.statSync(full).size / 1024);
    let width = null;
    let height = null;
    let duration = null;
    let thumbSource = full;

    try {
      if (type === 'image') {
        const meta = await sharp(full, { limitInputPixels: false }).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
      } else if (type === 'video') {
        const probe = execFileSync(
          'ffprobe',
          ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration', '-of', 'csv=p=0', full],
          { encoding: 'utf8' },
        ).trim();
        const [w, h, d] = probe.split(',');
        width = Number(w) || null;
        height = Number(h) || null;
        duration = d ? Number(d) : null;
        // frame para la hoja de contacto
        const frame = path.join(OUT, `frame-${folderName}-${items.length}.jpg`);
        execFileSync('ffmpeg', ['-y', '-v', 'error', '-ss', '1', '-i', full, '-frames:v', '1', '-vf', 'scale=640:-2', frame]);
        thumbSource = frame;
      }
    } catch (err) {
      console.warn(`  ! ${name}: ${err.message.split('\n')[0]}`);
    }

    items.push({ name, full, type, ext, sizeKB, width, height, duration, thumbSource });
  }

  // Hojas de contacto
  const sheetCount = Math.ceil(items.length / PER_SHEET);
  for (let s = 0; s < sheetCount; s++) {
    const slice = items.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
    const canvasW = COLS * THUMB_W;
    const canvasH = Math.ceil(slice.length / COLS) * THUMB_H;
    const composites = [];

    for (let i = 0; i < slice.length; i++) {
      const it = slice[i];
      const left = (i % COLS) * THUMB_W;
      const top = Math.floor(i / COLS) * THUMB_H;
      let thumb;
      try {
        thumb = await sharp(it.thumbSource, { limitInputPixels: false })
          .resize(THUMB_W, THUMB_H, { fit: 'cover', position: 'centre' })
          .modulate({ brightness: 1 })
          .toBuffer();
      } catch {
        thumb = await sharp({
          create: { width: THUMB_W, height: THUMB_H, channels: 3, background: '#0b1b2c' },
        })
          .jpeg()
          .toBuffer();
      }
      const idx = s * PER_SHEET + i + 1;
      const labelled = await sharp(thumb)
        .composite([{ input: labelSvg(idx, `${it.type === 'video' ? '▶ ' : ''}${shortName(it.name)}`), top: 0, left: 0 }])
        .toBuffer();
      composites.push({ input: labelled, left, top });
    }

    const sheetPath = path.join(SHEETS, `${folderName.replace(/\s+/g, '-')}-${s + 1}.jpg`);
    await sharp({ create: { width: canvasW, height: canvasH, channels: 3, background: '#050d16' } })
      .composite(composites)
      .jpeg({ quality: 78 })
      .toFile(sheetPath);
    console.log(`hoja: ${path.basename(sheetPath)}  (${slice.length} items)`);
  }

  inventory.push({
    folder: folderName,
    total: items.length,
    images: items.filter((i) => i.type === 'image').length,
    videos: items.filter((i) => i.type === 'video').length,
    other: items.filter((i) => i.type === 'other').length,
    items: items.map((i) => ({
      name: i.name,
      type: i.type,
      ext: i.ext,
      sizeKB: i.sizeKB,
      width: i.width,
      height: i.height,
      duration: i.duration,
    })),
  });
}

fs.writeFileSync(path.join(OUT, 'inventory.json'), JSON.stringify(inventory, null, 2));
console.log('\nInventario escrito en .tmp-media/inventory.json');
for (const f of inventory) {
  console.log(`${f.folder}: ${f.total} archivos (${f.images} img, ${f.videos} video, ${f.other} otros)`);
}
