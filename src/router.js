import VueRouter from 'vue-router'

import Main from './components/main/Main.vue'
import Header from './components/main/Headers.vue'
import Left from './components/main/Left.vue'

// 导入登录相关的路由模板
import Login from './components/login/Login.vue'

// 导入用户相关的路由模板
import UserList from './components/user/UserList.vue'
import UserAdd from './components/user/UserAdd.vue'

// 导入部门相关的路由模板
import RoleAdd from './components/role/RoleAdd.vue'
import RoleList from './components/role/RoleList.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: Login },
    { path: '/userList', component: UserList },
    { path: '/userAdd', component: UserAdd },
    { path: '/roleAdd', component: RoleAdd },
    { path: '/roleList', component: RoleList }
  ]
})

export default router
