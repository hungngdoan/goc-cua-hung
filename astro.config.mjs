import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://hungngdoan.github.io',
  base: '/goc-cua-hung',
  integrations: [react(), tailwind()],
});
