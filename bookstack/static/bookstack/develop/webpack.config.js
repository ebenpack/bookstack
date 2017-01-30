const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/main.js'],

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/assets/',
        filename: 'bundle.js',
    },

    devtool: 'eval-source-map',

    plugins: process.env.NODE_ENV === 'production' ? [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ] : [
            new webpack.OldWatchingPlugin()
        ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
        sassLoader: {
            sourceMap: true,
            includePaths: [path.resolve(__dirname, "sass")]
        }
    }
}