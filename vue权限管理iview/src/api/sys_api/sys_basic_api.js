import $http from "../index";

export default {
  /*
   *  us_ViewUsforAppActioncheckUserId //验证用户名
   *  参数：data:{org_user_id: ""}
   */
  us_ViewUsforAppActioncheckUserId: data => {
    return $http.request({
      url: "/us_ViewUsforAppActioncheckUserId.do",
      method: "post",
      data: data
    });
  },
  /*
   *  us_UserLoginInAction //登陆服务
   *  参数：data:{org_user_id: "",user_passwd: "",}
   */
  us_UserLoginInAction: data => {
    return $http.request({
      url: "/us_UserLoginInAction.do",
      method: "post",
      data: data
    });
  },
  /*
   *  us_UserLoginInAction //用户权限页面资源
   *  参数：data:{org_rs_code:"08"} org_rs_code平台资源编码   根据项目平台自行修改
   */
  us_QueryRsPrivAction: data => {
    return $http.request({
      url: "/us_QueryRsPrivAction.do",
      method: "post",
      data: data
    });
  },
  //用户功能操作权限 （暂无用）
  rs_QueryRsOptPrivAction: data => {
    return $http.request({
      url: "/rs_QueryRsOptPrivAction.do",
      method: "post",
      data: data
    });
  }
};
