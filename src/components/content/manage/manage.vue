<template>
    <div class="manage">
      <div class="left-table">
        <el-menu
          :default-active="onRoutes"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#7DBE00"
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>运营管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/content/manage/userinfo">用户信息</el-menu-item>
              <el-menu-item index="/content/manage/certificate">添加证书</el-menu-item>
              <el-menu-item index="/content/manage/certificatesend">证书发送</el-menu-item>
              <el-menu-item index="/content/manage/templatemessage">模板消息</el-menu-item>
              <el-menu-item index="/content/manage/addvip">添加vip会员</el-menu-item>
              <el-menu-item index="/content/manage/opencourse">新开/解锁课程</el-menu-item>
              <el-menu-item index="/content/manage/application">申请审批</el-menu-item>
              <el-menu-item index="/content/manage/qrcode">推广二维码</el-menu-item>

            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>

      <div class="router-class">
        <router-view/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'manage',
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes () {
      return this.$route.path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }

  }
}
</script>

<style scoped lang="less">
  @import "manage.less";
</style>
