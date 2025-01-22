import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/rest/v1': {
        target: 'https://hcdhlmpxgdpqispafssd.supabase.co/rest/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/rest\/v1/, ''),
      },
    },
  },
});
