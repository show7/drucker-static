<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import apiDataFilter from "./libraries/apiDataFilter";

export default {
  name: 'App',
  methods:{
    getCustomer(){
      window.ENV ={

      }
      apiDataFilter.request({
        apiPath:'common.info',
        successCallback:(res)=>{
          window.ENV.userName = res.msg.nickname;
          window.ENV.headImgUrl = res.msg.headimgurl;
          window.ENV.riseId = res.msg.riseId;
          window.ENV.isAsst = res.msg.isAsst;
          window.ENV.roleNames = res.msg.roleNames;
          window.ENV.classGroupMaps = res.msg.classGroupMaps;
        }
      })
    }
  },
  created(){
    this.getCustomer();
  }
}
</script>

<style lang="less">
  @import "./style/app.less" ;
</style>
