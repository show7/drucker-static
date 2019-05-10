<template>
  <div class="login-container">
    <el-container>
      <el-header height="80">
        <HeaderTop></HeaderTop>
      </el-header>
      <el-main>
        <div id="qr_code"></div>
        <p class="loginTip">微信扫一扫，登录圈外</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import apiDataFilter from '../../libraries/apiDataFilter';
import headerTop from '../common/headerTop/headerTop'
export default {
  name: 'login',
  components: { 'HeaderTop': headerTop },
  data () {
    return {

    }
  },
  methods: {
    auth () {
      let param = {
        callbackUrl: this.$route.query.callbackUrl ? encodeURI(this.$route.query.callbackUrl)
          : `https://${window.location.host}/fragment/rise`,
        serviceId: this.$route.query.serviceId
      }
      apiDataFilter.request({
        apiPath: 'common.auth',
        data: param,
        successCallback: (res) => {
          let param = Object.assign({}, res.msg, { id: 'qr_code' })
          window.obj = new WxLogin(param)
        }
      })
    }
  },
  mounted () {

  },
  created () {
    this.auth();
  }
}
</script>

<style scoped lang='less'>
@import "login.less";
</style>
