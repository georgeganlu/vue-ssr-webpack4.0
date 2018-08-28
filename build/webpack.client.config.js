const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
// 确定是不是开发环境的话，可以在启动时通过cross-env这个插件去除windows和 mac的差别

let devServer = {
  host: '192.168.12.51',
  port: '8005',
  hot: true,
  open: true,
  overlay: {
    warnings: true,
    error: true
  }
}
const config = merge(baseConfig, {
  devtool: 'cheap-module-eval-source-map',
  // 性能的展示
  performance: {
    hints: false // 枚举
  },
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'style-loader',
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
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer,
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'george-test',
      template: path.join(__dirname, './template.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueSSRClientPlugin()
  ]
})

module.exports = config
