
<template>
    <div class="project-main">
      <el-menu :default-active="onRoutes" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item  v-for="(item, index) in itemList" :index="item.path" :key="index">{{item.name}}</el-menu-item>
      </el-menu>
      <router-view/>
    </div>
</template>

<script>
  export default {
    name: "project-main",
    data() {
      return {
        itemList:[{name:"项目1",path:"/project"},{name:"项目2",path:"/project/projectTwo"}],
        activeIndex: "0"
      }
    },
    computed: {
      // 首次进入页面时展开当前页面所属的菜单
      onRoutes(){
        return this.$route.path
        }
      },
    updated() {//路径及按键操作时调用
      this.updateForcus();
    },

    mounted() {//载入时调用，F5刷新会起效
      this.updateForcus();
    },
    created(){

    },
    methods: {
      updateForcus() {
        let path = this.$route.path;


      },
      handleSelect(key,keyPath){
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "projectMain.less";
</style>
