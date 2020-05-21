import Vue from 'vue'
import Vuex from 'vuex'
import cdata from '@/base/cdata.js'
import api from '@/api/index.js'
import fnc from '@/base/fnc.js'
let breadData = JSON.parse(localStorage.getItem('bread'))
let user = JSON.parse(localStorage.getItem('user'))
let menu = JSON.parse(localStorage.getItem('menu'))
let token = localStorage.getItem('token')
let aurl = localStorage.getItem('aurl')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: token || '',
    user: user || {},
    menu: menu || cdata.menu,
    leftMenu: [],
    chilrenNav: [],
    breadcrumb: breadData || [],
    nationality: [],
    gender: [],
    grade: [],
    passportType: [],//证件种类
    suboffice: [],//所属分局
    policestation: [],//派出所
    // 【非大众】
    datatype: [],//下发类别
    backstatus: [],//数据状态
    bmbh: [],
    sjBmbh: [],
    fjBmbh: [],
    pcsBmbh: [],
    aurl: aurl || '',

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
    getChilrenNav(state, data) {
      state.chilrenNav = data;
    },
    getBread(state, data) {
      state.breadcrumb = data;
      window.localStorage.setItem("bread", JSON.stringify(data));
    },
    getToken(state, data) {
      state.token = data;
      window.localStorage.setItem("token", data)
    },
    getUrl(state, data) {
      state.aurl = data;
      window.localStorage.setItem("aurl", data)
    },
    getNation(state, data) {
      state.nationality = data;
    },
    getGender(state, data) {
      state.gender = data;
    },
    getGrade(state, data) {
      state.grade = data;
    },
    getPassport(state, data) {
      state.passportType = data;
    },
    getSuboffice(state, data) {
      state.suboffice = data;
    },
    getPolice(state, data) {
      state.policestation = data;
    },
    getDatatype(state, data) {
      state.datatype = data;
    },
    getBackstatus(state, data) {
      state.backstatus = data;
    },
    getBmbh(state, data) {
      state.bmbh = data
    },
    getSjBmbh(state, data) {
      state.sjBmbh = data
    },
    getFjBmbh(state, data) {
      console.log("getFjBmbh", data)
      state.fjBmbh = data
    },
    getPcsBmbh(state, data) {
      state.pcsBmbh = data
    }
  },
  actions: {
    aGetUrl(context, payload) {
      return new Promise((resolve) => {
        context.commit('getUrl', payload)
        resolve(payload)
      })
    },
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
    aGetLeftMenu(context, payload) {
      return new Promise((resolve) => {
        context.commit('getLeftMenu', payload)
        resolve(payload)
      })
    },
    aGetBread(context, payload) {
      return new Promise((resolve) => {
        context.commit('getBread', payload)
        resolve(payload)
      })
    },
    aGetNation(context, payload) {
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo', { tableName: 'dm_gjdqb' }, r => {
          context.commit('getNation', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetGender(context, payload) {
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo', { tableName: 'dm_xbb' }, r => {
          context.commit('getGender', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetGrade(context, payload) {
      console.log("payload", context)
      return new Promise((resolve) => {
        api.post('/templateController/getGrade', { template_grade: payload }, r => {
          context.commit('getGrade', r)
          resolve(r)
        })
      })
    },
    aGetPassport(context, payload) {
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo', { tableName: 'dm_zjzlb' }, r => {
          context.commit('getPassport', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetSuboffice(context, payload) {
      return new Promise((resolve) => {
        api.post(api.root1 + '/dm/getDmList', { tableName: 'dm_pcsb', lvl: '2', dmNameRightLike: payload }, r => {
          context.commit('getSuboffice', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetPolice(context, payload) {
      return new Promise((resolve) => {
        api.post(api.root1 + '/dm/getDmList', { tableName: 'dm_pcsb', lvl: '3', dmNameRightLike: payload }, r => {
          context.commit('getPolice', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetDatatype(context, payload) {
      return new Promise((resolve) => {
        api.post(api.root1 + '/dm/getDmList', { tableName: 'dm_issue_data' }, r => {
          context.commit('getDatatype', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetBackstatus(context, payload) {
      return new Promise((resolve) => {
        api.post(api.root1 + '/dm/getDmList', { tableName: 'dm_zfztb', sjly: payload }, r => {
          context.commit('getBackstatus', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetBmbh(context, payload) {
      return new Promise((resolve) => {
        api.post('dept/getAllSubDept', payload, r => {
          context.commit('getBmbh', r)
          resolve(r)
        })
      })
    }
    // aGetBmbh(context, payload) {
    //   return new Promise((resolve) => {
    //     api.post('dept/getSubDeptBmMc', payload, r => {
    //       console.log(payload.type, 'payload.type == "fjBmbh"', payload.type == "fjBmbh")
    //       if (payload.type == "sjBmbh") {
    //         context.commit('getSjBmbh', r)
    //       } else if (payload.type == "fjBmbh") {
    //         console.log(payload.type, "进入")
    //         context.commit('getFjBmbh', r)
    //       } else if (payload.type == "pcsBmbh") {
    //         context.commit('getPcsBmbh', r)
    //       }
    //       resolve(r)
    //     })
    //   })
    // }
  },
  modules: {
  }
})
