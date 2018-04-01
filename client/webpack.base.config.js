const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/main.js'],

    output: {
        path: path.resolve(__dirname, "../bookstack/static/bookstack/js/dist"),
        publicPath: '/assets/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
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
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        includePaths: [path.resolve(__dirname, "sass")]
                    }
                }]
            }
        ]
    }
};