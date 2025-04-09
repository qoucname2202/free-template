const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require("image-minimizer-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const config = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }
    ),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js'],
    }),
    new Dotenv({ path: './.env' }),
    new TerserPlugin({
      terserOptions: {
        output: {
          comments: false, // remove comments
        },
        compress: {
          unused: true,
          dead_code: true, // big one--strip code that will never execute
          warnings: false, // good for prod apps so users can't peek behind curtain
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          drop_console: true, // strips console statements
          sequences: true,
          booleans: true,
        },
      },
    }), // 52ff05a530ba06b74e85.bundle.js  267 KiB
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ImageminPlugin({
        minimizer: {
          implementation: ImageminPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experement with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          }
        }
      }),
      new TerserPlugin({
        include: /\/includes/,
      }),
    ],
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          }
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10,
        },
      },
    },
    runtimeChunk: false,
  },
  mode: 'production', //production,development
  devtool: 'cheap-module-source-map', //cheap-module-source-map
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  devServer: {
    compress: true,
    before(app) {
      app.get('*.js', function (req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/javascript');
        next();
      });

      app.get('*.css', function (req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        res.set('Content-Type', 'text/css');
        next();
      });
      app.use(
        compression({
          level: 2, // set compression level from 1 to 9 (6 by default)
          filter: shouldCompress, // set predicate to determine whether to compress
        }),
      );
    },
  },
};
module.exports = merge(common, config);
