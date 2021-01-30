// 安装并引入相关模块
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
let bsae_api = process.env.NODE_ENV == "development" && process.env.API_ROOT ? '/api' :  process.env.API_ROOT //判断开发环境  true 使用代理/api  true 使用process.env.API_ROOT
console.log(process)
let socket , stompClient=null ;
  function connection () {
    return new Promise(function (resolve, reject) {
    socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      resolve(frame)
    }, (err) => {

    })
  })
  }

  function connect(url,app,callback,params){
      /** Promise 无法实时接受推送数据  改用callback回调函数
          return new Promise(function (resolve, reject) { 
        })
      */
    stompClient.subscribe(`${url}`, (res) => { // 订阅服务端提供的某个topic
      callback(res)
      // console.log(msg, "msg"); // msg.body存放的是服务端发送给我们的信息
    },function (err) {
    })
    stompClient.send(app, {}, JSON.stringify(params))
  }

export {
  connection,connect
}

