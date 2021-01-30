<template>
  <div class="LoginBox">
    <div class="loginHeader">
      <div class="headerbox">
        <span class="headerlogo">
          <img src="../assets/images/loginlogo.png" alt="">
        </span>
        <span class="headername">DFrame</span>
      </div>
    </div>
    <div class="loginCentoxBox">
      <div class="loginCentox">
        <div class="centosright">
          <div class="rightheader">
            <div class="headerInfo">
              <div class="infotop">欢迎您</div>
              <div class="infobottom">登录开发者平台</div>
            </div>
            <div class="headerimg">
              <img src="../assets/images/loginrightimg.png" alt="">
            </div>
          </div>
          <div class="rightcontBox">
            <Form class="loginFormBox" ref="loginForm" :model="loginForm" :rules="ruleValidate">
              <FormItem label="" prop="username">
                <Input v-model="loginForm.username" placeholder="账号名/邮箱/手机号" @on-focus="changeimg(1)">
                <Icon :type="usericon" slot="prefix" />
                </Input>
              </FormItem>
              <FormItem label="" prop="password">
                <Input v-model="loginForm.password" placeholder="密码" type="password" @on-focus="changeimg(2)">
                <Icon :type="pawicon" slot="prefix" />
                </Input>
              </FormItem>
              <FormItem>
                <div class="wangjipwd">
                  <span class="slippw">忘记密码</span>
                </div>
              </FormItem>
              <FormItem>
                <Button long :loading="loading" @click="handleLogin('loginForm')">登录</Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="loginfooter">
      <span>Copyright © 2006-2019</span>
      <span> 远舢智能</span>
    </div>
    <div class="loginbackimg">
      <img src="../assets/images/Shape.png" alt="">
    </div>
  </div>
</template>
<script>
import { checkUserById, userLogin } from '@/utils/sys_utils/sysAction'
import { setSessionStorage } from "@/utils/common"
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { initDynamicRoutes } from '@/router/index'
export default {
  name: 'Login',
  data() {
    return {
      usericon: "ios-person-outline",
      pawicon: "ios-appstore",
      loading: false,
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      ruleValidate: {
        username: [
          { required: true, message: '请输入账号名/邮箱/手机号', trigger: 'blur' }

        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  mounted() {
    // 回车登录
    window.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        this.handleLogin("loginForm");
      }
    });
  },
  methods: {
    ...mapMutations(['setRightList', 'setUserName']),
    // 改变图标
    changeimg(id) {
      if (id === 1) {
        this.usericon = "ios-person";
      } else {
        this.pawicon = "ios-appstore-outline"
      }
    },
    //登录
    handleLogin(name) {
      let _this = this;
      _this.loading = true;
      _this.$refs.loginForm.validate(async valid => {
        if (!valid) return
        console.log(_this.loginForm)
        const { data: res } = await _this.$http.post('login', _this.loginForm)
        console.log(res)
        //发送给vuex  src\store\module\userMenu.js
        _this.setRightList(res.rights)
        _this.setUserName(res.data.username)
        setSessionStorage('token', res.data.token)

        //根据用户的权限，添加路由规则
        initDynamicRoutes()
        if (res.meta.status !== 200) return this.$Message.error('登录失败！')
        this.$Message.success('登录成功')
        this.$router.push('/')
      })
    },
  }
}
</script>
<style lang="less">
.LoginBox {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, #101a33, #1c363e);
  .loginHeader {
    height: 90px;
    width: 100%;
    padding-left: 65px;
    .headerbox {
      height: 100%;
      line-height: 90px;
      width: 100%;
      .headername {
        font-size: 30px;
        font-family: "DINBek";
        color: rgba(213, 221, 235, 1);
        margin-left: 15px;
        position: relative;
        bottom: 6px;
      }
    }
  }
  .loginCentoxBox {
    width: 100%;
    height: calc(100% - 140px);
    .loginCentox {
      height: 450px;
      width: 100%;
      // margin: 0 auto;
      transform: translateY(40%);
      display: flex;
      align-items: center;
      justify-content: center;
      .centosleft {
        float: left;
        height: 100%;
        width: 60%;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .centosright {
        // float: left;

        height: 100%;
        width: 40%;
        padding: 30px 50px;
        background-color: #ffffff;
        .rightheader {
          height: 23%;
          width: 100%;
          .headerInfo {
            float: left;
            height: 100%;
            width: 50%;
            .infotop {
              width: 100%;
              height: 60%;
              font-size: 32px;
              font-family: "PingFangSC-Regular, PingFangSC";
              font-weight: 400;
              color: rgba(26, 176, 169, 1);
            }
            .infobottom {
              width: 100%;
              height: 40%;
              font-size: 18px;
              font-family: "PingFangSC-Regular, PingFangSC";
              font-weight: 500;
              color: rgba(112, 128, 157, 1);
            }
          }
          .headerimg {
            float: left;
            height: 100%;
            width: 50%;
            text-align: right;
          }
        }
        .rightcontBox {
          height: 77%;
          width: 100%;
          padding-top: 50px;
          .loginFormBox {
            /deep/ .ivu-input {
              display: inline-block;
              width: 100%;
              height: 50px;
              line-height: 1.5;
              padding: 4px 32px;
              font-size: 14px;
              border: none;
              border-bottom: 1px solid #cad2e1;
              border-radius: 0px;
              color: #515a6e;
              background-color: #fff;
              background-image: none;
              position: relative;
              outline: none;
              cursor: text;
            }
            /deep/.ivu-input:focus {
              box-shadow: none;
              border-bottom: 1px solid #1ab0a9;
            }
            /deep/ .ivu-form-item-error .ivu-input:focus {
              box-shadow: none;
              border-bottom: 1px solid red;
            }
            /deep/ .ivu-icon-ios-person-outline:before {
              content: url("../assets/images/user.png");
            }
            /deep/ .ivu-icon-ios-person:before {
              content: url("../assets/images/user-hover.png");
            }
            /deep/ .ivu-icon-ios-appstore:before {
              content: url("../assets/images/pwd.png");
            }
            /deep/ .ivu-icon-ios-appstore-outline:before {
              content: url("../assets/images/pwd-hover.png");
            }
            /deep/ .ivu-input-prefix i {
              line-height: 50px;
            }
            .wangjipwd {
              width: 100%;
              height: 30px;
              text-align: right;
              .slippw {
                cursor: pointer;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFangSC;
                font-weight: 400;
                color: rgba(26, 176, 169, 1);
              }
            }
            /deep/.ivu-btn {
              height: 50px;
              display: inline-block;
              margin-bottom: 0;
              font-weight: 400;
              text-align: center;
              vertical-align: middle;
              touch-action: manipulation;
              cursor: pointer;
              background-image: none;
              border: 1px solid transparent;
              white-space: nowrap;
              line-height: 1.5;
              user-select: none;
              padding: 5px 15px 6px;
              font-size: 16px;
              border-radius: 4px;
              color: white;
              background-color: #01c8be;
            }
          }
        }
      }
    }
  }

  .loginfooter {
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(128, 146, 176, 1);
  }
  .loginbackimg {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>