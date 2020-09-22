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
    // true 则热更新，false 则手动刷新，默认值为 true
    // inline: false,
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  chainWebpack: config => {
    // https://www.cnblogs.com/ttjm/p/11724230.html
    // 配置webpack-bundle-analyzer
    // 打包文件可视化
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);


    config.resolve.symlinks(true);

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
