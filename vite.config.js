import { defineConfig } from 'vite';

// In development the assistant's Vercel function is served by Vite itself,
// so `npm run dev` behaves like production. The key comes from the
// environment (see README), never from a file.
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
  plugins: [chatApi()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
          if (id.includes('node_modules/gsap')) return 'motion';
        },
      },
    },
  },
});
