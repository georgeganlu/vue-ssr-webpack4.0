const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: path.join(__dirname, '../client/server.entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          {
            // loader: process.env.NODE_ENV !== 'production'
            //   ? 'vue-style-loader'
            //   : MiniCssExtractPlugin.loader,
            loader: 'vue-style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash:8].css'
    }),
    new VueSSRServerPlugin()
  ]
})

module.exports = config
