<template>
  <div class="change-weChat-container">
    <h3>交换微信号</h3>
    <div class="change-weChat-content">
      <el-row>
        <el-col :span="8">
          <h4>老的RiseId</h4>
          <el-input v-model="oldRiseId" placeholder="请输入RiseId"></el-input>
        </el-col>
        <el-col :span="8">
          <h4>新的RiseId</h4>
          <el-input v-model="newRiseId" placeholder="请输入RiseId"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="handleChange">确定切换</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "changeWeChat",
    data() {
      return {
        oldRiseId:'',
        newRiseId:''
      }
    },
    methods:{
      handleChange(){
        if (!this.oldRiseId || !this.newRiseId) {
          this.$message.error('请输入RiseId');
          return;
        }
        let param={oldRiseId:this.oldRiseId,newRiseId:this.newRiseId}
        apiDataFilter.request({
         apiPath:'manage.changeWeChat.change',
          data:param,
          method:'post',
          successCallback:(res)=>{
           this.$message.success('提交成功')
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "changeWeChat.less";
</style>
