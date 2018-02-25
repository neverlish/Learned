import Vue from 'vue'
import App from './components/App'
import VueRouter from 'vue-router'
import { firebaseApp } from './firebaseApp'

import store from './store'

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

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('signIn', user)
    router.push('/dashboard')
  } else {
    router.replace('/signin')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
