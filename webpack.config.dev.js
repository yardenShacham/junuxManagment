const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const bootstrapConfig =  bootstrapEntryPoints.dev;

config.entry.vendors = bootstrapConfig;
config.devtool = 'source-map';
config.devServer = {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    hot: false,
    compress: true,
    port: 3000,
    publicPath: '/'
};

config.plugins.push(new webpack.LoaderOptionsPlugin({debug: true}));
//config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
config.plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:3000' }));

module.exports = config;