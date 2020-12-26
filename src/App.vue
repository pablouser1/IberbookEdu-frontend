<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
    <Footer v-show="!enableFooter"></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { predifined_url } from './services/config.js'
import { startup } from './services/common.js'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  computed: {
    // Disable footer
    enableFooter() {
      return this.$route.name === 'Home' || 'Yearbook'
    }
  },
  beforeCreate: async function() {
    // SERVER CONFIG
    let server;
    if (!predifined_url) {
      if (!localStorage.servers || !this.$store.state.servers) {
        this.$router.push('/config')
      }
      // Set all servers
      this.$store.commit('setServers', JSON.parse(localStorage.servers))
      server = this.$store.state.servers.active
    }
    else {
      server = predifined_url
    }
    // Ping server
    const serverinfo = await startup(server)
    if (!serverinfo) {
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
