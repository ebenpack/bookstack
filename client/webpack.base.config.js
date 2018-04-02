const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['./src/main.jsx'],
    output: {
        path: path.resolve(__dirname, '../bookstack/static/bookstack/js/dist'),
        publicPath: '/assets/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    }],
            }
        ]
    }
};
