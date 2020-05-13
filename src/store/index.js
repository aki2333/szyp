import Vue from 'vue'
import Vuex from 'vuex'
import cdata from '@/base/cdata.js'
let breadData = JSON.parse(localStorage.getItem('bread'))
let user = JSON.parse(localStorage.getItem('user'))
let menu = JSON.parse(localStorage.getItem('menu'))


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "6DDF3A214DD94F9F9BEEE04973DA397F",
    user: user || {},
    menu: menu || cdata.menu,
    leftMenu: [],
    breadcrumb: breadData || []
  },
  mutations: {
    getUser(state, data) {
      state.user = data;
      window.localStorage.setItem("user", JSON.stringify(data));
    },
    getMenu(state, data) {
      state.menu = data;
      window.localStorage.setItem("menu", JSON.stringify(data));
    },
    getLeftMenu(state, data) {
      state.leftMenu = data;
    },
    getBread(state, data) {
      state.breadcrumb = data;
      window.localStorage.setItem("bread", JSON.stringify(data));
    }
  },
  actions: {
    aGetUser(context, payload) {
      return new Promise((resolve) => {
        context.commit('getUser', payload)
        resolve(payload)
      })
    },
    aGetMenu(context, payload) {
      return new Promise((resolve) => {
        context.commit('getMenu', payload)
        resolve(payload)
      })
    },
    aGetBread(context, payload) {
      return new Promise((resolve) => {
        context.commit('getBread', payload)
        resolve(payload)
      })

    }
  },
  modules: {
  }
})
