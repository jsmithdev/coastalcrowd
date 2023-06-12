import path from "path";
import { promises as fs } from "fs";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { DefinePlugin } = require("webpack");
import { InjectManifest } from 'workbox-webpack-plugin';

import LwcWebpackPlugin from "lwc-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

// get __dirname in es6 modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);


const isProd = process.argv.indexOf("--mode=production") >= 0;
console.log(isProd ? "Production build" : "Development build");

//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { version } = require("./package.json");
//console.log(`Version: ${version}`);

const slds = [
	{
		from: 'node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css',
		to: 'resources/slds/styles/salesforce-lightning-design-system.min.css'
	}
];

const resources = [
	...slds,
	{ from: "src/res/", to: "res/" },
	{ from: "src/index.css", to: "index.css" },
	{ from: "src/manifest.json", to: "manifest.json" },
];

// read view directory to get list of views
const views = (await fs.readdir(path.join(__dirname, "src", "modules", "views")))
	.filter(x => !x.includes('.'));

const plugins = [
	new LwcWebpackPlugin(),
	new DefinePlugin({
		__VERSION__: JSON.stringify(version),
		__VIEWS__: JSON.stringify(views),
	}),
	new HtmlWebpackPlugin({ template: "./src/index.html" }),
	new CopyPlugin({
		patterns: [...resources],
	})
];

if (isProd) {
	plugins.push(
		new InjectManifest({
			swSrc: '/src/service-worker.js',
			swDest: 'sw.js'
		}));
}


export default {
	mode: "production",

	entry: {
		app: "./src/index.js",
	},

	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].js",
	},
	plugins,

	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
};
