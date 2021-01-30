# vue学习列表
* async/await 嵌套其他组件用法
* 学习存储数据通知页面监听的办法
* mock.js的应用办法
* 本地存储加密办法
#  async/await 嵌套其他组件用法
在其他方法里等待返回值async/await （src\views\Login.vue）
```
handleLogin(name) {
  let _this = this;
  _this.$refs.loginForm.validate(async valid => {
    const { data: res } = await _this.$http.post('login', _this.loginForm)
  })
},
```
# 存储值的办法
（src\views\Login.vue）
```
//（1）顶部 注册
import {mapState, mapMutations, mapGetters, mapActions } from 'vuex'

methods: {
// (2) methods里监听
  ...mapMutations(['setRightList']),

  handleLogin(name) {
    let _this = this;
      const { data: res } = await _this.$http.post('login', _this.loginForm)
      //（3）使用
      _this.setRightList(res.rights)
    })
  },
}
```
vue的设置 (src\store\module\userMenu.js)
```
import { setSessionStorage, getSessionStorage} from "@/utils/common";
export default {
  state: {
    //（2）获取数据， 转为对象，
    rightList: JSON.parse(getSessionStorage('rightList') || '[]') 
  },
  getters: {
    //（3）返回给web页面 在home页面接收
    getRightList: state => {
      return state.rightList;
    },
  },
  mutations: {
    setRightList(state, data) {
      state.rightList = data
      //（1）存储到本地数据缓存
      setSessionStorage('rightList', JSON.stringify(data))
    }
  },
  actions: {

  }
}
```
web 接收存储内容 （src\views\Home.vue）
```
// （1）顶部注册
import { mapGetters, mapState } from 'vuex'

// （2）监听数据
computed: {
  ...mapGetters(['getRightList'])
},

//(3) 获取数据给其他数据赋值
created() {
  //获取数据给其他属性赋值
  this.getMenuList = this.getRightList
}
```

# mock.js的应用办法
```
(1) 把mock包引入 （ vue前端权限管理\mock）
(2) 配置页面    （ mock\index.js）
(3) 在vue.config 页面设置before: require('./mock/index.js')  （vue前端权限管理\vue.config.js）
(4) 配置development页面  （vue前端权限管理\.env.development）就可以获取数据了
```

# 对本地缓存数据进行加密
```
下载依赖包
import CryptoJS from "crypto-js";

// 添加和删除

export const setSessionStorage = (keyName, Info) => {
  // 加密处理
  let encryptInfo = Encrypt(Info);
  sessionStorage.setItem(keyName, encryptInfo);
};

export const getSessionStorage = keyName => {
  let Info = sessionStorage.getItem(keyName);
  // 解密处理
  let decryptInfo = Decrypt(Info);
  return decryptInfo;
};

// 使用cryptojs来处理页面存储信息的加密以及解密
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量
//加密方法
const Encrypt = word => {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

//解密方法
const Decrypt = word => {
  if (word != null) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  }
};
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 状态保持
#### 在不传送用户名和密码的情况下，依然可以让服务器知道，是哪个用户所发送的，
```
cookie：
session
toden：用于前端用户的状态保持,(字符串)，在请求头中加入toden
```
#### 后端的权限设计RBAC(给予角色的权限控制)
```
用户
角色
权限
```
### 前端权限控制的好处（前端并不能控制数据库的数据）
```
（1）降低非法操作的可能性，（如果我们展示一个不具备当前用操作的按钮，就算点击了也会失败 ，避免测试，非常操作）
（2）尽可能的排除不必要的请求，减轻服务器的压力（不具备权限的请求，不应该发送的请求，减轻服务器的压力）
（3）提高用户体验 （根据用户权限，为用户展示自己范围内的内容 避免给用户带来困扰）
```
### 前端权限就是控制视图层的展示
```
(1)未登录直接通过url访问的
```
# 权限按钮
(1) 添加自定义指令 让按钮有没有权限显示出来  （src\views\users\Users.vue）
```
// 新增 action = ["view", "edit", "add", "delete"]
<Button type="primary" @click="addDialogVisible = true" v-permission="{action:'add'}">添加用户</Button>

// 禁用
<Button class="btn-style"  v-permission="{effect:'disabled'}"   icon="ios-alarm" >禁用</Button>
```

(2) 从main.js中引入 (src\main.js)
```
import './utils/permission.js'
```
(3) 从路由中获取当前菜单的权限
```
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

```
(3) 设置指令(src\utils\permission.js)
```
import Vue from 'vue'
import router from "@/router/index.js";
Vue.directive('permission', {
  //  el 当前使用的这个元素
  // binding 获取当前对象上的所有属性
  inserted(el, binding) {
    const action = binding.value.action //删除
    const effect = binding.value.effect //禁用
    // 按钮是否有权限
    const currentRight = router.currentRoute.meta
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
```
 