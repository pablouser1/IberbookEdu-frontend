<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Bienvenido a IberbookEdu</h1>
          <h2 class="subtitle">Configuración</h2>
        </div>
      </div>
    </section>
    <Servers></Servers>
    <User v-if="loggedin"></User>
  </div>
</template>

<script>
import Servers from '@/components/Config/Servers.vue'
import User from '@/components/Config/User.vue'
export default {
  name: "Config",
  components: {
    Servers, User
  },
  computed: {
    loggedin() {
      return this.$store.state.loggedin;
    }
  }
};
</script>
