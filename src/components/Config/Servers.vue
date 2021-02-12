<i18n>
{
  "en": {
    "title": "Servers",
    "search": "Search",
    "add": "Add",
    "remove": "Remove"
  },
  "es": {
    "title": "Servidores",
    "search": "Buscar",
    "add": "Agregar",
    "remove": "Eliminar"
  }
}
</i18n>

<template>
    <section class="section">
      <div class="container">
        <nav class="panel">
          <p class="panel-heading">
            <b-icon icon="server" size="is-small"></b-icon>
            <span>{{ $t("title") }}</span>
          </p>
          <p class="panel-tabs">Active server: {{ servers.active }}</p>
          <div class="panel-block">
            <p class="control has-icons-left">
              <input v-model="searchServer" class="input" type="text" :placeholder="$t('search')">
              <span class="icon is-left">
                <b-icon icon="magnify"></b-icon>
              </span>
            </p>
          </div>
          <a v-for="(server, index) in filteredServers" v-bind:key="index" class="panel-block">
            <p>
              <span @click="deleteServer(server)" class="delete"></span>
              <span @click="setActiveServer(server)"> {{ server }}</span>
            </p>
          </a>
        </nav>
        <b-field :label="$t('add')">
          <b-input v-model="newServer" placeholder="http://example.com/IberbookEdu"></b-input>
          <p class="control">
            <b-button type="is-primary" @click="setNewServer">{{ $t("add") }}</b-button>
          </p>
        </b-field>
      </div>
    </section>
</template>

<script>
import { startup } from '@/services/common.js'
export default {
  name: "Servers",
  data() {
      return {
        searchServer: "", // Search string for servers list
        newServer: "", // New server input
      }
  },
  methods: {
    setNewServer: async function () {
      const serverinfo = await startup(this.newServer)
      if (serverinfo) {
        this.$store.commit('setNewServer', this.newServer)
        localStorage.servers = JSON.stringify(this.servers)
        this.setActiveServer(this.newServer)
      }
      else {
        this.$buefy.toast.open({
          duration: 5000,
          message: "Error while connecting to remote server",
          position: 'is-bottom',
          type: 'is-danger'
        })
      }
    },
    setActiveServer: async function(server) {
      if (server !== this.servers.active) {
        this.$store.commit('setActiveServer', server)
        localStorage.servers = JSON.stringify(this.servers)
        this.$buefy.toast.open('Active server modified')
        // Logout
        this.$router.push("/logout")
      }
      else {
        this.$buefy.toast.open("Active server already in use")
      }
    },
    deleteServer: async function(server) {
      if (this.servers.list.length === 1) {
        this.$buefy.toast.open("You can't delete all your servers")
      }
      else {
        this.$store.commit("removeServer", server)
        localStorage.servers = JSON.stringify(this.servers)
      }
    }
  },
  computed: {
    servers: function() {
      return this.$store.state.servers;
    },
    filteredServers() {
      return this.servers.list.filter(server => {
        return server.toLowerCase().includes(this.searchServer.toLowerCase())
      })
    }
  }
};
</script>
