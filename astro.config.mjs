// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: SITE.domain,
  integrations: [
    sitemap({
      // Landings de campaña (/promo/*) y secciones desactivadas
      // (/capital) no van al sitemap principal.
      filter: (page) => !page.includes('/promo/') && !page.includes('/capital'),
    }),
  ],
  vite: {
    // @tailwindcss/vite declara tipos contra una copia distinta de Vite;
    // en runtime es totalmente compatible con el Vite que usa Astro.
    plugins: [/** @type {any} */ (tailwindcss())],
    server: {
      watch: {
        // scripts/ y test/ no son parte del sitio: se ignoran para
        // evitar ruido del watcher con archivos temporales.
        ignored: ['**/scripts/**', '**/test/**'],
      },
    },
  },
});
