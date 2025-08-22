import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['bcryptjs', 'dayjs'],
  },
  server: {
    host: true,
  },
  plugins: [react(), tailwindcss(), visualizer({ open: true })],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
