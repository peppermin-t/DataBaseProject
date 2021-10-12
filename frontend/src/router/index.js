import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router =  new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/initial',
            name: 'Initial',
            component: () => import("../components/initial")
        },
        {
            path: '/log',
            name: 'Log',
            component: () => import("../components/log")
        },
        {
            path: '/signIn',
            name: 'SignIn',
            component: () => import("../components/SignIn")
        },
        {
            path: '/',
            name: 'home',
            component: () => import("../components/SignIn")
        },
        {
            path: '/record',
            name: 'Record',
            component: () => import("../components/record")
        }
    ]
})

export default router;