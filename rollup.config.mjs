import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import path from 'path';
import image from '@rollup/plugin-image';
import { fileURLToPath } from 'url';
import htmlTemplate from 'rollup-plugin-generate-html-template';

// Para compatibilidade ESM com __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração
const isProd = process.env.NODE_ENV === 'production';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const outputDir = 'lib';

export default {
  input: 'src/index.tsx',
  output: {
    dir: outputDir,
    format: 'iife',
    sourcemap: !isProd,
    entryFileNames: 'bundle-[hash].js',
    // Sem globals necessários porque React será incluído no bundle
  },
  plugins: [
    // Limpar o diretório de saída antes da build
    del({ targets: outputDir + '/*' }),

    // Plugin para lidar com imagens
    image(),

    resolve({
      extensions,
      browser: true
    }),

    commonjs({
      include: /node_modules/,
      // Adiciona essas opções para o React
      transformMixedEsModules: true
    }),

    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !isProd,
      compilerOptions: {
        noEmit: true,
        outDir: undefined,
      }
    }),

    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: /node_modules/
    }),

    // Processa CSS
    postcss({
      extensions: ['.css'],
      extract: path.join(outputDir, 'styles.css'),
      minimize: isProd
    }),

    // Substitui variáveis de ambiente
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      preventAssignment: true
    }),

    // Copia assets estáticos
    copy({
      targets: [
        { src: 'src/assets/favicon.ico', dest: outputDir },
        { src: 'src/img/*', dest: path.join(outputDir, 'images') }
      ],
      verbose: true
    }),

    // Usa o HTML template
    htmlTemplate({
      template: 'src/index.html',
      target: path.join(outputDir, 'index.html')
    }),

    // Minifica em produção
    isProd && terser(),

    // Servidor de desenvolvimento
    !isProd && serve({
      contentBase: outputDir,
      host: 'localhost',
      port: 8000,
      open: true,
    }),

    // Recarregamento automático em desenvolvimento
    !isProd && livereload({
      watch: outputDir
    })
  ].filter(Boolean),

  // Tratamento de avisos
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    if (warning.code === 'EVAL') return;
    warn(warning);
  }
};
