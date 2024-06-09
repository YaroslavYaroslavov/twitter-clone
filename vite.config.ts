import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: 'theme',
        replacement: fileURLToPath(new URL('./src/theme', import.meta.url)),
      },
      {
        find: 'firebaseConfig',
        replacement: fileURLToPath(new URL('./src/firebaseConfig', import.meta.url)),
      },
      {
        find: 'components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: 'helpers',
        replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)),
      },
      {
        find: 'static',
        replacement: fileURLToPath(new URL('./src/static', import.meta.url)),
      },
      {
        find: 'constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
      },
      {
        find: 'assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: 'pages',
        replacement: fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
      {
        find: 'hooks',
        replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)),
      },
    ],
  },
});
