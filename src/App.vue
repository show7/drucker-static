<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import apiDataFilter from "./libraries/apiDataFilter";

export default {
  name: 'App',
  methods:{},
  created(){

  }
}
</script>

<style lang="less">
  @import "./style/app.less" ;
</style>
