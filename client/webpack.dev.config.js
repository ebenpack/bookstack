const baseConfig = require('./webpack.base.config');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = Object.assign({}, {
    mode: 'development',
    plugins: [
        new DashboardPlugin()
    ],
    devtool: 'source-map'
}, baseConfig);