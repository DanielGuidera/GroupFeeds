import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import NewUser from '@/components/Newuser'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/NewUser',
      name: 'Newuser',
      component: NewUser
    },        
    {
      path: '/login',
      name: 'Login',
      component: Login
    },    
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }    
  ]
})

export default router