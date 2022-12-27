
const path = require('path');

const { DefinePlugin } = require('webpack');
//const { InjectManifest } = require('workbox-webpack-plugin');

const LwcWebpackPlugin = require('lwc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { version } = require('./package.json');
console.log(`Version: ${version}`);

const resources = [
	//{ from: 'src/resources/', to: 'resources/' },
	{ from: 'src/index.css', to: 'index.css' },
	{ from: 'src/manifest.json', to: 'manifest.json' }
];

module.exports = {

	mode: 'production',

	entry: {
		app: './src/index.js'
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	plugins: [
		new LwcWebpackPlugin(),
		new DefinePlugin({
			__VERSION__: JSON.stringify(version)
		}),
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new CopyPlugin({
			patterns: [...resources]
		})
	]
};
