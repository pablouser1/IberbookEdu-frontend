<i18n>
{
  "en": {
    "welcome": {
      "title": "Welcome to IberbookEdu",
      "subtitle": "Generate yearbooks easily"
    },
    "about": "More info"
  },
  "es": {
    "welcome": {
      "title": "Bienvenido a IberbookEdu",
      "subtitle": "Genera tus orlas fácilmente"
    },
    "about": "Más información"
  }
}
</i18n>

<template>
  <section id="menu-hero" class="hero is-fullheight-with-navbar has-bg-img">
    <div class="hero-body">
      <div class="box">
        <h1 class="title">{{ $t("welcome.title") }}</h1>
        <h2 class="subtitle">{{ $t("welcome.subtitle") }}</h2>
        <router-link class="button is-info" to="/about" tag="button">
          <b-icon icon="information"></b-icon>
          <span>{{ $t("about") }}</span>
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
    if (banner.code === "C") {
      this.banner = banner.data
      document.getElementById("menu-hero").style.backgroundImage = `url('${this.baseurl}/${this.banner.url}')`
    }
  }
};
</script>
