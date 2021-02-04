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
          <a @click="setActiveServer(server)" v-for="(server, index) in filteredServers" v-bind:key="index" class="panel-block">
            <span>{{ server }}</span>
          </a>
        </nav>
        <b-field :label="$t('add')">
          <b-input v-model="newServer" placeholder="http://example.com/IberbookEdu"></b-input>
          <p class="control">
            <b-button type="is-primary" @click="setNewServer">{{ $t("add") }}</b-button>
          </p>
        </b-field>
        <b-field :label="$t('remove')">
          <b-select v-model="removeServer">
            <option v-for="(server, index) in servers.list" v-bind:key="index" :value="server">{{server}}</option>
          </b-select>
          <p class="control">
            <b-button type="is-danger" @click="deleteServer">{{ $t("remove") }}</b-button>
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
        removeServer: ""
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
      this.$store.commit('setActiveServer', server)
      localStorage.servers = JSON.stringify(this.servers)
      this.$buefy.toast.open('Active server modified')
      // Logout
      this.$router.push("/logout")
    },
    deleteServer: async function() {
      if (this.servers.list.length === 1) {
        this.$buefy.toast.open("You can't delete all your servers")
      }
      else {
        this.$store.commit("removeServer", this.removeServer)
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
