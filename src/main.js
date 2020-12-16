import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import axios from 'axios'

// 使用elementUI
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
  // render: function(h) {
  //   return h(App)
  // }
}).$mount('#app')
