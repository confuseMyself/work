/**
 * Copyright (c) Info FE
 * lishuaishuai<lishuaishuai@xiaomi.com>
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const semver = require('semver')
const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('../config')

module.exports = merge(baseWebpackConfig, {
  mode: config.dev.mode,
  devtool: config.dev.sourceMap,
  output: {
    path: config.dev.assetsRoot,
    filename: path.join(config.dev.assetsSubDirectory, 'js/[name].js'),
    chunkFilename: path.join(config.dev.assetsSubDirectory, 'js/[name].chunk.js'),
    publicPath: config.dev.assetsPublicPath
  },
  devServer: {
    contentBase: config.dev.assetsRoot,
    ...config.dev.devServer,
    inline: true,
    hot: true,
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.tpl.html'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`You application is running here ${config.dev.devServer.https ? 'https' : 'http'}://${config.dev.devServer.host}:${config.dev.devServer.port}`],
        notes: checkNodeVersion()
      }
    })
  ]
})

function checkNodeVersion() {
  return semver.gte(process.version, '10.3.0') ? [] : ['Node version less than 10.3.0:']
}
