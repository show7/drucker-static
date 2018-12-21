<template>
    <div class="project-one">

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
          <el-menu-item index="/management/course/courseintroduce">小课导入</el-menu-item>
          <el-menu-item index="/management/course/coursethinking">课前思考导入</el-menu-item>
          <el-menu-item index="/management/course/courseknowledge">小课知识导入</el-menu-item>
          <el-menu-item index="/management/course/exercisechoice">选择题管理</el-menu-item>
          <el-menu-item index="/management/course/exerciseapplication">应用题管理</el-menu-item>
          <el-menu-item index="/management/course/courseextended">拓展学习</el-menu-item>
          <el-menu-item index="/management/course/knowledgecard">知识卡片管理</el-menu-item>
          <el-menu-item index="/management/course/audiocourse">音频课管理</el-menu-item>
          <el-menu-item index="/management/course/richtext">文章上传</el-menu-item>
          <el-menu-item index="/management/course/fileupload">文件上传</el-menu-item>
          <el-submenu index="1">
            <template slot="title">助教管理</template>
            <el-menu-item index="/management/course/assiststandard">助教测评标准</el-menu-item>
            <el-menu-item index="/management/course/assistexecution">助教完成情况</el-menu-item>
            <el-menu-item index="/management/course/assistupgrade">助教升降级</el-menu-item>
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
  name: 'project-one',
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
