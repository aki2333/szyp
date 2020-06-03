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
      // 业务管理
      {
        path: '/Specialcheck',
        name: 'Specialcheck',
        component: () => import(/* webpackChunkName: "Overseasperson" */ '../views/Businessmanagement/Overseasperson/Specialcheck.vue')
      },
      {
        path: '/Temporary',
        name: 'Temporary',
        component: () => import(/* webpackChunkName: "Overseasperson" */ '../views/Businessmanagement/Overseasperson/Temporary.vue')
      },
      {
        path: '/ZrqVistManage',
        name: 'ZrqVistManage',
        component: () => import(/* webpackChunkName: "Overseasperson" */ '../views/Businessmanagement/Overseasperson/ZrqVistManage.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // const title = to.meta && to.meta.title
  let islogin = store.state.token
  // let islogin = true
  // if (title) {
  //   document.title = title
  // }
  if (to.name === 'Login') {
    //如果是登录页，则跳过验证
    next() //必不可少
    return //以下的代码不执行
  }
  if (islogin) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
export default router
