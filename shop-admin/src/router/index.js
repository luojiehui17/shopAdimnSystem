import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/components/home'
import users from '@/components/users'
import rights from '@/components/rights'
import roles from '@/components/roles'
import goods from '@/components/goods'
import categories from '@/components/categories'
import goodAdd from '@/components/goodAdd'
import orders from '@/components/orders'
import reports from '@/components/reports'
import phpunload from '@/components/phpunload'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login',name: 'login',component: login},
    {path: '/register',name: 'register',component: register},
    {path: '/',name: 'home',component: home,children:[
      {path:'users',name:'users',component:users},
      {path:'rights',name:'rights',component:rights},
      {path:'roles',name:'roles',component:roles},
      {path:'goods',name:'goods',component:goods},
      {path:'categories',name:'categories',component:categories},
      {path:'goodAdd',name:'goodAdd',component:goodAdd},
      {path:'orders',name:'orders',component:orders},
      {path:'reports',name:'reports',component:reports},
      {path:'phpunload',name:'phpunload',component:phpunload},
    ]},
  ]
})
