const DashboardPlugin = require('webpack-dashboard/plugin');
const baseConfig = require('./webpack.base.config');

module.exports = Object.assign({}, {
    mode: 'development',
    plugins: [
        new DashboardPlugin(),
        ...baseConfig.plugins,
    ],
    devtool: 'source-map',
}, baseConfig);
