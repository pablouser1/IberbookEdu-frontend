<template>
    <div class="container has-text-centered">
        <p class="text">Cerrando sesión...</p>
    </div>
</template>

<script>
import { logout } from '@/services/common.js'
export default {
  name: 'Logout',
  mounted: async function () {
    if (localStorage.loggedin) {
      await logout()
      this.$store.commit('setLoggedin', false)
      this.$store.commit('setUserinfo', null)
      this.$store.commit('setProfileinfo', null)
      localStorage.removeItem('loggedin')
      localStorage.removeItem('userinfo')
      localStorage.removeItem('profileinfo')
    }
    this.$router.push('/')
  }
}
</script>
