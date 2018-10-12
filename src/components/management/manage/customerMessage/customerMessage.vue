<template>
    <div class="customer-message-container">
      <h3>客服消息</h3>
      <div class="top">
        <div class="desc">
          <p>消息用途（中文）</p>
          <el-input v-model="comment" placeholder="请输入消息用途（中文）"></el-input>
        </div>
        <el-row>
          <el-col :span="12">
            <p>输入内容(如果会用到xxx这种指代用户昵称的内容请替换为{username})</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容(如果会用到xxx这种指代用户昵称的内容请替换为{username})"
              v-model="message">
            </el-input>
          </el-col>
          <el-col :span="12">
            <p>发送人员的openId（换行隔开）</p>
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入发送人员的openId（换行隔开）"
              v-model="openids">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" @click="handleCheck(true)">发送给自己</el-button>
            <el-button type="primary" @click="handleCheck(false)">发送客服消息</el-button>
          </el-col>
          <el-col :span="12">
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "customerMessage",
    data(){
      return {
        comment:'',
        message:'',//
        openids:'',//
        isMine:true,
      }
    },
    methods:{
      sendMsg(){
        let param = { message:this.message, comment:this.comment, openids:this.openids, isMine: this.isMine};
        apiDataFilter.request({
          apiPath:'manage.customerMessage.send',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message({
              type: 'success',
              message: '发送成功!'
            });
          }
        })
      },
      handleCheck(flag){
        if (flag) {
          if (!this.comment || !this.message) {
            this.$message.error('请完善信息');
            return;
          }else {
              this.isMine =  true ;
              this.sendMsg();
          }
        }else {
          if (!this.comment || !this.message || !this.openids) {
            this.$message.error('请完善信息');
            return;
          }else {
              this.isMine =  false ;
              this.conformSend();
          }
        }

      },
      conformSend() {
        this.$confirm('已经和开发人员确认客服消息内容无误？', '提示', {
          confirmButtonText: '已确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isMine =  false ;
          this.sendMsg();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发送'
          });
        });
      }
    }
  }
</script>

<style scoped lang='less'>
    @import "customerMessage.less";
</style>
