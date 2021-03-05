<i18n>
{
    "en": {
        "hi": "Hi!",
        "welcome" : "Welcome to IberbookEdu",
        "add": "Add your first server",
        "finish": "That's all!",
        "home": "Home"
    },
    "es": {
        "hi": "¡Hola!",
        "welcome" : "Bienvenido a IberbookEdu",
        "add": "Añadir servidor",
        "finish": "¡Eso es todo!",
        "home": "Menú principal"
    }
}
</i18n>

<template>
    <section class="section">
        <b-steps
            v-model="activeStep"
            :animated="true"
            :rounded="true"
            :has-navigation="true"
            :icon-prev="'chevron-left'"
            :icon-next="'chevron-right'"
            :label-position="'bottom'"
            :mobile-mode="'minimalist'">
            <b-step-item step="1" label="Welcome">
                <div class="container">
                    <h1 class="title has-text-centered">{{ $t("hi") }}</h1>
                    <h2 class="subtitle has-text-centered">{{ $t("welcome") }}</h2>
                </div>
            </b-step-item>

            <b-step-item step="2" label="Server">
                <h1 class="title has-text-centered">Server</h1>
                <h2 class="subtitle has-text-centered">{{ $t("add") }}</h2>
                <div class="container">
                    <b-field position="is-centered">
                        <b-input v-model="newServer" placeholder="http://example.com/IberbookEdu"></b-input>
                        <p class="control">
                            <b-button type="is-primary" @click="setNewServer">{{ $t("add") }}</b-button>
                        </p>
                    </b-field>
                </div>
            </b-step-item>

            <b-step-item step="3" label="Finish">
                <h1 class="title has-text-centered">{{ $t("finish") }}</h1>
                <div class="container has-text-centered">
                    <b-button icon-left="home" class="is-info" @click="goHome">{{ $t("home") }}</b-button>
                </div>
            </b-step-item>
        </b-steps>
    </section>
</template>

<script>
import { startup } from '@/services/common.js'
export default {
  name: 'Setup',
  methods: {
    setNewServer: async function () {
      const serverinfo = await startup(this.newServer)
      if (serverinfo) {
        this.$store.commit('setNewServer', this.newServer)
        localStorage.servers = JSON.stringify(this.servers)
        this.setActiveServer(this.newServer)
        this.activeStep++
        this.serverReady = true
      } else {
        this.$buefy.toast.open({
          duration: 5000,
          message: 'Error while connecting to remote server',
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    setActiveServer: async function (server) {
      this.$store.commit('setActiveServer', server)
      localStorage.servers = JSON.stringify(this.servers)
    },
    goHome: function () {
      if (this.servers.active) {
        this.$router.push('/')
      } else {
        this.$buefy.toast.open('No active server')
        this.activeStep--
      }
    }
  },
  data () {
    return {
      activeStep: 0,
      newServer: '',
      serverReady: false
    }
  },
  computed: {
    servers: function () {
      return this.$store.state.servers
    }
  }
}
</script>
