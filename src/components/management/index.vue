<template>
  <div class="content-main">
    <el-container>
      <el-header height="80">
        <el-row>
          <el-col :span="20">
            <div class="header">
              <el-menu :default-active="activeIndex"
                       active-text-color="#7DBE00"
                       class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
                <el-menu-item v-for="(item, index) in itemList" :index="item.path" :key="index">{{item.name}}
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="4" v-if="userName && headImgUrl">
            <div class="grid-content">
              <el-dropdown  @command="handleCommand">
                <div class="head-box el-dropdown-link">
                  <img class="head-pic"  :src='headImgUrl'/> {{userName}}
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" >上次学到</el-dropdown-item>
                  <el-dropdown-item command="2">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>

      </el-header>
    </el-container>
    <div class="content">
      <transition name="fade" mode="out-in">
         <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import apiDataFilter from "../../libraries/apiDataFilter";

export default {
  name: 'contentMain',
  data () {
    return {
      //{ name: '课程相关', path: '/management/course' }, { name: '运营功能相关', path: '/management/manage' }, { name: '数据运营', path: '/management/steve' }
      itemList: [ { name: '小程序', path: '/management/wechat' },
        { name: '课程相关', path: '/management/course' },
        { name: '运营功能相关', path: '/management/manage' },
        { name: '数据运营', path: '/management/steve' },
        { name: '管理员功能', path: '/management/admin' },
        { name: '高级功能', path: '/management/advance' },
        ],
      activeIndex: '/management/wechat',
      userName:'',
      headImgUrl:''
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
      console.log(path,'路径')
      let pathArray = path.split('/');
      if (pathArray[ 1 ] === 'management') {
        console.log(this.itemList[ 0 ].path)
      }
      this.activeIndex = this.$route.matched[ 1 ].path;
    },
    handleCommand(command){
       if (command == 1){
         this.lastTime();
       } else if (command == 2){
         this.handleClickLoginOut();
       }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClickLoginOut() {
      console.log('dasdasdad')
      window.location.href = '/logout'
    },
    lastTime(){
      window.location.href='/redirect/latest/application'
    },
    getCustomer(){
      apiDataFilter.request({
        apiPath:'common.info',
        successCallback:(res)=>{
          this.userName = res.msg.nickname;
          this.headImgUrl = res.msg.headimgurl;
        }
      })
    }
  },
  created(){
    this.getCustomer();
  }
}
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
