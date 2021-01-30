<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb>
      <BreadcrumbItem to="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>用户管理</BreadcrumbItem>
      <BreadcrumbItem>用户列表</BreadcrumbItem>
    </Breadcrumb>

    <!-- 卡片视图区域 -->
    <Card>
      <Row :gutter="20">
        <Col span="8">
        <Input v-model="queryInfo.query" clearable @clear="getUserList" />
        </Col>
        <!-- 添加自定义指令 让按钮有没有权限显示出来  action = ["view", "edit", "add", "delete"]-->
        <!-- <Col span="4"> <Button type="primary" @click="addDialogVisible = true" v-permission="{action:'add', effect:'disabled'}">添加用户</Button></Col> -->
        <Col span="4"> <Button type="primary" @click="addDialogVisible = true" v-permission="{effect:'disabled'}">添加用户</Button></Col>
      </Row>
    </Card>

    <!-- 用户列表区域 -->
    <Table :columns="columns1" :data="userlist" border>
      <template slot="btn1" slot-scope="{ row,index }">
        <Button class="btn-style"  v-permission="{action:'edit'}" icon="ios-search" type="success">编辑</Button>
        <Button class="btn-style"   v-permission="{action:'add'}" icon="ios-trash" type="warning">新增</Button>
        <Button class="btn-style"  v-permission="{action:'delete'}"   icon="md-umbrella" type="error">删除</Button>
        <Button class="btn-style"  v-permission="{effect:'disabled'}"   icon="ios-alarm" >禁用</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: '姓名',
          key: 'username'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '角色',
          key: 'mobile'
        },
        {
          title: '状态',
          key: 'mg_state'
        },
        {
          title: '操作',
          slot: 'btn1',
          width:500
        }
      ],
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！')
      }
      this.userlist = res.data.users
    }
  }
}
</script>

<style lang="less" scoped>
.btn-style{
 margin-right: 6px; 
}
</style>
