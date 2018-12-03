<template>
  <div class="login-container">
    <el-container>
      <el-header height="80">
        <HeaderTop></HeaderTop>
      </el-header>
      <el-main>
        <div class="qrContainer">
          <img class="qrImg" :src='imgSrc.serverCode'/>
          <p class="loginTip">仅开放给正在训练或已完成该主题的圈柚，请先专心完成自己的训练 ：）<br/>未开始任何训练？扫码关注</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import apiDataFilter from "../../libraries/apiDataFilter";
  import headerTop from '../common/headerTop/headerTop'
  export default {
    name: "servercode",
    components:{'HeaderTop':headerTop},
    data(){
      return {
        imgSrc:{
          serverCode:"https://static.iqycamp.com/images/serverQrCode.jpg",
          subscribeCode:"https://static.iqycamp.com/images/subscribeCode.jpg",
          edit:"https://static.iqycamp.com/images/pcEdit.png",
          reply:"https://static.iqycamp.com/images/reply.png",
          delete:"https://static.iqycamp.com/images/delete.png",
          requestComment:"https://static.iqycamp.com/images/requestComment.png",
          requestCommentDisable:"https://static.iqycamp.com/images/requestCommentDisable.png",
          voteWhite:"https://static.iqycamp.com/images/pcVoteWhite.png",
          voted:"https://static.iqycamp.com/images/pcVoted.png",
          disVote:"https://static.iqycamp.com/images/pcDisVote.png",
          curNav:"https://static.iqycamp.com/images/curNav.png",
          logo:"https://static.iqycamp.com/images/logo.png",
          backList:"https://static.iqycamp.com/images/backList.png",
          notFound:"https://static.iqycamp.com/images/404.png",
          navRunning:"https://static.iqycamp.com/image/pcNavRunning.png",
          navRunningChoice:"https://static.iqycamp.com/images/pcNavRunningChoice.png",
          navDone:"https://static.iqycamp.com/images/pcNavDone.png",
          navDoneChoice:"https://static.iqycamp.com/images/pcNavDoneChoice.png",
          navLock:"https://static.iqycamp.com/images/pcNavLock.png",
          navLockChoice:"https://static.iqycamp.com/images/pcNavLockChoice.png",
          catalogStar:"https://static.iqycamp.com/images/pcCatalogStar.png",
          catalogLatest:"https://static.iqycamp.com/images/pcCatalogLastest.png",
          catalogGoal:"https://static.iqycamp.com/images/pcCatalogGoal.png",
          catalogApp:"https://static.iqycamp.com/images/pcCatalogApp.png",
          perfect:"https://static.iqycamp.com/images/pcPerfect.png",
          configAdd:"https://static.iqycamp.com/images/add.png",
          configRemove:"https://static.iqycamp.com/images/minus.png",
          configEdit:"https://static.iqycamp.com/images/edit.png",
          configComplete:"https://static.iqycamp.com/images/ok.png",
        }
      }
    }
  }
</script>

<style scoped lang='less'>
    @import "servercode.less";
</style>
