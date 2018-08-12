/* eslint-env node */

const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'site/assets'),
        filename: 'index.js'
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
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['site/assets']),
        new MiniCssExtractPlugin({
            filename: 'index.css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'site'),
        publicPath: '/assets/',
        inline: true,
        host: '0.0.0.0',
        port: 8080,
        open: false,
        stats: {
            chunks: false // limit verbosity
        },
        clientLogLevel: 'warning',
        watchContentBase: true
    }
};
