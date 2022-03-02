const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const configs = []
let isFirst = true

function generateConfig(name) {
	const compress = name.indexOf('min') > -1
	const isES = name.indexOf('.es') > -1
	const config = {
		entry: resolve('../packages/cover-axios/index.ts'),
		experiments: {
			outputModule: isES,
		},
		output: {
			path: resolve('../lib'),
			filename: name + '.js',
			library: {
				name: isES ? undefined : 'CoverAxios',
				type: isES ? 'module' : 'umd',
			},
			clean: isFirst,
		},
		devtool: 'source-map',
		mode: compress ? 'production' : 'development',
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'babel-loader',
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.js'],
			modules: ['node_modules'],
		},
		externals: {
			axios: 'axios',
		},
		plugins: [new ProgressBarPlugin()],
	}

	isFirst = false

	return config
}

Array.prototype.forEach.call(
	['cover-axios.es', 'cover-axios.es.min', 'cover-axios', 'cover-axios.min'],
	function (name) {
		configs.push(generateConfig(name))
	}
)

module.exports = configs
