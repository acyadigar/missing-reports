import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
});

export default new Vuex.Store({
  state: {
    user: {},
    reports : [],
    currentUser: {}
  },
  mutations: {
    SET_REPORTS(state, data){
      state.reports = data
    },
    LOGIN(state, data){
      state.user = data
    },
    POST_REPORT(state, data){
      state.reports.push(data)
    },
    LOGOUT(state){
      state.user = {}
    }
  },
  actions: {
    async fetchReports({commit}){
      const result = await http.get('/report/all/json')
      commit('SET_REPORTS', result.data)
    },
    async register({commit}, data){
      const result = await http.post('/auth/register', data)
      commit('LOGIN', result.data)
    },
    async login({commit}, data){
      const result = await http.post('/auth/login', data)
      commit('LOGIN', result.data)
    },
    async postReport({commit}, data){
      const user = this.state.user.username
      const reportData = {
        ...data,
        author: user
      }
      const result = await http.post('/report', reportData)
      commit('POST_REPORT', result.data)
    },
    logout({commit}){
      commit('LOGOUT')
    }
  },
  modules: {
  }
})
