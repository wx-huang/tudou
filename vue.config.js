module.exports = {  
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://47.115.182.152:9080/index.php/',//跨域接口的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // configureWebpack: {
  //   resolve: {
  //     // 配置文件的别名
  //     alias: {
  //       'assets': '@/assets',
  //       'common': '@/common',
  //       'components': '@/components',
  //       'network': '@/network',
  //       'views': '@/views',
  //     }
  //   }
  // }
}

