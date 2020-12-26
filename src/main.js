import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// -- External -- //

// Bulma and Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// Icons
import '@mdi/font/css/materialdesignicons.css'

// Root
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
