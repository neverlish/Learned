import Vue from 'vue'
import App from './components/App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dashboard from './components/Dashboard.vue'
import Signin from './components/Signin.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/signin', component: Signin }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
