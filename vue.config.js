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
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
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

    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // proxy: {
    //   // 配置多个代理
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }  
  },

  // 在设置了vue.config.js之后，就不会生成map文件
  // map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 也就是说map文件相当于是查看源码的一个东西。如果不需要定位问题，并且不想被看到源码，
  // 就把productionSourceMap 置为false，既可以减少包大小，也可以加密源码。
  productionSourceMap: false,

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,

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
