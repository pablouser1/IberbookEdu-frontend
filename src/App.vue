<template>
  <div id="app">
    <Navbar v-if="showMisc"></Navbar>
    <router-view />
    <Footer v-if="showMisc"></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { BASE_URL } from './services/config.js'
import { startup } from './services/common.js'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods: {
    getServer () {
      if (BASE_URL) {
        return BASE_URL
      } else {
        return false
      }
    }
  },
  created: async function () {
    const server = this.getServer()
    // Ping
    // TODO handle if server bad configuree
    if (server) {
      const serverinfo = await startup(server)
      if (serverinfo) {
        // Check if cookie didn't expire (TODO, refresh tokens)
        if (!serverinfo.loggedin && localStorage.loggedin) {
          this.$store.commit('setLoggedin', false)
          this.$store.commit('setUserinfo', null)
          localStorage.removeItem('loggedin')
          localStorage.removeItem('userinfo')
          this.$buefy.toast.open('Your session has expired')
        }
      }
    }

    // Is user already logged in?
    if (localStorage.loggedin) {
      const userinfo = JSON.parse(localStorage.userinfo)
      this.$store.commit('setUserinfo', userinfo)
      this.$store.commit('setLoggedin', localStorage.loggedin)
      if (localStorage.profileinfo) {
        const profileinfo = JSON.parse(localStorage.profileinfo)
        this.$store.commit('setProfileinfo', profileinfo)
      } else {
        this.$router.push('/profile')
      }
    }
  },
  computed: {
    showMisc () {
      return this.$route.name !== 'Setup'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
