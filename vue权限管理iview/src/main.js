import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入自适应布局插件
import "amfe-flexible";
import iView from "iview";
import "iview/dist/styles/iview.css";
import { TaskNode } from "vue-task-node";
import "vue-task-node/dist/css/vnode.css";
import "./assets/iconfont/iconfont.css";
import './utils/http.js'
//控制按钮权限
import './utils/permission.js'
//初始化样式
import "@/assets/style/reset.css";


Vue.use(iView);
Vue.use(TaskNode);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
