'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'venomkb.js')
    ],
    output: {
        path: path.join(__dirname, '/index/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'venomkb.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new ExtractTextPlugin('styles.css'),
        new UglifyJSPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        })
    ],
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                    failOnWarning: false,
                    failOnError: false
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(zip|csv|tsv)$/i,
                exclude: /node_modules/,
                use: [
                    'file-loader?name=[name].[ext]'
                ]
            },
            {
                test: /\.ttf$/,
                use: 'url-loader'
            }
        ]
    }
};
