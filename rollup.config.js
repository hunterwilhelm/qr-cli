import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json'));
const external = Object.keys(pkg.dependencies || {}).concat(['fs/promises']);

const extensions = ['.js', '.ts', '.tsx'];

export default {
  input: 'src/main.ts',
  output: {
    file: './bin/cli.js',
    format: 'cjs',
    banner: '#!/usr/bin/env node',
  },
  external,
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
      resolveOnly: ['react-dom/server']
    }),
    json(),
    babel({
      exclude: ['node_modules/**', './history/**'],
      babelHelpers: 'bundled',
      extensions,
    }),
    typescript({ compilerOptions: { lib: ['es5', 'es6', 'dom'], target: 'es5' } }),
  ],
};
