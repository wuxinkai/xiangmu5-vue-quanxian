import Vue from "vue";
import Router from "vue-router";
import {
  routes,
  ruleMapping
} from "./router";
import store from "@/store/module/userMenu";
import {
  getSessionStorage
} from "@/utils/sys_utils/common";

Vue.use(Router);
const router = new Router({
  routes
});



//避免控制台报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//全局路由前置钩子函数
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = getSessionStorage('token')
    if (!token) { //如果没有登录就让他跳到登录
      next('/login')
    } else {
      next()
    }
  }
})

export function initDynamicRoutes() {
  const currentRoutes = router.options.routes
  const rightList = store.state.rightList
  rightList.forEach(item => {
    item.children.forEach(item => {
      const itemRule = ruleMapping[item.path]
      // 权限数据需要的
      itemRule.meta = item.rights
      currentRoutes[2].children.push(itemRule)
    })
  })
  console.log(currentRoutes)
  router.addRoutes(currentRoutes)
}

export default router;