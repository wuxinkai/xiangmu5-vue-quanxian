/**
 * 此文件主要用来调用一些公共的常用操作方法
 * 例如：登录 获取用户基本信息等操作
 */
// 有接口请求情况下 需要引入接口
import { getSessionStorage } from "@/utils/sys_utils/common";
import Dispose from "@/utils/sys_utils/portDispose";
//导入API服务
import LoginService from "@/api/sys_api/sys_basic_api";

const state = {
  // 请求接口需要携带的参数
  CommData: getSessionStorage("CommData")
    ? getSessionStorage("CommData")
    : null,
  // 用户菜单权限列表
  MenuList: getSessionStorage("MenuList") ? getSessionStorage("MenuList") : null
};

const getters = {
  // 获取系统接口请求基础参数
  getCommData: state => {
    return state.CommData;
  },
  // 获取用户菜单列表
  getMenuList: state => {
    return JSON.parse(state.MenuList);
  }
};

const mutations = {
  // 设置接口请求需要携带的数据
  SET_COMMDATA(state, CommData) {
    state.CommData = CommData;
  },
  SET_MENULIST(state, menulist) {
    state.MenuList = menulist;
  }
};

const actions = {
  /**
   * 根据用户名验证用户是否存在
   *  *  us_ViewUsforAppActioncheckUserId //验证用户名
   *  参数：data包含this.CommData公共数据+this.submitData.org_user_id
   */
  async ViewUsforAppActioncheckUserId({ commit }, params) {
    try {
      let result = await LoginService.us_ViewUsforAppActioncheckUserId(params);
      return Dispose(result);
    } catch (error) {
      return error;
    }
  },
  /**
   *  us_UserLoginInAction //登陆
   *  参数：data包含this.CommData公共数据+this.submitData 账号密码
   */
  async UserLoginInAction({ commit }, params) {
    try {
      let result = await LoginService.us_UserLoginInAction(params);
      return Dispose(result);
    } catch (error) {
      return error;
    }
  },

  async QueryRsPrivAction({ commit }, params) {
    try {
      let result = await LoginService.us_QueryRsPrivAction(params);
      return Dispose(result);
    } catch (error) {
      return error;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
