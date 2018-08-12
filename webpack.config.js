/* eslint-env node */

const path = require('path');

const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'site/assets'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
    devServer: {
        contentBase: './site',
        inline: true,
        host: '0.0.0.0',
        port: 8080,
        open: false,
        stats: {
            chunks: false // limit verbosity
        },
        clientLogLevel: 'warning'
    }
};
