const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

module.exports = Object.assign({}, {
    mode: 'production',
    plugins: [...baseConfig.plugins],
}, baseConfig);
