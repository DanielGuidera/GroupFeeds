// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Nav from '@/components/Navbar'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(BootstrapVue);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#nav',
  router,
  components: { Nav },
  template: '<Nav/>'
})

window._config = {
  cognito: {
    UserPoolId: 'eu-west-1_Kh2zLTkDO',
    ClientId: '4i5u4ot6enb7em4m66pcp4gbud'     
  },
  api: {
      invokeUrl: '' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
  },
  userInfo: {
    userName: ''
  }
};