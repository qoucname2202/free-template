const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const devServer = {
  port: 4545,
  open: true,
  // host: '0.0.0.0',
  historyApiFallback: {
    verbose: true,
  },
  compress: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  static: {
    publicPath: '/',
    watch: true,
  },
  watchFiles: ['src/**/*.(tsx|ts|scss|png|jpg)', 'public/**/*'],
};
const config = {
  mode: 'development', //production,development
  devtool: 'source-map', //cheap-module-source-map
  devServer,
  plugins: [new Dotenv({ path: './.env.development' })],
};
module.exports = merge(common, config);
