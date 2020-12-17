//1 引入 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
import Home from '../views/Home'
import Power from '../views/Power'

//2 安装插件 应用路由
Vue.use(VueRouter)

// 3 配置映射关系
const routes = [
  {
    path:'',
    redirect:'/home'//默认
  },
  {
    path: '/home',//路径
    component: Home//模板
  },
  {
    path: '/power',//路径
    component: Power//模板
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



