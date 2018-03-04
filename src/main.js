// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

window._config = {
  cognito: {
      userPoolId: 'eu-west-1_Kh2zLTkDO',
      userPoolClientId: '4i5u4ot6enb7em4m66pcp4gbud',
      region: 'eu-west-1'
  },
  api: {
      invokeUrl: '' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
  }
};