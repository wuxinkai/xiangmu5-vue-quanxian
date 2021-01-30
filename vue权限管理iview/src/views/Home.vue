<template>
  <div class="home">
    <Layout class="layout-outer">
      <Sider hide-trigger class="side" :width='300'>
        <div class="menuBox">
          <!-- 自定义组件 -->
          <side-menu :menuList="getMenuList">
            <!-- 插槽 -->
            <div class="logoBox" slot="titleLogo">
              <span class="logoinfo" @click="goHome">Vue-Base</span>
            </div>
          </side-menu>
        </div>
      </Sider>
      <Layout class="conent-wrapper">
        <Header class="header-wrapper">
          <div class="userbox">
            <span class="block">
              <Input placeholder="输入你想要找的插件名称" style="width: 250px">
              <Icon type="ios-search" size="20" slot="prefix" />
              </Input>
            </span>
            <span class="block">
              <Icon class="messageinfo" size="25" type="ios-notifications-outline" />
            </span>
            <span class="blockname">{{loginUserName}}</span>
            <Dropdown trigger="hover" transfer placement="bottom">
              <div class="UserImg">
                <img src="../assets/images/userimg.png" alt="">
              </div>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="LogOut()">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content class="content-con">
          <router-view />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import { clearSessionStorage } from "@/utils/common"
import { mapGetters, mapState } from 'vuex'
import SideMenu from '_g/sys_components/menu_components'
export default {
  name: "home",
  data() {
    return {
      loginUserName: "",
      getMenuList: [], //菜单
      isCollapse: false, //是否折叠
      activePath: '',//当前被激活的路径
    }
  },
  components: { SideMenu },
  methods: {
    LogOut() {
      //情况所有数据
      clearSessionStorage();
      // 情况vuex的数据 ,刷新页面缓存没有数据请求是空的
      window.location.reload()
      // 重新登录
      this.$router.push("login");
    },
    goHome() {
      // 去首页界面
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(['getRightList', 'getUsername'])
  },
  created() {
    //初始化加载菜单
    // debugger
    this.getMenuList = this.getRightList
    this.loginUserName = this.getUsername
    // this.activePath = window.sessionStorage.getItem('activePath')
  }
};
</script>

<style lang="less">
.home,
.layout-outer {
  height: 100%;
  .side {
    height: 100%;
    .menuBox {
      height: 100vh;
      width: 100%;
      background: linear-gradient(#070d1d, #0c232a);
    }
  }
  .header-wrapper {
    background: linear-gradient(#101832, #0f1932);
    height: 80px;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    .userbox {
      width: 100%;
      height: 100%;
      padding-top: 20px;
      padding-right: 20px;
      text-align: right;
      /deep/ .ivu-select-dropdown {
        background: #121a34;
      }
      .block {
        margin-right: 30px;
        position: relative;
        top: -12px;
        .messageinfo {
          cursor: pointer;
          background-color: #14223a;
          border-radius: 15px;
        }
        /deep/.ivu-input {
          background-color: #14223a;
          border-radius: 15px;
          border: none;
          color: #3d5072;
        }
      }
      .blockname {
        position: relative;
        top: -12px;
        font-size: 16px;
        margin-right: 5px;
        font-family: DINbek-Bold, DINbek;
        font-weight: bold;
        color: rgba(128, 146, 176, 1);
      }
      .UserImg {
        height: 36px;
        width: 36px;
        border-radius: 18px;
        cursor: pointer;
      }
    }
  }
  .conent-wrapper {
    overflow: hidden;
    height: 100%;
    .content-con {
      height: 100%;
      overflow: hidden;
      padding: 10px;
      background: linear-gradient(#0f1932, #102831);
    }
  }
  .logoBox {
    height: 80px;
    width: 100%;
    line-height: 80px;
    padding-left: 40px;
    img {
      height: 35px;
      width: 35px;
      position: relative;
      top: 4px;
    }
    .logoinfo {
      cursor: pointer;
      margin-left: 20px;
      font-size: 35px;
      font-family: "DINBek";
      color: rgba(213, 221, 235, 1);
    }
  }
}
</style>