import Vue from 'vue'
import VueRouter from 'vue-router'
import InicioView from '../views/Inicio.vue'
import CallView from '../views/Call.vue'
import FimView from '../views/Fim.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Inicio',
        component: InicioView
    },
    {
        path: '/call',
        name: 'Call',
        component: CallView
    },
    {
        path: '/end',
        name: 'Fim',
        component: FimView
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router