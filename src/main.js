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

var vm = new Vue({
  el: '#app',
  data: {},
  render: c => c(app),
  router
})
