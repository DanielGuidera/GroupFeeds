import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import New from '@/components/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'New',
      component: New
    }
  ]
})
