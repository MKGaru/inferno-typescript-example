const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: "./index.tsx", // Point to main file
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
		alias: {
			'react': 'inferno-compat',
			'react-dom': 'inferno-compat'
		}
	},
	performance: {
		hints: false,
		maxAssetSize: 5242880
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/, 						  // All ts and tsx files will be process by
				loaders: [ 'ts-loader' ], 				  // only ts-loader without babel transpile
				exclude: /node_modules/                   // ignore node_modules
			}
		]
	},
	devServer: {
		contentBase: "dist/",
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: "./index.html",
				inject: "body"
			}
		),
		new CleanWebpackPlugin(
			["dist"], {
				verbose: true
			}
		),
		new CopyWebpackPlugin([
			{ from:'main.css' }
		],{
			copyUnmodified: false
		}),
		new webpack.ProvidePlugin({
			'React.createElement': 'inferno/dist/inferno-create-element'
		}),
		// By default, webpack does `n=>n` compilation with entry files. This concatenates
		// them into a single chunk.
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
