import json from 'rollup-plugin-json';
import { version } from './package.json';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pluginConfig from './src/config/plugin.config.js';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

/**
 * 当前环境
 * @type {'development'|'production'}
 */
const NODE_ENV = (process.env.NODE_ENV || 'development').trim();

/** plugin.json */
pluginConfig.version = version;
const pluginJsonStr = JSON.stringify(pluginConfig);

/** 生成preload.js */
/** @type {import ('rollup').RollupOptions} */
const rollupOptions = {
  input: './src/config/preload.ts',
  output: {
    file: './dist/preload.js',
    format: 'cjs',
    sourcemap: NODE_ENV === 'production' ? false : 'inline',
  },
  plugins: [
    typescript({ lib: ['es5', 'es6', 'dom'], target: 'es5' }),
    resolve(),
    commonjs(),
    copy({
      flatten: true,
      copyOnce: false,
      targets: [
        {
          src: 'src/config/plugin.config.js',
          dest: 'dist',
          transform: contents => pluginJsonStr,
          rename: (name, extension) => 'plugin.json',
        },
        { src: 'README.md', dest: 'dist' },
      ],
      verbose: true,
    }),
    replace({
      ENV: JSON.stringify(NODE_ENV),
    }),
    NODE_ENV === 'production' && uglify(),
  ],
};
export default rollupOptions;
