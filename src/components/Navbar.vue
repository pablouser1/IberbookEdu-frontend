<i18n>
{
  "en": {
    "yearbooks": "Yearbooks",
    "about": "About",
    "config": "Config",
    "login": "Login",
    "account": "My account",
    "dashboard": "Dashboard",
    "messages": "Messages",
    "changeProfile": "Change profile",
    "logout": "Logout"
  },
  "es": {
    "yearbooks": "Orlas",
    "about": "Acerca de",
    "config": "Configuración",
    "login": "Iniciar sesión",
    "account": "Mi cuenta",
    "dashboard": "Panel de control",
    "messages": "Mensajes",
    "changeProfile": "Cambiar perfil",
    "logout": "Cerrar sesión"
  }
}
</i18n>

<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="home" size="is-small"></b-icon>
        <span>IberbookEdu</span>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/yearbooks' }">
        <b-icon icon="book" size="is-small"></b-icon>
        <span>{{ $t("yearbooks") }}</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">
        <b-icon icon="information" size="is-small"></b-icon>
        <span>{{ $t("about") }}</span>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="router-link" :to="{ path: '/config' }">
        <b-icon icon="cog" size="is-small"></b-icon>
        <span>{{ $t("config") }}</span>
      </b-navbar-item>
      <b-navbar-item v-if="!loggedin" tag="router-link" :to="{ path: '/login' }">
        <b-icon icon="account"></b-icon>
        <span>{{ $t("login") }}</span>
      </b-navbar-item>
      <b-navbar-item v-else>
        <b-navbar-dropdown hoverable right :label="$t('account')">
          <b-navbar-item tag="router-link" :to="{ path: '/dashboard' }">
            <b-icon icon="view-dashboard"></b-icon>
            <span>{{ $t("dashboard") }}</span>
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/messages' }">
            <b-icon icon="message"></b-icon>
            <span>{{ $t("messages") }}</span>
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/profile' }">
            <b-icon icon="account"></b-icon>
            <span>{{ $t("changeProfile") }}</span>
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ path: '/logout' }">
            <b-icon icon="logout"></b-icon>
            <span>{{ $t("logout") }}</span>
          </b-navbar-item>
        </b-navbar-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    loggedin () {
      return this.$store.state.loggedin
    }
  }
}
</script>
