import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend/recommend'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'
import Personal from '@/components/personal/Personal'
import Following from '@/components/personal/Following'
import Collects from '@/components/personal/Collects'
import Ticket from '@/components/ticket/ticket'

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
        },
        {
            path: '/ticket',
            name: 'ticket',
            component: Ticket
        },
        {
            path: '/personal',
            name: 'personal',
            component: Personal,
            redirect: '/personal/collects',
            children: [
                {
                    name: 'following',
                    path: 'following',
                    component: Following
                },
                {
                    name: 'collects',
                    path: 'collects',
                    component: Collects
                }
            ]
        }
    ]
})
