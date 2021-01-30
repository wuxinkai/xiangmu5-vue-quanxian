<template>
  <Submenu :name="parent.id">
    <template slot="title" v-if="parent.children">
      <Icon v-if="parent.path" :custom="parent.path" />
      {{parent.authName}}
    </template>
    <div v-if="parent.children">
      <template v-for="item in parent.children" >
        <re-submenu v-if="item.children" :key="`menu_${item.id}`" :name="item.frame" :parent="item">
        </re-submenu>
        <menu-item v-else :key="`menu_${item.id}`" :name="`${item.path}`">
          {{item.authName}}
        </menu-item>
      </template>
    </div>
  </Submenu>
</template>

<script>
export default {
  name: 'ReSubmenu',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less">
</style>
