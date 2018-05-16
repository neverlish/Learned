import 'buefy/lib/buefy.css'

import Vue from 'vue'
import App from './App.vue'

import Rx from 'rxjs'
import VueRx from 'vue-rx'

import Buefy from 'buefy'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRx, Rx)
Vue.use(Buefy)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
