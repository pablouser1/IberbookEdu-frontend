import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// External dependencies
import VueI18n from 'vue-i18n'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// -- External -- //

// Multilanguage setup

// Default english
let lang = 'en'
const allowedLanguages = ['en', 'es']
const userLang = (navigator.language || navigator.userLanguage).substring(0, 2)

// Set language to english if the user's language isn't in the allowed_languages
if (allowedLanguages.includes(userLang)) {
  lang = userLang
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'en'
})

Vue.use(Buefy)

// Root
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
