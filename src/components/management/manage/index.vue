<template>
  <div class="manage">
    <div class="left-table">
      <el-menu :default-active="onRoutes"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#7DBE00"
               router>
        <el-menu-item index="/management/manage/userinfo">用户信息</el-menu-item>
        <el-submenu index="2">
          <template slot="title">发送消息</template>
          <el-menu-item index="/management/manage/customermessage">客服消息</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">证书管理</template>
          <el-menu-item index="/management/manage/certificate">添加证书</el-menu-item>
          <el-menu-item index="/management/manage/certificatesend">证书发送</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">服务号管理</template>
          <el-menu-item index="/management/manage/autoreply">服务号自动回复</el-menu-item>
          <el-menu-item index="/management/manage/subscribe">服务号关注回复</el-menu-item>
          <el-menu-item index="/management/manage/picsource">微信图片素材</el-menu-item>
          <el-menu-item index="/management/manage/wechatmenu">公众号菜单管理</el-menu-item>
          <el-menu-item index="/management/manage/articlesend">文章定向发送</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">课程项目管理</template>
          <el-menu-item index="/management/manage/classScheduling">体验课排期</el-menu-item>
          <el-menu-item index="/management/manage/classSort">体验课排班</el-menu-item>
          <el-menu-item index="/management/manage/classadviser">项目添加班主任</el-menu-item>
          <el-menu-item index="/management/manage/classGroup">入群二维码管理</el-menu-item>
          <el-menu-item index="/management/manage/classadvisermanage">班主任管理</el-menu-item>
          <el-menu-item index="/management/manage/projectopen">项目开课时间</el-menu-item>

        </el-submenu>

        <el-submenu index="7">
          <template slot="title">学籍管理</template>
          <el-menu-item index="/management/manage/statuschange">修改学籍</el-menu-item>
          <el-menu-item index="/management/manage/statusfreeze">冻结学籍</el-menu-item>
          <el-menu-item index="/management/manage/statusunfreeze">解冻学籍</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">首页资源管理</template>
          <el-menu-item index="/management/manage/banner">首页 Banner 编辑</el-menu-item>
          <el-menu-item index="/management/manage/lives">直播内容编辑</el-menu-item>
          <el-menu-item index="/management/manage/activities">线下活动编辑</el-menu-item>
          <el-menu-item index="/management/manage/articles">圈圈文章编辑</el-menu-item>
        </el-submenu>
        <el-menu-item index="/management/manage/application">商学院申请审批</el-menu-item>
        <el-menu-item index="/management/manage/qrcode">推广二维码</el-menu-item>
        <el-menu-item index="/management/manage/survey">问卷链接设置</el-menu-item>
        <el-menu-item index="/management/manage/changewechat">交换微信号</el-menu-item>
        <el-menu-item index="/management/manage/task">任务宝后台</el-menu-item>
        <el-menu-item index="/management/manage/classgrouping">班级分组</el-menu-item>
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
  name: 'manage',
  data () {
    return {
      transitionName: 'slide-left'
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

<style scoped lang="less">
@import "index.less";
</style>
