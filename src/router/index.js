import Vue from 'vue'
import VueRouter from 'vue-router'
import Frame from '../views/Frame.vue'

Vue.use(VueRouter)
// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
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
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
