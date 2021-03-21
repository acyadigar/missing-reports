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
  },
  mutations: {
    SET_REPORTS(state, data){
      state.reports = data
    },
    SET_REPORT(state, data){
      state.report = data
    },
    LOGIN(state, data){
      state.user = data
    },
    POST_REPORT(state, data){
      state.reports.push(data)
    },
    UPDATE_REPORT(state, data){
      let report = state.reports.find(report => report._id == data._id)
      report = data
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
    async fetchReport(_,id){
      const result = await http.get(`/report/${id}/json`)
      .catch(e => { throw e.response.data.message})
      return result.data
    },
    async register({commit}, data){
      const result = await http.post('/auth/register', data)
      .catch(e => { throw e.response.data.message})
      commit('LOGIN', result.data)
    },
    async login({commit}, data){
      const result = await http.post('/auth/login', data)
      .catch(e => { throw e.response.data.message})
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
    async updateReport({commit}, data){
      const result = await http.patch(`/report/${data._id}`, data)
      commit('UPDATE_REPORT', result.data) 
    },
    async deleteReport(_, id){
      await http.delete(`/report/${id}`)
    },
    logout({commit}){
      commit('LOGOUT')
    },
    async fetchOptions(){
      const result = await http.get('/report/locations')
      return result.data
    },
  },
  modules: {
  },
})
