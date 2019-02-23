import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { routes } from './routes'

Vue.use(Router)
Vue.use(BootstrapVue);

Vue.prototype.$loanList = [];
Vue.prototype.$emptyLoan = {
  details: '',
  collateral: 0,
  contractAddr: '',
  hasLenderRegistered: false,
  defaulted: false,
  fulfilled: false,
}

const router = new Router({
    routes,
    mode: 'history'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
