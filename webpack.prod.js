const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);


module.exports = {
    entry: resolve('./index.ts'),
    output: {
        filename: 'index.js',
        path: resolve('./lib'),
        chunkFilename: '[id].js',
        libraryExport: 'default',
        library: 'COVERAXIOS',
        libraryTarget: 'commonjs2'
    },
    mode: 'production',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.ts$/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        alias: {
            '@': resolve('src')
        },
        extensions: ['.ts', '.js'],
        modules: ["node_modules"],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}