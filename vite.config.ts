import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

// Verifica se o arquivo index.html está na raiz ou na pasta src
const indexPath = fs.existsSync('./index.html')
  ? './index.html'
  : './src/index.html';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  root: './', // Define a raiz do projeto onde o index.html deve estar
  publicDir: 'public',
  build: {
    outDir: 'docs',
    sourcemap: true,
    emptyOutDir: true
  },
  server: {
    port: 8000,
    open: true,
    host: 'localhost'
  },
  optimizeDeps: {
    force: true
  }
});
