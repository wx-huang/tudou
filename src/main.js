import Vue from 'vue'
import App from './App'
import store from './store'
import XLSX from 'xlsx' // 导入表格
import router from './router'//1 导入  如果导入的是文件夹，会自动找index
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(XLSX);
// Vue.prototype.$axios = axios;//原型导包 定义全局变量
// axios.defaults.baseURL = '/api'


function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

Vue.prototype.$getCookie = getCookie;

new Vue({
  router,
  store,
  render: h => h(App)
  // render: function(h) {
  //   return h(App)
  // }
}).$mount('#app')

// src\assets\js
