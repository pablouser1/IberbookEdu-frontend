<i18n>
{
  "en": {
    "yearbook": "Yearbook",
    "see": "See yearbook",
    "votes": "No votes | One vote | {n} votes",
    "download": "Download",
    "vote": "Vote",
    "voteregistered": "Vote registered successfully",
    "link": "Copy link",
    "linkcopied": "Link copied successfully",
    "share": "You can also share this yearbook on social media"
  },
  "es": {
    "yearbook": "Orla",
    "see": "Ver orla",
    "votes": "No hay votos | Un voto | {n} votos",
    "download": "Descargar",
    "vote": "Votar",
    "voteregistered": "Voto registrado con éxito",
    "link": "Copiar enlace",
    "linkcopied": "Enlace copiado con éxito",
    "share": "También puedes compartir esta orla en redes sociales"
  }
}
</i18n>

<template>
  <section id="menu-hero" class="hero has-bg-img is-fullheight-with-navbar">
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <div class="hero-body">
      <div v-if="yearbook" class="box container has-text-centered">
        <p class="has-text-left">
          <span v-on:click="$router.push('/yearbooks')" class="delete"></span>
        </p>
        <p class="title">
          <b-icon icon="book"></b-icon>
          <span>{{ $t("yearbook") }} {{ yearbook.schoolyear }}</span>
        </p>
        <p class="subtitle">{{ yearbook.acyear }}</p>
        <p>{{ yearbook.schoolname }}</p>
        <p>{{ $tc('votes', yearbook.votes) }}</p>
        <div class="buttons is-centered">
          <b-button type="is-link" tag="a" icon-left="book" size="is-medium" target="_blank" :href="baseurl + yearbook.url">{{ $t("see") }}</b-button>
        </div>
        <!-- Basic options -->
        <div class="buttons is-centered">
          <b-button :disabled="!yearbook.zip" type="is-info" tag="a" icon-left="download" :href="baseurl + yearbook.url + '/yearbook.zip'">{{ $t("download") }}</b-button>
          <b-button type="is-success" @click="vote()" icon-left="ballot">{{ $t("vote") }}</b-button>
        </div>
        <!-- Share -->
        <div class="container">
          <b-field position="is-centered">
            <b-input id="inputlink" readonly :value="url"></b-input>
            <p class="control">
              <b-button icon-left="link" type="is-primary" @click="clipboard">{{ $t("link") }}</b-button>
            </p>
          </b-field>
          <br>
          <label class="label">{{ $t("share") }}:</label>
          <div class="buttons is-centered">
            <b-button type="is-info" icon-left="facebook" size="medium" tag="a" :href="'https://www.facebook.com/sharer/sharer.php?u=' + shareurl">Facebook</b-button>
            <b-button type="is-info" icon-left="twitter" size="medium" tag="a" :href="'https://twitter.com/intent/tweet?text=' + shareurl + '&hashtags=IberbookEdu'">Twitter</b-button>
            <b-button type="is-success" icon-left="whatsapp" size="medium" tag="a" :href="'https://api.whatsapp.com/send?text=' + shareurl">Whatsapp</b-button>
            <b-button type="is-info" icon-left="telegram" size="medium" tag="a" :href="'https://t.me/share/url?url=' + shareurl">Telegram</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { BASE_URL } from '@/services/config.js'
import { getYearbook } from '@/services/common.js'
import { setVote } from '@/services/user.js'

import '@/assets/banner.css'

export default {
  name: 'Yearbook',
  props: {
    id: {
      type: String,
      requiered: true
    }
  },
  data: function () {
    return {
      isLoading: true,
      yearbook: null,
      baseurl: BASE_URL,
      url: '',
      shareurl: '',
      whatsappURL: ''
    }
  },
  methods: {
    clipboard: function () {
      document.getElementById('inputlink').select()
      document.execCommand('copy')
      this.$buefy.toast.open(this.$t('linkcopied'))
    },
    // Vote system
    vote: async function () {
      const voteanswer = await setVote(this.id)
      // Error voting
      if (voteanswer.code !== 'C') {
        this.$buefy.toast.open({
          duration: 5000,
          message: voteanswer.error,
          position: 'is-bottom',
          type: 'is-danger'
        })
      } else {
        // Vote OK
        this.$buefy.toast.open(this.$t('voteregistered'))
        this.yearbook.votes++
      }
    }
  },
  async created () {
    this.yearbook = await getYearbook(this.id)
    this.url = this.baseurl + this.yearbook.url
    this.shareurl = encodeURIComponent(this.url)
    document.getElementById('menu-hero').style.backgroundImage = `url('${this.baseurl}/yearbooks/${this.yearbook.banner}')`
    this.isLoading = false
  }
}
</script>
