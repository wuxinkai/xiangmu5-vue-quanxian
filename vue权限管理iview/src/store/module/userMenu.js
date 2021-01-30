import {
  setSessionStorage,
  clearSessionStorage,
  getSessionStorage
} from "@/utils/common";
export default {
  state: {
    rightList: JSON.parse(getSessionStorage('rightList') || '[]'), //转为对象，
    username: getSessionStorage("username") != null ? JSON.parse(getSessionStorage('username')) : ''
  },
  getters: {
    //返回给web页面
    getRightList: state => {
      return state.rightList;
    },
    getUsername: state => {
      return state.username;
    },
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data
      setSessionStorage('rightList', JSON.stringify(data))
    },
    setUserName(state, data) {
      state.username = data
      setSessionStorage('username', JSON.stringify(data))
    }
  },
  actions: {

  }
}