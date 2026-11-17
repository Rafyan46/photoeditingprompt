import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change `site` if the domain ever changes. It feeds canonical URLs,
// hreflang tags, the sitemap and schema markup.
export default defineConfig({
  site: 'https://photoeditingprompt.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
