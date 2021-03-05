<i18n>
{
  "en": {
    "welcome": {
      "title": "Welcome to IberbookEdu",
      "subtitle": "Generate yearbooks easily"
    },
    "about": "More info",
    "bannerinfo": "Photo from {schoolyear}'s yearbook, {acyear}"
  },
  "es": {
    "welcome": {
      "title": "Bienvenido a IberbookEdu",
      "subtitle": "Genera tus orlas fácilmente"
    },
    "about": "Más información",
    "bannerinfo": "Foto sacada de la orla del grupo {schoolyear}, curso académico {acyear}"
  }
}
</i18n>

<template>
  <section id="menu-hero" class="hero is-fullheight-with-navbar has-bg-img">
    <div class="hero-body">
      <div class="box">
        <h1 class="title">{{ $t("welcome.title") }}</h1>
        <h2 class="subtitle">{{ $t("welcome.subtitle") }}</h2>
        <router-link class="button is-info" to="/about" custom v-slot="{ navigate }">
          <span>
            <b-icon icon="information"></b-icon>
            <span @click="navigate" @keypress.enter="navigate" role="link">{{ $t("about") }}</span>
          </span>
        </router-link>
        <i18n v-if="banner" path="bannerinfo" tag="p">
          <template v-slot:schoolyear>
            <span>{{ banner.schoolyear }}</span>
          </template>
          <template v-slot:acyear>
            <span>{{ banner.acyear }}</span>
          </template>
        </i18n>
      </div>
    </div>
  </section>
</template>

<script>
import { BASE_URL } from '@/services/config.js'
import { getBanner } from '@/services/common.js'

import '@/assets/banner.css'

export default {
  name: 'Home',
  data () {
    return {
      baseurl: BASE_URL,
      banner: null
    }
  },
  async created () {
    const banner = await getBanner()
    if (banner.code === 'C') {
      this.banner = banner.data
      document.getElementById('menu-hero').style.backgroundImage = `url('${this.baseurl}/${this.banner.url}')`
    }
  }
}
</script>
