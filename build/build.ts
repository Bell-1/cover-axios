import { series } from 'gulp'
import path from 'path'
import esbuild from 'esbuild'
import { mainPath, entryPath, outputPath, tsconfigPath } from './utils/path'
import { external } from './utils/config'
import fse from 'fs-extra'

function build() {
	// 清空输出目录
	fse.emptyDirSync(outputPath)

	const buildOptions = {
		entryPoints: [entryPath],
		bundle: true,
		minify: false,
		sourcemap: true,
		target: 'es2015',
		// format: 'esm',
		// outdir: outputPath,
		external,
		define: {
			'process.env.NODE_ENV': '"production"',
		},
		banner: {
			js: '/* cover-axios */',
		},
		footer: {
			js: '/* cover-axios */',
		},
		tsconfig: tsconfigPath,
	}

	const buildESM = esbuild.buildSync({
		...buildOptions,
		format: 'esm',
		outfile: `${outputPath}/index.mjs`,
	})

	const buildCJS = esbuild.buildSync({
		...buildOptions,
		format: 'cjs',
		outfile: `${outputPath}/index.js`,
	})

	return Promise.all([buildESM, buildCJS]).catch(() => process.exit(1))
}

export default series(build)
