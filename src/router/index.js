//1 引入 配置路由相关信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
import App from '../App'
import Home from '../views/Home'


//2 安装插件 应用路由
Vue.use(VueRouter)

// 3 配置映射关系
const routes = [
  {
    path:'',
    redirect:'/App'//默认
  },
  {
    path: '/App',//路径
    component: App//模板
  },
  {
    path: '/home',//路径
    component: Home,//模板
     children: [
        {
          path: '/power',
          name: 'power',
          component: () => import('../views/Power')
        }]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



