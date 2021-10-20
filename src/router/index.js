import Dashboard from '../views/Dashboard.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/dashboard",
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Signin',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/Signin.vue')
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "chatroom" */ '../views/Chatroom.vue')
  },
  {
    path: '/chatscreen',
    name: 'Chatscreen',
    component: () => import(/* webpackChunkName: "chatscreen" */ '../views/Chatscreen.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
