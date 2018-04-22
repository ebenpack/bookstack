const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = {
    ...baseConfig,
    mode: 'development',
    plugins: [
        new DashboardPlugin(),
        new WriteFilePlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        ...baseConfig.plugins,
    ],
    output: {
        ...baseConfig.output,
        filename: '[name].[hash].js',
    },
    devtool: 'source-map',
    devServer: {
        contentBase: baseConfig.output.path,
        hot: true,
    },
};
