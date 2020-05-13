import Vue from 'vue'
import Vuex from 'vuex'
import cdata from '@/base/cdata.js'
let breadData = JSON.parse(localStorage.getItem('bread'))
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "6DDF3A214DD94F9F9BEEE04973DA397F",
    menu: cdata.menu,
    leftMenu: [],
    breadcrumb: breadData || []
  },
  mutations: {
    getMenu(state, data) {
      state.menu = data;
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
