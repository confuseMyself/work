/**
 * Copyright (c) Info FE
 * lishuaishuai<lishuaishuai@xiaomi.com>
 */

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('../config')
const NODE_ENV = process.env.NODE_ENV || 'development'
// style files regexes
const preRegex = /\.(scss|sass)$/

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

// common function to get style loaders
const getStyleLoaders = () => {
  const preProcessor = 'sass-loader'
  const loaders = [
    NODE_ENV === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: true,
        localIdentName: '[name]_[local]-[hash:base64:8]',
      }
    },
    {
      loader: require.resolve('postcss-loader')
    },
    require.resolve(preProcessor)
  ]

  return loaders
}

module.exports = {
  entry: resolve('src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [resolve('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [NODE_ENV === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader, require.resolve('css-loader')],
      },
      {
        test: preRegex,
        use: getStyleLoaders(),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: path.join(config.dev.assetsSubDirectory, 'imgs/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: path.join(config.dev.assetsSubDirectory,'media/[name].[hash:8].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: path.join(config.dev.assetsSubDirectory,'fonts/[name].[hash:8].[ext]')
        }
      }
    ]
  }
}
