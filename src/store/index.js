import Vue from 'vue'
import Vuex from 'vuex'
// import cdata from '@/base/cdata.js'
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
    menu: menu || [],
    leftMenu: [],
    chilrenNav: [],
    plBtn: [],
    breadcrumb: breadData || [],
    nationality: [],
    gender: [],
    grade: [],
    passportType: [],//证件种类
    suboffice: [],//所属分局
    policestation: [],//派出所
    xzqh: [],
    shzt: [],//审核状态
    rylb: [],
    zfzl: [],
    zsxz: [],
    visaType: [],
    rjka: [],
    rjsy: [],
    qfjg: [],
    turnoutarea: [],//责任区
    // 【非大众】
    datatype: [],//下发类别
    backstatus: [],//数据状态
    bmbh: [],
    sjBmbh: [],
    ssfj: [],
    sspcs: [],
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
    getPlBtn(state, data) {
      state.plBtn = data;
      window.localStorage.setItem("plBtn", JSON.stringify(data));
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
    getDM(state, data) {

      if (data.type == 'qzzl') {
        state.visaType = data.data
      } else if (data.type == 'lz_zfzl') {
        state.zfzl = data.data
      } else if (data.type == 'lz_zsxz') {
        state.zsxz = data.data
      } else if (data.type == 'rydylb') {
        state.rylb = data.data
      } else if (data.type == "xzqh") {
        state.xzqh = data.data
      } else if (data.type == "pcs") {
        state.policestation = data.data
      } else if (data.type == "bjjgka") {
        state.rjka = data.data
      } else if (data.type == "wgr_sqsy") {
        state.rjsy = data.data
      } else if (data.type == "spqfd") {
        state.qfjg = data.data
      } else {
        state[data.type] = data.data;
      }

    },

    getSuboffice(state, data) {
      state.suboffice = data;
    },
    getPolice(state, data) {
      state.policestation = data;
    },
    getZrq(state, data) {
      state.turnoutarea = data;
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
    getssfj(state, data) {
      state.ssfj = data
    },
    getsspcs(state, data) {
      state.sspcs = data
    }
  },
  actions: {
    aGetToken(context, payload) {
      return new Promise((resolve) => {
        context.commit('getToken', payload)
        resolve(payload)
      })
    },
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
    aGetPlBtn(context, payload) {
      return new Promise((resolve) => {
        context.commit('getPlBtn', payload)
        resolve(payload)
      })
    },
    aGetNation(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/DmController/getDMInfo', { tableName: 'dm_gjdqb' }, r => {
          context.commit('getNation', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetGender(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/DmController/getDMInfo', { tableName: 'dm_xbb' }, r => {
          context.commit('getGender', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetGrade(context, payload) {
      console.log("payload", context)
      return new Promise((resolve) => {
        api.post(api.aport1 + '/templateController/getGrade', { template_grade: payload }, r => {
          context.commit('getGrade', r)
          resolve(r)
        })
      })
    },
    aGetDM(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/DmController/getDMInfo', { tableName: 'dm_' + payload + 'b' }, r => {
          context.commit('getDM', { type: payload, data: fnc.ToArray(r.list) })
          resolve(r)
        })
      })
    },
    aGetPassport(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/DmController/getDMInfo', { tableName: 'dm_zjzlb' }, r => {
          context.commit('getPassport', fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetSuboffice(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport2 + '/dm/getDmList', { tableName: 'dm_pcsb', lvl: '2', dmNameRightLike: payload }, r => {
          context.commit('getSuboffice', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetPolice(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport2 + '/dm/getDmList', { tableName: 'dm_pcsb', lvl: '3', dmNameRightLike: payload }, r => {
          context.commit('getPolice', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetZrq(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport2 + '/dm/getDmList', { tableName: 'dm_zrqb', pcs: payload }, r => {
          context.commit('getZrq', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetDatatype(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport2 + '/dm/getDmList', { tableName: 'dm_issue_data' }, r => {
          context.commit('getDatatype', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetBackstatus(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport2 + '/dm/getDmList', { tableName: 'dm_zfztb', sjly: payload }, r => {
          context.commit('getBackstatus', fnc.sortByKey(r, 'dm'))
          resolve(payload)
        })
      })
    },
    aGetBmbh(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/dept/getAllSubDept', payload, r => {
          context.commit('getBmbh', fnc.sortByKey(r, 'dm'))
          resolve(r)
        })
      })
    },
    aGetssdw(context, payload) {
      return new Promise((resolve) => {
        api.post(api.aport1 + '/dept/getSubDeptBmMc', payload, r => {
          if (payload.type == "ssfj") {
            context.commit('getssfj', fnc.sortByKey(r, 'dm'))
          } else if (payload.type == "sspcs") {
            context.commit('getsspcs', fnc.sortByKey(r, 'dm'))
          }
          resolve(r)
        })
      })
    }
  },
  modules: {
  }
})
