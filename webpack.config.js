const webpack = require('webpack');

module.exports = {
    entry: {
        bundle: './src/scripts/entry.js'
    },
    output: {
        path: `${__dirname}/public/js`,
        filename: '[name].js'
    },
    modules: {
        preLoaders: [
            {
                
            }
        ]
    }
}