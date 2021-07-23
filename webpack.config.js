const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const configs = [];

function generateConfig(name) {
    const compress = name.indexOf("min") > -1;
    const config = {
        entry: resolve('index.js'),
        output: {
            path: resolve('dist'),
            filename: name + '.js',
            library: 'CoverAxios',
            libraryTarget: 'umd',
            clean: !compress,
        },
        devtool: 'source-map',
        mode: compress ? 'production' : 'development',
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
            }]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ["node_modules"],
        },
    };

    return config;
}

Array.prototype.forEach.call(['cover-axios', 'cover-axios.min'], function(name) {
    configs.push(generateConfig(name))
})


module.exports = configs;