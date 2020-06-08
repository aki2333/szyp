// 配置API接口地址

var root = 'http://192.168.3.131:1101/'//测试
// var root = 'http://50.73.70.26:1101/'//公安

// var root = 'http://10.0.30.43:1101'//石本地
// var root = 'http://10.0.30.57:1101/'//任本地

var aport1 = 'permission'//任
var aport2 = 'datarelease'//石
// var aport2 = 'http://10.0.30.40:9405'//石本地
var aport3 = 'lzsb'

// 引用axios
import axios from 'axios';
import store from '@/store'
import router from '@/router'

import { Message } from 'element-ui';
import { Loading } from 'element-ui';
// import { MessageBox } from 'element-ui';
// 自定义判断元素类型JS
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
function logout() {
  let url = store.state.aurl;
  window.localStorage.clear();
  store.state.user = {};
  store.state.menu = [];
  store.state.token = "";
  store.state.leftMenu = [];

  if (url) {
    window.location.href = url.replace(/login\?/, "logout?");
  } else {
    router.push({ name: "Login" });
    // location.reload();
  }
}
//使用token作为请求头2，拦截请求，将token插入Authorization
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

function apiAxios(method, url, params, success, failure, isDownload) {
  let loadingInstance1 = null;
  loadingInstance1 = Loading.service({ fullscreen: true, spinner: 'el-icon-loading', text: '正在加载中', background: 'rgba(0,0,0,0.6)', customClass: 'loadingClass' });
  if (params) {
    params = filterNull(params);
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    headers: { 'Content-Type': 'application/json' },
    responseType: isDownload || 'json',
    withCredentials: false
  })
    .then(function (res) {
      if (res.status == 200) {
        if (loadingInstance1) {
          loadingInstance1.close();
        }
        if (res.data.success) {
          // 请求成功
          if (success) {
            success(res.data.data)
          }
        } else {
          // 请求异常
          if (failure) {
            failure(res.data.data)
          } else {

            if (res.data.message) {

              if (res.data.message == "登录过期，请重新登录") {
                logout()
                // MessageBox.confirm('登录过期，请重新登录!', '提示', {
                //   confirmButtonText: '确定',
                //   type: 'warning'
                // }).then(() => {
                //   logout()
                // })
              } else {
                Message({
                  message: res.data.message,
                  type: 'warning'
                });
              }
            }
            // console.log("er:", res)
            if (isDownload) {
              let url = window.URL.createObjectURL(new Blob([res.data]));
              // 生成一个a标签
              let link = document.createElement("a");
              link.style.display = "none";
              link.href = url;
              // 生成时间戳
              let timestamp = new Date().getTime();
              link.download = timestamp + ".pdf";
              document.body.appendChild(link);
              link.click();
            }
          }
        }
      } else {
        if (loadingInstance1) {
          loadingInstance1.close();
        }
        // 后台错误
        console.log('后台错误: ' + JSON.stringify(res.data))
      }
    })
    .catch(function (err) {
      if (loadingInstance1) {
        loadingInstance1.close();
      }
      console.log(err)
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure, isDownload) {
    return apiAxios('POST', url, params, success, failure, isDownload)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  root,
  aport1,
  aport2,
  aport3
}
