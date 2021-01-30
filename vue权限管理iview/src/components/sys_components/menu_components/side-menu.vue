<template>
  <div class="side-menu-wrapper">
    <vue-scroll :ops="ops">
      <div class="contentbox">
        <Menu class="MenuList" width="auto" :accordion="true" @on-select="handleSelect">
          <slot name="titleLogo"></slot>
          <template v-for="item in menuList">
            <re-submenu v-if="item.children" :key="`menu_${item.id}`" :name="item.id" :parent="item"></re-submenu>
          </template>
        </Menu>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import VueScroll from 'vuescroll'
import ReSubmenu from "./re-submenu.vue";
export default {
  name: "side_menu",
  data() {
    return {
      // activeName: this.$route.path,
      ops: {
        rail: {
          opacity: '0.2',
          background: undefined,
          size: '5px'
        },
        bar: {
          background: '#cecece',
          keepShow: false,
          size: '10px',
          minSize: 0.2
        },
        scrollButton: {
          enable: true,
          background: '#cecece'
        },
        scrollPanel: {
          easing: 'easeInQuad',
          speed: 500
        },
        vuescroll: {
          wheelScrollDuration: 0,
          wheelDirectionReverse: false
        }
      },
    };
  },
  watch: {
    $route() {
      // this.activeName = this.$route.path;
    }
  },
  components: { ReSubmenu, VueScroll },
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSelect(name) {
      console.log(name)
      this.$router.push(name.trim());
    }
  },
};
</script>

<style lang="less" scoped>
.side-menu-wrapper {
  height: 100%;
  .contentbox {
    height: 100%;
    overflow-y: auto;
    padding: 0 5px;
    // background: linear-gradient(#070d1d, #0c232a);
    background: rgba(255, 255, 255, 0.000001);
    .MenuList {
      height: 100%;
      background: rgba(255, 255, 255, 0.000001);
    }
  }
}
/deep/.ivu-menu-vertical.ivu-menu-light:after {
  width: 0;
}
/deep/.ivu-menu {
  color: #6e7d97;
  font-size: 16px;
}
/deep/.ivu-menu-item {
  font-size: 16px;
}
/deep/.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: rgb(213, 223, 241);
  background: linear-gradient(to right, #0a1f33, #091627);
  z-index: 2;
}
</style>
