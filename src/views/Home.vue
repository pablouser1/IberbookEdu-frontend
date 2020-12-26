<template>
  <section id="menu-hero" class="hero is-fullheight-with-navbar has-bg-img">
    <div class="hero-body">
      <div class="box">
        <h1 class="title">Bienvenido a IberbookEdu</h1>
        <h2 class="subtitle">Genera tus orlas fácilmente</h2>
        <router-link class="button is-info" to="/about" tag="button">
          <b-icon icon="information"></b-icon>
          <span>Más información</span>
        </router-link>
        <p v-if="banner">Foto sacada de la orla del grupo {{banner.schoolyear}}, curso académico {{ banner.acyear }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { BASE_URL } from "@/services/config.js"
import { getBanner } from "@/services/common.js"

import "@/assets/banner.css"

export default {
  name: "Home",
  data() {
    return {
      baseurl: BASE_URL,
      banner: null
    }
  },
  created: async function() {
    let banner = await getBanner()
    this.banner = banner.data
    document.getElementById("menu-hero").style.backgroundImage = `url('${this.baseurl}/yearbooks/${this.banner.url}')`
  }
};
</script>
