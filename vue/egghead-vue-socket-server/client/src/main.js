import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueSocketIo from "vue-socket.io";
Vue.use(Vuetify);
Vue.use(
  new VueSocketIo({
    debug: true,
    connection: "http://localhost:8500"
  })
);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
