import store from "@/store";
import { setSessionStorage } from "./common";
import { Message } from "iview";
const Base64 = require("js-base64").Base64;
import router from "../../router";

// agent免登陆 处理登录cookie
const LoginMessage = pageName => {
  window.addEventListener("message", function(event) {
    if (event.data != undefined) {
      let CommData = new Object();
      let data = Base64.decode(event.data); // console.log(data)
      data = JSON.parse(data);
      CommData.org_user_id = data.org_user_id;
      CommData.org_dept_id = data.org_dept_id;
      CommData.org_term_no = data.org_term_no;
      CommData.orguser_cn_name = data.orguser_cn_name;
      CommData.orgdept_cn_name = data.orgdept_cn_name;
      CommData.org_channel_code = data.org_channel_code;
      CommData.org_rs_code = data.org_rs_code;
      CommData.org_work_code = data.org_work_code;
      CommData.submit_type = data.submit_type;
      CommData.token = data.token;
      // 浏览器存储登录信息
      setSessionStorage("CommData", JSON.stringify(CommData));
      store.commit("SET_COMMDATA", JSON.stringify(CommData));
      // 路由跳转
      router.push({ name: pageName });
    } else {
      Message.error("登录跳转失败！");
    }
  });
};

export default LoginMessage;
