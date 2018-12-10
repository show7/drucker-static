<template>
  <div class="coin-container">
    <h3>礼金管理</h3>
    <div class="coin-top">
      <el-row>
        <el-col :span="6">
          <div class="grid-content ">
            输入riseId(换行隔开):
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="riseIds">
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            礼金明细:
            <el-input
              placeholder="请输入内容"
              v-model="coinDesc">
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            金额:
            <el-input
              placeholder="请输入内容"
              v-model="coin">
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <el-button type="primary" @click="submit">提交</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "coin",
    data() {
      return {
        riseIds: '',
        coinDesc: '',
        coin: ''
      }
    },
    methods: {
      submit() {
        if (!this.riseIds || !this.coinDesc || !this.coin) {
          this.$message.error('请填写完整信息');
          return
        }
        let param = {riseIds: this.riseIds.split('\n'), comment: this.coinDesc, coin: this.coin};
        apiDataFilter.request({
          apiPath: 'manage.coin.rppoint',
          data: param,
          method: 'post',
          successCallback: () => {
            this.$message.success('提交成功');
            this.riseIds = '';
            this.coinDesc = '';
            this.coin = '';
          }
        })
      }
    },
  }
</script>

<style scoped lang='less'>
  @import "coin.less";
</style>
