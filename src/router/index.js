import Vue from 'vue'
import VueRouter from 'vue-router'
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
        path: '/MenuManagement',
        name: 'MenuManagement',
        component: () => import(/* webpackChunkName: "OMSupport" */ '../views/OMSupport/UserFunction/MenuManagement.vue')
      },
      // 业务管理
      {
        path: '/Specialcheck',
        name: 'Specialcheck',
        component: () => import(/* webpackChunkName: "Overseasperson" */ '../views/Businessmanagement/Overseasperson/Specialcheck.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
