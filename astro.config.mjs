import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change `site` if the domain ever changes. It feeds canonical URLs,
// hreflang tags, the sitemap and schema markup.
export default defineConfig({
  site: 'https://photoeditingprompt.com',
  trailingSlash: 'always',
  // Translated category pages are noindex (thin, unreviewed translations), so they stay out of the sitemap.
  // The translated homepages (/hi/, /ta/ ...) are still listed.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/saved/') && !/^https:\/\/photoeditingprompt\.com\/(hi|bn|ta|te|mr|gu|kn|ml|pa|or)\/.+/.test(page) })],
  vite: { plugins: [tailwindcss()] },
});
