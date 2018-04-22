const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransformObjectRestSpreadPlugin = require('babel-plugin-transform-object-rest-spread');


module.exports = {
    entry: ['babel-polyfill', './src/main.jsx'],
    output: {
        path: path.resolve(__dirname, '../bookstack/static/bookstack/dist'),
        publicPath: '/static/bookstack/dist/',
        filename: '[name].[chunkhash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../bookstack/templates/bookstack_react.html'),
            template: path.resolve(__dirname, './src/index.ejs'),
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: [TransformObjectRestSpreadPlugin],
                    },
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    }],
            },
        ],
    },
};
