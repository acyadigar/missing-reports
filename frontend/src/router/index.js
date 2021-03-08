import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Auth

  },
  {
    path: '/missings',
    name: 'Missings',
    component: () => import('../views/Missings.vue')

  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('../views/Report.vue')

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
