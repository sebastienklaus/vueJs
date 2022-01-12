import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cuisine',
    name: 'Cuisine',
    component: () => import('../views/Cuisine.vue')
  },
  {
    path: '/chambre',
    name: 'Chambre',
    component: () => import('../views/Chambre.vue')
  },
  {
    path: '/salon',
    name: 'Salon',
    component: () => import('../views/Salon.vue')
  },
  {
    path: '/grenier',
    name: 'Grenier',
    component: () => import('../views/Grenier.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
