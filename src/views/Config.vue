<i18n>
{
  "en": {
    "config": "Config",
    "noconfig": "No config available"
  },
  "es": {
    "config": "Configuración",
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
      <b-tab-item v-if="!hardcorded_url" label="Servidores">
        <Servers></Servers>
      </b-tab-item>
      <b-tab-item v-if="loggedin" label="Usuario">
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
export default {
  name: "Config",
  components: {Servers},
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
