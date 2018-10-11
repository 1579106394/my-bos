import VueRouter from 'vue-router'

import Main from './components/main/Main.vue'
import Header from './components/main/Headers.vue'
import Left from './components/main/Left.vue'

// 导入用户相关的路由模板
import UserList from './components/user/UserList.vue'
import UserAdd from './components/user/UserAdd.vue'

const router = new VueRouter({
  routes: [
    { path: '/userList', component: UserList },
    { path: '/userAdd', component: UserAdd }
  ]
})

export default router
