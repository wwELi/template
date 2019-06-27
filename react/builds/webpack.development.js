const path = require('path');
const webpack = require('webpack');

const srcDir = path.join(__dirname, '..');

const publicPath = '/';

const devServer = {
	clientLogLevel: 'warning',
	disableHostCheck: true,
	hot: true,
	contentBase: srcDir,
	compress: true,
	overlay: {
		warnings: false,
		errors: true
	}
};

module.exports = {
    mode: 'development',
	devServer,
	devtool: 'cheap-module-eval-source-map',
	output: {
		publicPath,
		filename: '[name].js'
	},
	bail: true,
	module: {
		rules: []
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};
