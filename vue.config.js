'use strict'
const path = require('path')
const pkg = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// const name = pkg.name || 'yfhan_test' // page title
// const port = 8086 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  chainWebpack: config => {
    config.module
    .rule('svg')
    .exclude.add(resolve('src/icons'))
    .end();

    config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(resolve('src/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    });
  }
}