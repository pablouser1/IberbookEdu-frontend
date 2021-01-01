import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// -- External -- //

// Multilanguage setup

// Default english
let lang = "en"
const allowed_languages = ["en", "es", "fr"]
const userLang = (navigator.language || navigator.userLanguage).substring(0,2)

// Set language to english if the user's language isn't in the allowed_languages
if (allowed_languages.includes(userLang)){
  lang = userLang;
}

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'en'
})

// Bulma and Buefy
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// Icons
import '@mdi/font/css/materialdesignicons.css'

// Root
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
