<template>

  <el-row>
    <el-col :span="7">
      <div class="grid-content logo">
        <div class="logo-img">
          <img src="https://static.iqycamp.com/71527579350_-ze3vlyrx.pic_hd.jpg" />
          <span class="logo-name">圈外同学</span>
        </div>
      </div>
    </el-col>
    <el-col :span="17">
      <div class="grid-content entry-list">
        <ul>
          <li v-for="(item,index) in entryList"
              :key="index"
              @click="handleGoPage(item.link)">{{item.name}}</li>
          <li class="head-img"
              v-if="userName && headImgUrl">
            <el-dropdown>
              <div class="head-box el-dropdown-link">
                <img class="head-pic"
                     :src='headImgUrl' /> {{userName}}
              </div>
              <el-dropdown-menu slot="dropdown">
                <!--  <el-dropdown-item @click="lastTime">上次学到</el-dropdown-item>-->
                <el-dropdown-item @click="handleClickLoginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import apiDataFilter from '../../../libraries/apiDataFilter'
import cookie from 'js-cookie'
export default {
  name: "headerTop",
  data () {
    return {
      entryList: [
        { id: 1, name: '首页', link: '/' },
        { id: 2, name: '课程项目', link: '/courseProject.html' },
        { id: 3, name: '文章', link: '/article.html' },
        { id: 4, name: '线上学习', link: '/fragment/rise' },
      ],
      userName: '',
      headImgUrl: '',
    }
  },
  methods: {
    handleGoPage (url) {
      window.location.href = url
    },
    handleClickLoginOut () {
      window.location.href = '/logout'
    },
    getCustomer () {
      apiDataFilter.request({
        apiPath: 'common.info',
        successCallback: (res) => {
          window.ENV = res.msg
          this.userName = res.msg.nickname;
          this.headImgUrl = res.msg.headimgurl;
        }
      })
    }
  },
  created () {
    let act = cookie.get('_act') || null;
    if (act) {
      this.getCustomer()
    }
  }
}
</script>

<style scoped lang='less'>
@import "headerTop.less";
</style>
