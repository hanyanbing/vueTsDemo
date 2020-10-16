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
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 是否打开浏览器
    port: port, // 代理断就
    https: false,
    // 添加热更新
    host: 'localhost'
    // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，
    // 前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    // hotOnly: false, // 热更新
    // hot: true

    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // '/api' 为匹配项，target 为被请求的地址，因为在 ajax 的 url 中加了前缀 '/api'，
    // 而原本的接口是没有这个前缀的，所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
    // 如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉。
    // proxy: {
    //   // 配置多个代理
    //   '/api': {
    //     target: 'http://xxxxxx.com', // 接口的域名
    //     secure: false,  // 如果是https接口，需要配置这个参数
    //     ws: true,
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //      pathRewrite: {
    //      '^/api': ''
    //      }
    //   },
    //   '/foo': {
    //     target: '<other_url>'
    //   }
    // }
  },

  // 在设置了vue.config.js之后，就不会生成map文件
  // map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 也就是说map文件相当于是查看源码的一个东西。如果不需要定位问题，并且不想被看到源码，
  // 就把productionSourceMap 置为false，既可以大大减少包大小，也可以加密源码。
  // productionSourceMap: false,

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,

  chainWebpack: config => {
  //   config.optimization.splitChunks(
  //     {
  //       chunks: 'all', // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
  //       cacheGroups: {
  //         vendors: {
  //           // 抽离第三方插件
  //           test: /[\\/]node_modules[\\/]/, // 指定是node_modules下的第三方包
  //           name: 'vendors',
  //           priority: -10 // 抽取优先级
  //         },
  //         utilCommon: {
  //           // 抽离自定义工具库
  //           name: 'common',
  //           minSize: 0, // 将引用模块分离成新代码文件的最小体积
  //           minChunks: 2, // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
  //           priority: -20
  //         }
  //       }
  //     },
  //     // 为 webpack 运行时代码创建单独的chunk
  //     {
  //       runtimeChunk: {name: 'manifest' }
  //     }
  //   ),

    // https://www.cnblogs.com/ttjm/p/11724230.html
    // npm run build --report // 直接运行，然后在浏览器打开http://127.0.0.1:8888/即可查看复制代码
    // 配置webpack-bundle-analyzer
    // 打包文件可视化
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
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
