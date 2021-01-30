import axios from 'axios'
import Vue from 'vue'
import {
  getSessionStorage
} from "./common";
import router from '../router'
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
const actionMapping = {
  get: 'view',
  post: 'add',
  put: 'edit',
  delete: 'delete'
}
//
axios.interceptors.request.use(function(req){
  const currentUrl = req.url
  if(currentUrl !== 'login') {
    //（1）加入token 才能请求
    req.headers.Authorization = getSessionStorage('token')
    // 当前模块中具备的权限
    // 查看用户  get请求  
    // 增加用户  post请求  
    // 修改用户  put请求   
    // 删除用户  delete请求 
    const method = req.method
    // 根据请求, 得到是哪种操作
    const action = actionMapping[method]
    
    // （2）判断action是否存在当前路由的权限中
    const rights = router.currentRoute.meta
    //利用当前按钮上的属性和后台返回的结果不一样的，进行请求拦截
    if(rights && rights.indexOf(action) == -1) {
      // 没有权限
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  //必须return 否则发送不出去
  return req
})

//响应拦截设置，在toden被篡改，或者超时都应有跳转到登录界面
axios.interceptors.response.use(function(res){
  if (res.data.meta.status === 401) {
    router.push('/login')
    sessionStorage.clear()
    window.location.reload()
  }
  return res
})
Vue.prototype.$http = axios