import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import del from 'rollup-plugin-delete'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import typescript from 'rollup-plugin-typescript2'
import packageJson from './package.json' assert { type: 'json' }

export default {
	input: './src/index.ts',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	external: ['react'],
	plugins: [
		del({ targets: path.parse(packageJson.main).dir + '/*' }),
		peerDepsExternal(),
		postcss({
			extract: true,
			modules: true,
		}),
		resolve(),
		commonjs(),
		typescript(),
	],
}
