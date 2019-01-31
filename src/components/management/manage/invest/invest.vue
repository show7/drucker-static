<template>
  <div class="invest-container">
    <h3>投资圈外</h3>
    <div class="invest-top">
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
            投资圈外列表:
            <el-select v-model="investId" placeholder="请选择" @change="handleGetCoin">
              <el-option
                v-for="item in investList"
                :key="item.id"
                :label="item.taskName"
                :value="item.id">
                <span style="float: left">{{ item.taskName }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contributionPoint }}</span>
              </el-option>
            </el-select>
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
    name: "invest",
    data(){
      return{
        investList:[],
        investId:'',
        coin:'',
        riseIds:''
      }
    },
    methods:{
      loadInvest(){
        apiDataFilter.request({
          apiPath:'manage.invest.investTask',
          successCallback:(res)=>{
              this.investList= res.msg;
          }
        })
      },
      submit() {
        if (!this.riseIds || !this.investId) {
          this.$message.error('请填写完整信息');
          return
        }
        let param = {riseIds: this.riseIds.split('\n'), investTaskId: this.investId, contributionPoint: this.coin};
        apiDataFilter.request({
          apiPath: 'manage.invest.record',
          data: param,
          method: 'post',
          successCallback: () => {
            this.$message.success('提交成功');
            this.riseIds = '';
            this.investId = '';
            this.coin = '';
          }
        })
      },
      handleGetCoin(value){
      this.investList.forEach((item)=>{
         if (item.id == value){
           this.coin = item.contributionPoint
         }
      })
      }
    },
    created(){
      this.loadInvest();
    }
  }
</script>

<style scoped lang='less'>
    @import "invest.less";
</style>
