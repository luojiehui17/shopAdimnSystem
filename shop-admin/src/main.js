// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 引入element-ui
import "element-ui/lib/theme-chalk/index.css"
import element from "element-ui/lib"
Vue.use(element)

////////////////// 导入ueditor依赖//////////////
import "../static/ueditor/ueditor.config"
import "../static/ueditor/ueditor.all"
import "../static/ueditor/lang/zh-cn/zh-cn"
import "../static/ueditor/ueditor.parse.min"

// 防翻墙 全局前置守卫
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to)
  // console.log(from)
  // console.log(next)
  //如果用户想访问的地址为登录或注册则可以直接访问
  if(to.path=='/login'||to.path=='/register'){
    next()
    // 如果用户想访问别的地址则先需要判断是否用户有登陆的状态，即token是否存在
  }else{
    // 如果用户是登录状态则可以访问
    if(localStorage.getItem('token')){
      next()
    }else{
      // 否则跳转登录页
      next('/login')
    }
  }
})

// 引入scss
import "@/assets/styles/index.scss"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
