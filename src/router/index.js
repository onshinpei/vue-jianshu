import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            name: 'recommend',
            component: Recommend
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        }
    ]
})
