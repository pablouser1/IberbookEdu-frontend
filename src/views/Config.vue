<i18n>
{
  "en": {
    "config": "Config",
    "servers": "Servers",
    "user": "User",
    "noconfig": "No config available"
  },
  "es": {
    "config": "Configuración",
    "servers": "Servidores",
    "user": "Usuario",
    "noconfig": "No hay ninguna configuración disponible"
  }
}
</i18n>

<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ $t("config") }}</h1>
        </div>
      </div>
    </section>
    <b-tabs position="is-centered" class="block">
      <b-tab-item v-if="!hardcorded_url" :label="$t('servers')">
        <Servers></Servers>
      </b-tab-item>
      <b-tab-item v-if="loggedin" :label="$t('user')">
        <User></User>
      </b-tab-item>
    </b-tabs>
    <section class="section" v-if="hardcorded_url && !loggedin">
      <p>{{ $t("noconfig") }}</p>
    </section>
  </div>
</template>

<script>
import Servers from '@/components/Config/Servers.vue'
import User from '@/components/Config/User.vue'
export default {
  name: "Config",
  components: {Servers, User},
  data: function() {
    return {
      hardcorded_url: process.env.VUE_APP_SERVER
    }
  },
  computed: {
    loggedin() {
      return this.$store.state.loggedin;
    }
  }
};
</script>
