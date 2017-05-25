const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/scripts/entry.js',
    },
    output: {
        path: `${__dirname}/public/js`,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.tag\.html$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'riot-tag-loader',
                        options: {
                            // template: 'ejs',
                            debug: true,
                        }
                    }
                ]
            },
            {
                test: /\.js|\.tag\.html$/,
                enforce: 'post',
                exclude: /node_modules/,
                use: ['buble-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.tag.html']
    },
    plugins: [
        new UglifyJSPlugin(),
        new webpack.ProvidePlugin({
            riot: 'riot'
        })
    ],
    devtool: 'source-map',
    watch: true,
}