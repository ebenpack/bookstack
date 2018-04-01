const baseConfig = require('./webpack.base.config');
const webpack = require('webpack');

module.exports = Object.assign({}, {
    mode: 'production',
    plugins: []
}, baseConfig);