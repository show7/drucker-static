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
        <el-menu-item index="/management/advance/refund">退款</el-menu-item>
        <el-menu-item index="/management/advance/employee">员工管理</el-menu-item>
        <el-menu-item index="/management/advance/templatemessage">模板消息</el-menu-item>
        <el-menu-item index="/management/advance/addvip">添加会员</el-menu-item>
        <el-submenu index="1">
          <template slot="title">课程管理</template>
          <el-menu-item index="/management/advance/opencourse">新开/解锁课程</el-menu-item>
          <el-menu-item index="/management/advance/importcourse">赠送课程</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">优惠券管理</template>
          <el-menu-item index="/management/advance/coupon">添加优惠券</el-menu-item>
          <el-menu-item index="/management/advance/couponclear">消除优惠券</el-menu-item>
        </el-submenu>
        <el-menu-item index="/management/advance/coin">礼金管理</el-menu-item>
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
