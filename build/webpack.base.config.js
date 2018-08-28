const path = require('path')
const vueLoderConfig = require('./vue-loader.config')

// 确定是不是开发环境的话，可以在启动时通过cross-env这个插件去除windows和 mac的差别
const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const config = {
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bound.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://192.168.12.51:8005/public/'
  },
  // 上面定义好了输入和输出。
  // 1. 定义模式，是生产还是开发。
  mode: isDev ? 'development' : 'production',
  resolve: {
    extensions: ['.vue', '.js', '.jsx', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('client'),
      'view': resolve('client/view'),
      'layout': resolve('client/layout')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoderConfig(isDev)
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}

module.exports = config
