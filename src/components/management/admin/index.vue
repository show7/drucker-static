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
        <el-menu-item index="/management/admin/role">身份管理</el-menu-item>
        <el-menu-item index="/management/admin/projectconfig">项目配置</el-menu-item>
        <el-menu-item index="/management/admin/picupload">图片上传</el-menu-item>
        <el-menu-item index="/management/admin/picsource">微信图片素材</el-menu-item>
        <el-menu-item index="/management/admin/richtext">富文本上传</el-menu-item>
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
  name: 'steve',
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
