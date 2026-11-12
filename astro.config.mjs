import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// In development the assistant's Vercel function is served by the dev
// server itself, so `npm run dev` behaves like production. The key comes
// from the environment (see README), never from a file.
const chatApi = () => ({
  name: 'chat-api',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res) => {
      const { default: handler } = await server.ssrLoadModule('/api/chat.js');
      handler(req, res);
    });
  },
});

export default defineConfig({
  site: 'https://boschwebs.website',
  output: 'static',
  // /work/betsy is written as work/betsy.html and served without the
  // extension (cleanUrls in vercel.json), so every address has one form.
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'never' },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: page => !page.endsWith('/404') })],
  vite: {
    plugins: [chatApi()],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'motion';
          },
        },
      },
    },
  },
});
