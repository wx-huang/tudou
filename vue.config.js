module.exports = {  
  devServer: {
    proxy: {
      // 配置跨域
      '/api': {
<<<<<<< HEAD
        target: 'http://121.196.25.116:9080/index.php/',//跨域接口的地址
=======
        target: 'http://121.196.25.116:82/index.php/',//跨域接口的地址
>>>>>>> 19337faf1464066a76335cf7e18a1e6309810ef8
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        secure:false
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

