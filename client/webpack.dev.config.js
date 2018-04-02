const baseConfig = require('./webpack.base.config');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = Object.assign({}, {
    mode: 'development',
    plugins: [
        new DashboardPlugin(),
        ...baseConfig.plugins,
    ],
    devtool: 'source-map'
}, baseConfig);
