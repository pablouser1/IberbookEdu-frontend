<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { hasPredifinedURL } from './services/api.js'
import { startup } from './services/common.js'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  beforeCreate: async function() {
    // Initial setup
    let server;
    // Check if URL is hardcoded in .env
    if (!hasPredifinedURL()) {
      // Did user already finished the setup?
      if (!localStorage.servers || !this.$store.state.servers) {
        this.$router.push('/config')
      }
      else {
        this.$store.commit('setServers', JSON.parse(localStorage.servers))
        server = this.$store.state.servers.active
      }
    }
    else {
      server = process.env.VUE_APP_SERVER
    }
    
    // Ping server
    const serverinfo = await startup(server)
    if (serverinfo) {
      // Check if cookie didn't expire (TODO, refresh tokens)
      if (!serverinfo.loggedin && localStorage.loggedin) {
        this.$store.commit('setLoggedin', false)
        this.$store.commit('setUserinfo', null)
        localStorage.removeItem("loggedin")
        localStorage.removeItem("userinfo")
        this.$buefy.toast.open("Tu sesión ha caducado, inicie sesión otra vez")
      }
    }
    else {
      // Set server config
      this.$buefy.toast.open({
        duration: 5000,
        message: `Ha habido un error al contactar con el servidor remoto`,
        position: 'is-bottom',
        type: 'is-danger'
      })
    }

    // Is user already logged in?
    if (localStorage.loggedin) {
      const userinfo = JSON.parse(localStorage.userinfo)
      this.$store.commit('setUserinfo', userinfo)
      this.$store.commit('setLoggedin', localStorage.loggedin)
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
