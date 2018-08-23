<template>
  <div class="wechat">
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
            <span>管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/management/wechat/group/content">群内容管理</el-menu-item>
            <el-menu-item index="/management/wechat/admin/groups">群管理</el-menu-item>
            <el-menu-item index="/management/wechat/group/statistics">社群数据</el-menu-item>
           <!-- <el-menu-item index="/management/wechat/community/topic">话题管理</el-menu-item>-->
           <!-- <el-menu-item index="/management/wechat/admin/contentmanage">内容管理</el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>

    <div class="router-class">
      <transition name="slide-left">
        <router-view class="child-view" />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wechat',
  data () {
    return {
      itemList: ['项目1', '项目2'],
      activeIndex: '0'
    }
  },
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

<style lang="less" scoped>
  @import "index.less";
</style>
