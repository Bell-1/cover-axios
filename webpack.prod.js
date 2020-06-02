const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);


module.exports = {
    entry: resolve('./index.js'),
    output: {
        filename: 'httpVueAxios.min.js',
        path: resolve('./dist'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        alias: {
            '@': resolve('src')
        },
        extensions: ['.js', '.ts', '.json'],
        modules: ["node_modules"],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
}