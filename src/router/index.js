//1 引入 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'

//2 安装插件 应用路由
Vue.use(VueRouter)

// 3 配置映射关系
const routes = [
  {
    path:'',
    redirect:'/adminLogin'//默认
  },
  {
    path:'/adminLogin',
    component: () => import('../views/Login')
  },
  {
    path: '/home',//路径
    component: () => import('../views/Home'),
    children: [
      {
        path: '/power',
        component: () => import('../views/Power')
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



