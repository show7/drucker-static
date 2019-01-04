<template>
  <div class="article-send-container">
      <h3>文章定向发送</h3>
    <div class="article-send-top">
      公众号：
      <WeChat @getServiceId="handleGet"></WeChat>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articleSend",
    data(){
      return{

      }
    }
  }
</script>

<style scoped lang='less'>
  @import "articleSend.less";
</style>
