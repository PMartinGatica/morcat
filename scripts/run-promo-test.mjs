/**
 * Compila y ejecuta las pruebas de la landing promo.
 * Uso: node scripts/run-promo-test.mjs
 */
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await build({
  entryPoints: [path.join(root, 'test/promo-logic.test.ts')],
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  outfile: path.join(root, 'test/.promo-logic.test.mjs'),
  logLevel: 'silent',
});

execFileSync(process.execPath, [path.join(root, 'test/.promo-logic.test.mjs')], {
  stdio: 'inherit',
});
