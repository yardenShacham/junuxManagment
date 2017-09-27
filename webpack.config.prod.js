const webpack = require('webpack');
const config = require('./webpack.config');

const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const bootstrapConfig =  bootstrapEntryPoints.prod;

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

config.entry.vendors = bootstrapConfig;

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    mangle: true
}));

config.plugins.push(new webpack.DefinePlugin(GLOBALS));

module.exports = config;