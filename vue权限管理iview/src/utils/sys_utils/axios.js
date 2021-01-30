/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import router from "../../router";
import { SetbaseUrl } from "../../../config/node_env";
import store from "@/store";
import { removeToken } from "./common";
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.push({
    path: "/login"
  });
};

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // tip(other);
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // tip(other);
      removeToken("");
      toLogin();
      break;
    // 404请求不存在
    case 404:
      // tip("请求的资源不存在");
      break;
    default:
  }
};

class HttpRequest {
  // 定义拦截器方法
  interceptors(instance) {
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    instance.interceptors.request.use(
      config => {
        // 在发送请求之前 如果是post请求   就序列化参数
        if (config.method.toLowerCase() === "post") {
          //获取公共数据  // 添加CommData公共数据 与提交数据
          let CommData = store.getters.getCommData;
          // 获取请求接口
          let url = config.url;
          let org_srv_name = url
            .split("/")
            [url.split("/").length - 1].split(".")[0]; //获取.do服务名称
          let params = Object.assign(
            {},
            CommData == null || CommData == undefined
              ? {}
              : JSON.parse(CommData),
            config.data,
            {
              org_srv_name: org_srv_name
            }
          );
          config.data = JSON.stringify(params);
        }
        return config;
      },
      error => {
        Promise.error(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      // 请求成功
      res => {
        if (res.status === 200) {
          return Promise.resolve(res);
        } else {
          return Promise.resolve(res);
        }
      },
      // 请求失败
      error => {
        if (error && error.response) {
          switch (error.code) {
            case 400:
              error.message = "请求错误(400)";
              break;
            case 401:
              error.message = "未授权，请重新登录(401)";
              break;
            case 403:
              error.message = "拒绝访问(403)";
              break;
            case 404:
              error.message = "请求出错(404)";
              break;
            case 408:
              error.message = "请求超时(408)";
              break;
            case 500:
              error.message = "服务器错误(500)";
              break;
            case 501:
              error.message = "服务未实现(501)";
              break;
            case 502:
              error.message = "网络错误(502)";
              break;
            case 503:
              error.message = "服务不可用(503)";
              break;
            case 504:
              error.message = "网络超时(504)";
              break;
            case 505:
              error.message = "HTTP版本不受支持(505)";
              break;
            default:
              error.message = "连接错误!";
          }
        } else {
          error.message = "连接服务器失败!";
        }
        return Promise.resolve(error);
      }
    );
  }

  request(options) {
    // 创建axios实例
    const instance = axios.create({
      // 判断是否有传入其他的代理地址 有的话就用最新的  没有就用默认的
      baseURL:
        options.baseUrl && Object.keys(options.baseUrl).length > 0
          ? options.baseUrl
          : SetbaseUrl,
      timeout: 1000,
      // 判断是否存在请求头信息 如果有 就使用  否则就默认头
      headers:
        options.header && Object.keys(options.header).length > 0
          ? options.header
          : { "Content-Type": "application/json;charset=UTF-8" }
    });
    // 调用拦截器
    this.interceptors(instance);
    return instance(options);
  }
}

export default HttpRequest;
