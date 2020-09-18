import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Frame from '../views/Frame.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Frame',
    name: 'Frame',
    component: Frame,
    children: [
      /**
       * 运维支撑
       */
      //【权限管理】
      {
        path: '/UserManagement',
        name: 'UserManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/UserManagement.vue')
      },
      {
        path: '/RoleManagement',
        name: 'RoleManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/RoleManagement.vue')
      },
      {
        path: '/UnitManagement',
        name: 'UnitManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/UnitManagement.vue')
      },
      {
        path: '/TemplateManagement',
        name: 'TemplateManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/TemplateManagement.vue')
      },
      {
        path: '/MenuManagement',
        name: 'MenuManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/MenuManagement.vue')
      },
      {
        path: '/ZrqManagement',
        name: 'ZrqManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/ZrqManagement.vue')
      },
      //【配置管理】
      {
        path: '/TimeControl',
        name: 'TimeControl',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/disPoseFunction/TimeControl.vue')
      },
      /**
       * 业务管理
       */
      // 业务管理
      {
        path: '/Specialcheck',
        name: 'Specialcheck',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/Specialcheck.vue')
      },
      {
        path: '/Temporary',
        name: 'Temporary',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/Temporary.vue')
      },
      {
        path: '/ZrqVistManage',
        name: 'ZrqVistManage',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/ZrqVistManage.vue')
      },
      {
        path: '/ResidentAnalyze',
        name: 'ResidentAnalyze',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/ResidentAnalyze.vue')
      },
      {
        path: '/CheckZXHC',
        name: 'CheckZXHC',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/CheckZXHC.vue')
      },
      {
        path: '/CzInformationDefend',
        name: 'CzInformationDefend',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/CzInformationDefend.vue')
      },
      {
        path: '/Check144',
        name: 'Check144',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/Check144.vue')
      },
      {
        path: '/CheckReporter',
        name: 'CheckReporter',
        component: () => import(/* webpackChunkName: "Businessmanagement" */ '../views/Businessmanagement/Overseasperson/CheckReporter.vue')
      },
      /**
       * 分析研判CzChangingTrend
       */
      //分析研判
      {
        path: '/CzChangingTrend',
        name: 'CzChangingTrend',
        component: () => import(/* webpackChunkName: "AnalysisAndJudgment" */ '../views/AnalysisAndJudgment/AAJudge/CzChangingTrend.vue')
      },
      //智能搜索
      {
        path: '/RYHX',
        name: 'RYHX',
        component: () => import(/* webpackChunkName: "AnalysisAndJudgment" */ '../views/AnalysisAndJudgment/IntelligentSearch/RYHX.vue')
      },
      {
        path: '/RYHXXQ',
        name: 'RYHXXQ',
        component: () => import(/* webpackChunkName: "AnalysisAndJudgment" */ '../views/AnalysisAndJudgment/IntelligentSearch/RYHXXQ.vue')
      },
    ]
  },
  {
    path: '/OtherPage',
    name: 'OtherPage',
    component: () => import(/* webpackChunkName: "OtherPage" */ '../views/OtherPage.vue')
  },
  {
    path: '/CzCTXQ',
    name: 'CzCTXQ',
    component: () => import(/* webpackChunkName: "AnalysisAndJudgment" */ '../views/AnalysisAndJudgment/AAJudge/CzCTXQ.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let islogin = store.state.token;
  if (to.name === 'Login'
    || to.name === 'OtherPage') {
    //如果是登录页，则跳过验证
    next() //必不可少
    return //以下的代码不执行
  }
  if (islogin) {
    // console.log('to==',to,'from',from)
    if(window.location.href.includes("sfzh")){
      var query = window.location.href.split("?")[1].split("&");
      let sfzh = ''
      for (var i = 0; i < query.length; i++) {
        if (query[i].split("=")[0] == 'sfzh') {
          sfzh = query[i].split("=")[1];
        }
      }
      // console.log('to==shzh',sfzh,store.state.sfzhTurn)
      if(sfzh == store.state.sfzhTurn){
        if(to.path==='/Frame'&&to.query.page=='Specialcheck'){
          store.dispatch("aGetPage", 'Specialcheck'); //存入跳转页面page
          next({ name: 'Specialcheck', query: to.query })
        }else if(to.path==='/Frame'&&to.query.page=='ZrqManagement'){
          store.dispatch("aGetPage", 'ZrqManagement'); //存入跳转页面page
          next({ name: 'ZrqManagement', query: to.query })
        }else if(to.path==='/Frame'&&to.query.page=='ZrqVistManage'){
          store.dispatch("aGetPage", 'ZrqVistManage'); //存入跳转页面page
          next({ name: 'ZrqVistManage', query: to.query })
        }else{
          next()
        }
      }else{
        next({ name: 'Login', query: to.query })
      }
    }else{
      // console.log('menu',store.state.menu)
      next()
    }
  } else {
    next({ name: 'Login', query: to.query })
  }
})
export default router
