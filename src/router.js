import VueRouter from 'vue-router'

import Main from './components/main/Main.vue'
import Header from './components/main/Headers.vue'
import Left from './components/main/Left.vue'

const router = new VueRouter({
    routes: [
        {
            path: '/', components: {
                'default': Main,
                'left': Left,
                'header': Header
            }
        }
    ]
})

export default router