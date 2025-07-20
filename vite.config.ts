import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/web-cv/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    target: 'es2020'
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress certain warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
        warn(warning);
      }
    }
  }
});
