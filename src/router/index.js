import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Login from '@/components/login/Login'

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
        }
    ]
})
