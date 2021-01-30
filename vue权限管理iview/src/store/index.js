import Vue from "vue";
import Vuex from "vuex";
import Sys_init from "./sys_init";
import userMenu from './module/userMenu'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Sys_init,
    userMenu
  }
});