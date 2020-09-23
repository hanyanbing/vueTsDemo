'use strict';
const path = require('path');
const pkg = require('./package.json');

function resolve(dir) {
  return path.join(__dirname, dir);
}

// const name = pkg.name || 'yfhan_test' // page title
const port = 8086; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 是否打开浏览器
    port: port, // 代理断就
    https: false,
    // 添加热更新
    host: "localhost"
    // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，
    // 前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    // hotOnly: false, // 热更新 
    // hot: true
  },
  chainWebpack: config => {
    // https://www.cnblogs.com/ttjm/p/11724230.html
    // 配置webpack-bundle-analyzer
    // 打包文件可视化
    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
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
};
