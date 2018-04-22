const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

module.exports = {
    ...baseConfig,
    mode: 'production',
    plugins: [...baseConfig.plugins],
};
