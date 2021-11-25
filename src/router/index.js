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
    path: '/forgot-password',
    name: 'Forgot Password',
    component: () => import(/* webpackChunkName: "forgot-password" */ '../views/auth/ForgotPassword.vue')
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "chatroom" */ '../views/Chatroom.vue')
  },
  {
    path: '/chatroom/:chatroomId',
    name: 'Chatroom',
    component: () => import(/* webpackChunkName: "chatroom" */ '../views/Chatroom.vue')
  },
  {
    path: '/contacts',
    name: 'ChatDirectList',
    component: () => import(/* webpackChunkName: "chatDirectList" */ '../views/ChatDirectList.vue'),
  },
  {
    path: '/chat',
    name: 'Chatscreen',
    redirect: '/',
    component: () => import(/* webpackChunkName: "chatscreen" */ '../views/chatscreens/Chatscreen.vue'),
    children: [
      {
        path: '/chat/room',
        redirect:'/chatroom'
      },
      {
        path: '/chat/room/:roomId',
        name: 'ChatRoomScreen',
        component: () => import(/* webpackChunkName: "chatRoomScreen" */ '../views/chatscreens/ChatRoomScreen.vue'),
      },
      
      {
        path: '/chat/:userId',
        name: 'ChatDirectScreen',
        component: () => import(/* webpackChunkName: "chatDirectScreen" */ '../views/chatscreens/ChatDirectScreen.vue'),
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/schedule',
    name: 'ScheduleMessage',
    component: () => import(/* webpackChunkName: "schedule" */ '../views/ScheduleMessage.vue')
  },
  {
    path: '/find-nearby',
    name: 'FindNearby',
    component: () => import(/* webpackChunkName: "find-nearby" */ '../views/FindNearby.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
