import Vue from 'vue'
import App from './App'
//import FileSaver from "file-saver"// 导入表格
import XLSX from 'xlsx' // 导入表格
import router from './router'//1 导入  如果导入的是文件夹，会自动找index
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(XLSX);
//Vue.use(FileSaver);
// Vue.prototype.$axios = axios;//原型导包 定义全局变量
// axios.defaults.baseURL = '/api'

new Vue({
  router,
  render: h => h(App)
  // render: function(h) {
  //   return h(App)
  // }
}).$mount('#app')
