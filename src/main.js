import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import '../theme/index.css'
import router from './router'
import store from './store'
import api from './api/index.js'
import http from './request/api.js'
import fnc from './base/fnc.js'
import cdata from './base/cdata.js'
import echarts from "echarts";

Vue.config.productionTip = false
document.title = "苏州市公安局·涉外综合分析研判系统"
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$fnc = fnc
Vue.prototype.$cdata = cdata
Vue.prototype.$echarts = echarts;

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
