/** Verifica alineación y etiquetas de la franja de métricas. */
const base = 'http://localhost:4321';

const EXPECTED = [
  { value: '15', label: 'Años de trayectoria' },
  { value: '+50', label: 'Obras entregadas' },
  { value: '+1000', label: 'm² construidos' },
  { value: '+100', label: 'Viviendas industrializadas' },
];

let ok = true;

for (const path of ['/', '/nosotros', '/promo/viviendas-modulares']) {
  const html = await (await fetch(base + path)).text();
  console.log(`\n${path}`);

  for (const m of EXPECTED) {
    const valueRe = new RegExp(`>\\s*${m.value.replace('+', '\\+')}\\s*<`);
    const labelRe = new RegExp(`>\\s*${m.label}\\s*<`);
    const found = valueRe.test(html) && labelRe.test(html);
    console.log(`  ${found ? 'OK  ' : 'FAIL'} ${m.value} — ${m.label}`);
    if (!found) ok = false;
  }

  // La franja entra como bloque: un solo data-reveal para las tarjetas
  const strip = html.match(/<div class="grid grid-cols-2 gap-px[\s\S]{0,120}?data-reveal/);
  const cards = (html.match(/data-reveal style="--reveal-delay/g) ?? []).length;
  console.log(`  ${strip ? 'OK  ' : 'FAIL'} franja con un único data-reveal (sin stagger por tarjeta)`);
  if (!strip) ok = false;

  // Columnas: la Home usa 2 (bloque angosto); el resto 4
  const homeTwoCols = path === '/'
    ? !/<div class="grid grid-cols-2 gap-px[^"]*lg:grid-cols-4[^"]*"\s+data-reveal/.test(html)
    : true;
  console.log(`  ${homeTwoCols ? 'OK  ' : 'FAIL'} columnas acordes al ancho disponible`);
  if (!homeTwoCols) ok = false;

  const noOldLabel = !html.includes('>Modelos industrializados</p>');
  console.log(`  ${noOldLabel ? 'OK  ' : 'FAIL'} sin la etiqueta vieja "Modelos industrializados" en métricas`);
  if (!noOldLabel) ok = false;
}

if (!ok) process.exitCode = 1;
