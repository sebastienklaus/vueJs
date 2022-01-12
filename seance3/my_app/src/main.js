import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();

Vue.prototype.$axios = axios.create({
  baseURL: 'https://tools.sopress.net/iut/panier/api/',
  params : {
    token: 'toto@gmail.com'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
