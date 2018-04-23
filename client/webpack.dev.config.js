const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = {
    ...baseConfig,
    mode: 'development',
    plugins: [
        ...baseConfig.plugins,
        new DashboardPlugin({
            minified: false,
        }),
        new WriteFilePlugin({
            test: /\.html$/,
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        ...baseConfig.output,
        publicPath: "http://localhost:8080/static/bookstack/dist",
        filename: '[name].[hash].js',
    },
    optimization: {
        minimize: false
    },
    devtool: 'source-map',
    devServer: {
        contentBase: baseConfig.output.path,
        hot: true,
    },
};
