<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="home" size="is-small"></b-icon>
        <span>IberbookEdu</span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ path: '/yearbooks' }">
        <b-icon icon="book" size="is-small"></b-icon>
        <span>Yearbooks</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">
        <b-icon icon="information" size="is-small"></b-icon>
        <span>About</span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ path: '/config' }">
        <b-icon icon="cog" size="is-small"></b-icon>
        <span>Config</span>
      </b-navbar-item>
      <b-navbar-item v-if="!loggedin" tag="router-link" :to="{ path: '/login' }">
        <b-icon icon="account"></b-icon>
        <span>Login</span>
      </b-navbar-item>
      <b-navbar-item v-else>
        <b-navbar-dropdown hoverable right label="My profile">
          <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
            <b-icon icon="view-dashboard"></b-icon>
            <span>Dashboard</span>
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/logout' }">
            <b-icon icon="logout"></b-icon>
            <span>Logout</span>
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    loggedin() {
      return this.$store.state.loggedin;
    }
  }
}
</script>