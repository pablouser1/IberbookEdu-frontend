import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // put variables and collections here
    servers: {
      active: "",
      list: []
    },
    loggedin: false,
    userinfo: {},
    profileinfo: {}
  },
  mutations: {
    // put sychronous functions for changing state e.g. add, edit, delete
    // Set all servers
    setServers: function (state, servers) {
      state.servers = servers
    },
    // Add new server to list
    setNewServer: function (state, server) {
      state.servers.list.push(server)
    },
    // Change current active server
    setActiveServer: function (state, server) {
      state.servers.active = server
    },
    removeServer: function (state, server) {
      const result = state.servers.list.filter(item => item != server);
      state.servers.list = result
    },
    setLoggedin: function (state, type) {
      state.loggedin = type
    },
    setUserinfo: function (state, userinfo) {
      state.userinfo = userinfo
    },
    setProfileinfo: function(state, profileinfo) {
      state.profileinfo = profileinfo
    }
  },
  actions: {
    // put asynchronous functions that can call one or more mutation functions
  },
  modules: {}
})
