/**
 * Copyright (c) Info FE
 * lishuaishuai<lishuaishuai@xiaomi.com>
 */

const path = require('path')
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  build: {
    mode: NODE_ENV,
    sourceMap: false,
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: '/',
    bundleAnalyzerReport: process.env.analyz
  },
  dev: {
    mode: NODE_ENV,
    sourceMap: 'source-map',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './',
    assetsPublicPath: '/',
    devServer: {
      host: 'localhost',
      port: 3001,
      open: true,
      overlay: true,
      historyApiFallback: true,
      proxy: {}
    }
  }
}
