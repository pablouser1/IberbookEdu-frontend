import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedin: false,
    userinfo: {},
    profileinfo: {}
  },
  mutations: {
    // put sychronous functions for changing state e.g. add, edit, delete
    setLoggedin: function (state, type) {
      state.loggedin = type
    },
    setUserinfo: function (state, userinfo) {
      state.userinfo = userinfo
    },
    setProfileinfo: function (state, profileinfo) {
      state.profileinfo = profileinfo
    }
  },
  actions: {
    // put asynchronous functions that can call one or more mutation functions
  },
  modules: {}
})
