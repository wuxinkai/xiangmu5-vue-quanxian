//指令的应用
import Vue from 'vue'
import router from "@/router/index.js";
Vue.directive('permission', {

// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
// inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
// componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
// unbind：只调用一次，指令与元素解绑时调用。

  //  el 当前使用的这个元素
  // binding 获取当前对象上的所有属性
  inserted(el, binding) {
    const action = binding.value.action //删除
    const effect = binding.value.effect //禁用
    // 按钮是否有权限
    const currentRight = router.currentRoute.meta
    debugger
    //如果不包含就会走false  ["view", "edit", "add", "delete"] 包含任何一个都不会消失
    if (currentRight) {
      // 判断有就保留 没意见就删除
      if (currentRight.indexOf(action) == -1) {
        if (effect == 'disabled') {
          //禁用操作
          el.disabled = true
          el.classList.add('disabled')
        } else {
          //从知己父元素上把自己删除
          el.parentNode.removeChild(el)
        }

      }
    }
  }
})