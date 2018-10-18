import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import app from './App.vue'
import router from './router.js'

// 导入mint-ui组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

// 导入mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 导入VueResource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.root = 'http://localhost:8080/'
// 全局启用 emulateJSON 选项
// Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

Vue.http.interceptors.push(function (request, next) { // 拦截器
  // 跨域携带cookie
  if (request.url != 'userLogin')

    request.credentials = true

  next()
})

// 引入jq
import $ from 'jquery'

// 导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

var vm = new Vue({
  el: '#app',
  data: {
  },
  render: c => c(app),
router})
