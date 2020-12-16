//1 引入 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home'
// import About from '../components/About'
// import Me from '../components/Me'
import Login from '../views/Login'
// import Index from '../components/Index'
// import UserList from '../components/UserList'

//2 安装插件 应用路由
Vue.use(VueRouter)

// 3 配置映射关系
const routes = [
  {
    path:'',
    redirect:'/login'//默认
  },
  {
    path: '/login',//路径
    component: Login//模板
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



