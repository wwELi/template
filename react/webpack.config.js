
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const program = require('commander');

program
  .option('-m, --mode', 'mode development or production');

program.parse(process.argv);

const env = program.mode || 'development';
const configs = require(`./builds/webpack.${env}.js`);

const publicPath = '/';
const SRC = path.join(__dirname, './', 'src');

const PREFIX = "/api";
const target = 'http://localhost:3001';

module.exports = function () {

  return webpackMerge({
    entry: path.join(__dirname, 'src', 'index.js'),
    resolve: {
      alias: {},
      modules: [SRC, 'node_modules'],
      extensions: ['*', '.js', '.json']
    },
    output: {
      filename: '[name].js',
      publicPath
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node-modules/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [{ loader: 'url-loader', options: { limit: 10000 } }]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PREFIX': JSON.stringify(PREFIX),
      }),
      new htmlWebpackPlugin({
        template: './index.html'
      })
    ],
  }, configs)

};
