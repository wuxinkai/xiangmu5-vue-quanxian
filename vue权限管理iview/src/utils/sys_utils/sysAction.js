/**
 * 系统常用的服务调用，登录  验证用户是否存在 等服务
 */
import store from "@/store";
import { Message } from "iview";
import { setSessionStorage } from "./common";
// 默认使用参数定义
const CommData = {
  org_user_id: "",
  org_dept_id: "",
  org_term_no: "",
  orguser_cn_name: "",
  orgdept_cn_name: "",
  org_channel_code: "01",
  org_rs_code: "00", //发起资源编码
  org_work_code: "",
  submit_type: 1,
  token: ""
};
// 声明一个全局变量  存储用户输入的用户名 在下面登录时候可以直接使用这个来判断传入的参数哪个是用户名  哪个是密码
let userId = "";
/**
 * 验证用户是否存在
 * 参数：只需传入用户名即可
 */
const checkUserById = org_user_id => {
  const params = Object.assign({}, CommData, { data: org_user_id });
  store
    .dispatch("ViewUsforAppActioncheckUserId", params)
    .then(res => {
      if (res) {
        if (res.result === false) Message.warning("用户名不存在");
        else userId = org_user_id;
      }
    })
    .catch(err => {
      Message.error(err);
    });
};

/**
 * 用户登录接口
 * 参数： 只需要传入用户名 密码即可
 */
const loginFn = userInfo => {
  //如果用户传入的参数不是空 并且是对象  并且属性两个
  let loginInfo = {
    org_user_id: "",
    user_passwd: ""
  };
  if (
    userInfo != null &&
    userInfo.constructor === Object &&
    Object.keys(userInfo).length == 2
  ) {
    for (var key in userInfo) {
      if (userInfo[key] === "") {
        Message.error("请输入用户名或密码");
        return;
      } else {
        //这里使用上面验证用户名时候存储的登录名信息来判断哪个是密码  哪个是用户名
        loginInfo.org_user_id =
          userInfo[key] === userId ? userInfo[key] : loginInfo.org_user_id;
        loginInfo.user_passwd =
          userInfo[key] != userId ? userInfo[key] : loginInfo.user_passwd;
      }
    }
    const params = Object.assign({}, CommData, loginInfo);
    return new Promise((resolve, reject) => {
      store
        .dispatch("UserLoginInAction", params)
        .then(res => {
          if (res) {
            CommData.org_user_id = loginInfo.org_user_id;
            CommData.org_dept_id = res.bl_dept_id;
            CommData.org_term_no = res.term_no;
            CommData.orguser_cn_name = res.user_cn_name;
            CommData.orgdept_cn_name = res.dept_cn_name;
            CommData.token = res.token;
            setSessionStorage("CommData", JSON.stringify(CommData));
            store.commit("SET_COMMDATA", JSON.stringify(CommData));
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  } else {
    Message.error("请输入用户名或密码");
  }
};

/**
 *  获取平台当前登录用户对应的菜单权限列表
 * @param {平台编号} rs_code
 */
const getMenuByUser = rs_code => {
  // 获取平台编码
  let rscode = { bl_rs_code: rs_code };
  return new Promise((resolve, reject) => {
    store
      .dispatch("QueryRsPrivAction", rscode)
      .then(res => {
        if (res && res.level_menu_list) {
          let MenuList = res.level_menu_list;
          console.log("菜单信息", MenuList);
          let Res_MenuList = dispostMenuList(MenuList);
          if (Res_MenuList) {
            // 缓存菜单列表
            setSessionStorage("MenuList", JSON.stringify(Res_MenuList));
            store.commit("SET_MENULIST", JSON.stringify(Res_MenuList));
            resolve(true);
          } else {
            resolve(false);
          }
        }
      })
      .catch(err => {
        Message.error(err);
        reject(err);
      });
  });
};

/**
 * 处理返回的菜单中对应的图片地址
 * @param {传入要处理的菜单列表} menulist
 */
const dispostMenuList = menulist => {
  if (menulist.length > 0) {
    menulist.forEach(item => {
      // 判断菜单信息里是否携带图片名称信息 如果携带  就去动态加载系统里对应的图片地址 否则为空
      // s_active 选中状态图标
      // us_active 未选中状态图标
      if (item.rsim_url && item.rsim_url != null) {
        // 判断是否为iconfont字体图标
        if (item.rsim_url.indexOf("|") != -1) {
          item.rsim_url = ` iconfont ${item.rsim_url.substring(
            0,
            item.rsim_url.indexOf("|")
          )}`;
        } else if (item.rsim_url.indexOf("*") != -1) {
          item.rsim_url = item.rsim_url.substring(
            0,
            item.rsim_url.indexOf("*")
          );
          item.rsim_url = require(`../../assets/images/menuimg/${item.rsim_url}`);
        } else {
          try {
            item.s_active = require(`@/assets/images/menuimg/s_${item.rsim_url}`);
            item.us_active = require(`@/assets/images/menuimg/us_${item.rsim_url}`);
          } catch (err) {
            item.s_active = item.rsim_url;
            item.us_active = item.rsim_url;
          }
        }
      } else {
        item.s_active = "";
        item.us_active = "";
      }
      // 判断是否存在二级菜单列表  如果存在  就递归处理
      if (item.meun_bean_list && item.meun_bean_list.length > 0) {
        dispostMenuList(item.meun_bean_list);
      }
      // 判断是否存在三级菜单列表  如果存在  就递归处理
      if (item.tabs && item.tabs.length > 0) {
        dispostMenuList(item.tabs);
      }
    });
  }
  return menulist;
};

// 外部调用登录方法 使用async await  执行登录操作和获取用户菜单操作  同时满足时候  返回成功
const userLogin = async function(userInfo, rscode) {
  let loginRs = "";
  let menuRs = "";
  if (rscode != "") {
    loginRs = await loginFn(userInfo);
    menuRs = await getMenuByUser(rscode);
    if (loginRs && menuRs) {
      return true;
    } else {
      return false;
    }
  } else {
    loginRs = await loginFn(userInfo);
    if (loginRs) {
      return true;
    } else {
      return false;
    }
  }
};

export {
  checkUserById,
  userLogin,
  getMenuByUser // 这里导出 免登陆使用
};
