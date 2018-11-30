<template>
  <div class="login-container">
    <el-container>
      <el-header height="80">
        <el-row>
          <el-col :span="7">
            <div class="grid-content logo">
              <div class="logo-img">
                <img src="https://static.iqycamp.com/71527579350_-ze3vlyrx.pic_hd.jpg"/>
                <span class="logo-name">圈外同学</span>
              </div>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content entry-list">
              <ul>
                <li  v-for="(item,index) in entryList" :key="index" @click="handleGoPage(item.link)">{{item.name}}</li>
                <li class="head-img" v-if="show">
                  <el-dropdown>
                    <div class="head-box el-dropdown-link">
                      <img class="head-pic"  src='https://static.iqycamp.com/71527579350_-ze3vlyrx.pic_hd.jpg'/> window
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="lastTime">上次学到</el-dropdown-item>
                      <el-dropdown-item @click="handleClickLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div id="qr_code"></div>
        <p class="loginTip">微信扫一扫，登录圈外</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import apiDataFilter from "../../libraries/apiDataFilter";

  export default {
    name: "login",
    data(){
      return {
        entryList:[
          {id:1,name:'首页',link:'/'},
          {id:2,name:'课程项目',link:'/courseProject.html'},
          {id:3,name:'文章',link:'/article.html'},
          {id:4,name:'线上学习',link:'/fragment/rise'},
        ],
        show: window.ENV.headImgUrl && window.ENV.userName
      }
    },
    methods:{
      auth(){
        let param = {callbackUrl: this.$route.query.callbackUrl ? encodeURI(this.$route.query.callbackUrl):`https://${window.location.host}/fragment/rise`}
        apiDataFilter.request({
          apiPath:'common.auth',
          data:param,
          successCallback:(res)=>{
            let param = Object.assign({}, res.msg, { id: 'qr_code' })
            window.obj = new WxLogin(param)
          }
        })
      },
      handleGoPage(url){
        window.location.href=url
      },
      handleClickLoginOut() {
        window.location.href = '/logout'
      },
      lastTime(){
        window.location.href='/redirect/latest/application'
      }
    },
    mounted(){

    },
    created(){
      this.auth();
    }
  }
</script>

<style scoped lang='less'>
    @import "login.less";
</style>
