import { defineConfig } from 'tsup';
import path from 'path';
import fs from 'fs';

// Verificar se os diretórios de origem existem antes de copiar
const sourceDir = path.resolve(__dirname, 'src');
const assetsDir = path.resolve(sourceDir, 'assets');
const imgDir = path.resolve(sourceDir, 'img');

export default defineConfig({
  entry: ['src/lib/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'lib',
  esbuildOptions(options) {
    // Configuração específica para React JSX
    options.jsx = 'transform';
    options.jsxFactory = 'React.createElement';
    options.jsxFragment = 'React.Fragment';
    options.target = ['es2018'];
    options.minify = process.env.NODE_ENV === 'production';

    // Copiar arquivos - fazendo manualmente em vez de usar o plugin
    if (fs.existsSync(path.resolve(assetsDir, 'favicon.ico'))) {
      const targetDir = path.resolve(__dirname, 'lib');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.copyFileSync(
        path.resolve(assetsDir, 'favicon.ico'),
        path.resolve(targetDir, 'favicon.ico')
      );
    }

    if (fs.existsSync(imgDir)) {
      const imagesTargetDir = path.resolve(__dirname, 'lib/images');
      if (!fs.existsSync(imagesTargetDir)) {
        fs.mkdirSync(imagesTargetDir, { recursive: true });
      }

      const imgFiles = fs.readdirSync(imgDir);
      imgFiles.forEach(file => {
        fs.copyFileSync(
          path.resolve(imgDir, file),
          path.resolve(imagesTargetDir, file)
        );
      });
    }
  },
  treeshake: true,
  splitting: false,
  skipNodeModulesBundle: true,
  external: ['react', 'react-dom'],
  keepNames: true
});
