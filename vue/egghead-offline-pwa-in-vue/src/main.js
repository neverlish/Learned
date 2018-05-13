import 'vuetify/dist/vuetify.min.css'

// Register and initialize Firebase
import './db'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
// import Details from './components/Details'
// import Images from './components/Images'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Vuetify)

const router = new VueRouter({
  routes: [{
      path: '/images',
      component: () =>
        import ('./components/Images')
    },
    {
      path: '/images/:id',
      component: () =>
        import ('./components/Details'),
      props: true
    },
    {
      path: '/',
      redirect: '/images'
    }
  ]
})

let swUpdated = false
router.beforeEach((to, from, next) => {
  if (swUpdated) {
    window.location.href = '/#' + to.fullPath
    window.location.reload()
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  router,
  data: {
    message: '',
    show: false
  },
  template: '<app :message="message" :show="show"></app>',
  components: {
    App
  }
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(reg => {
    reg.onupdatefound = () => {
      const sw = reg.installing
      sw.onstatechange = () => {
        if (sw.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New version
            app.show = true
            app.message = 'A new version available'
            swUpdated = true
          } else {
            // Contents are cached
            app.show = true
            app.message = 'Contents are now offline'
          }
        }
      }
    }
  })
}
