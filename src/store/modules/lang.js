import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/main.js'

Vue.use(Vuex)

const mutations = {
  SET_LANG (state, payload) {
      app.$i18n.locale = payload
    }
}

const actions = {
  setLang({commit}, payload) {
      commit('SET_LANG', payload)
    }
}

export default {
  mutations,
  actions
} 