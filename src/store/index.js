import Vue from 'vue'
import Vuex from 'vuex'
import cdata from '@/base/cdata.js'
import api from '@/api/index.js'
import fnc from '@/base/fnc.js'
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
    breadcrumb: breadData || [],
    nation:[],
    gender:[],
    passportType:[],//证件种类
    suboffice:[],//所属分局
    policepolicestation:[],//派出所
    // 【非大众】
    datatype:[],//下发类别
    backstatus:[],//数据状态
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
    },
    getNation(state,data){
      state.nation = data;
      cdata.options.nationality = data;
    },
    getGender(state,data){
      state.gender = data;
      cdata.options.gender = data;
    },
    getPassport(state,data){
      state.passportType = data;
      cdata.options.passportType = data;
    },
    getSuboffice(state,data){
      state.suboffice = data;
      cdata.options.suboffice = data;
    },
    getPolice(state,data){
      state.policepolicestation = data;
      cdata.options.policepolicestation = data;
    },
    getDatatype(state,data){
      state.datatype = data;
      cdata.options.datatype = data;
    },
    getBackstatus(state,data){
      state.backstatus = data;
      cdata.options.backstatus = data;
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
    },
    aGetNation(context,payload){
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo',{tableName:'dm_gjdqb'},r => {
          context.commit('getNation',fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetGender(context,payload){
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo',{tableName:'dm_xbb'},r => {
          context.commit('getGender',fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetPassport(context,payload){
      return new Promise((resolve) => {
        api.post('/DmController/getDMInfo',{tableName:'dm_zjzlb'},r => {
          context.commit('getPassport',fnc.ToArray(r.list))
          resolve(payload)
        })
      })
    },
    aGetSuboffice(context,payload){
      return new Promise((resolve) => {
        let p={}
        if(user.jb=='1'){
          p={tableName:'dm_pcsb',lvl:'2'}
        }else if(user.jb=='2'){
          p={tableName:'dm_pcsb',dmNameRightLike:user.bmbh.slice(0,6),lvl:'2'}
        }else if(user.jb=='3'){
          p={tableName:'dm_pcsb',dmNameRightLike:user.bmbh.slice(0,6)+'000000',lvl:'2'}
        }
        api.post(api.root1+'/dm/getDmList',p,r => {
          context.commit('getSuboffice',r)
          resolve(payload)
        })
      })
    },
    aGetPolice(context,payload){
      return new Promise((resolve) => {
        let p={}
        if(user.jb=='1'){
          p={tableName:'dm_pcsb',lvl:'3'}
        }else if(user.jb=='2'){
          p={tableName:'dm_pcsb',dmNameRightLike:user.bmbh.slice(0,6),lvl:'3'}
        }else if(user.jb=='3'){
          p={tableName:'dm_pcsb',dmNameRightLike:user.bmbh,lvl:'3'}
        }
        api.post(api.root1+'/dm/getDmList',p,r => {
          context.commit('getPolice',r)
          resolve(payload)
        })
      })
    },
    aGetDatatype(context,payload){
      return new Promise((resolve) => {
        api.post(api.root1+'/dm/getDmList',{tableName:'dm_issue_data'},r => {
          context.commit('getDatatype',r)
          resolve(payload)
        })
      })
    },
    aGetBackstatus(context,payload){
      return new Promise((resolve) => {
        api.post(api.root1+'/dm/getDmList',{tableName:'dm_zfztb'},r => {
          context.commit('getBackstatus',r)
          resolve(payload)
        })
      })
    }
  },
  modules: {
  }
})
