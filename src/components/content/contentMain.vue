
<template>
    <div class="content-main">
      <div class="header">
        <el-menu :default-active="activeIndex"
                 active-text-color="#7DBE00"
                 class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
          <el-menu-item  v-for="(item, index) in itemList" :index="item.path" :key="index" >{{item.name}}</el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'contentMain',
  data () {
    return {
      itemList: [{name: '课程相关', path: '/content/project'}, {name: '项目2', path: '/content/projectTwo'}],
      activeIndex: '/content/project'
    }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes () {
      return this.$route.path
    }
  },
  updated () { //路径及按键操作时调用
    /*this.updateForcus();*/
  },

  mounted () { //载入时调用，F5刷新会起效
    this.updateForcus();
  },
  created () {

  },
  beforeUpdate () {
    this.updateForcus();
  },
  methods: {
    updateForcus () {
      let path = this.$route.path;
      let pathArray = path.split('/');
      if (pathArray[1] === 'content') {
        console.log(this.itemList[0].path)
      }
      /* this.activeIndex = this.$route.matched[1].path*/
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="less" scoped>
  @import "contentMain.less";
</style>
