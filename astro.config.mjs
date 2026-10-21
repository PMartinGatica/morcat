// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
  site: SITE.domain,
  // Fichas viejas (un modelo por medida) → ficha del modelo con todas sus medidas.
  redirects: {
    '/viviendas-modulares/homero-a00': '/viviendas-modulares/homero',
    '/viviendas-modulares/homero-a01': '/viviendas-modulares/homero',
    '/viviendas-modulares/austral-a00': '/viviendas-modulares/duplex-austral',
    '/viviendas-modulares/nexa-austral-a00': '/viviendas-modulares/nexa-austral',
    '/viviendas-modulares/beagle-d01': '/viviendas-modulares/duplex-beagle',
  },
  integrations: [
    sitemap({
      // Landings de campaña (/promo/*), secciones desactivadas
      // (/capital) y páginas internas de mockup no van al sitemap.
      filter: (page) =>
        !page.includes('/promo/') && !page.includes('/capital') && !page.includes('/tipografia-mock'),
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
