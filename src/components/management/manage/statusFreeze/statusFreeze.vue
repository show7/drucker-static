<template>
  <div class="status-freeze-container">
    <h3>冻结项目</h3>
    <div class="status-freeze-content">
      <el-row>
        <el-col :span="12">
          <h4>请输入学号（换行隔开）</h4>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入学号"
            v-model="memberIds">
          </el-input>
        </el-col>
        <el-col :span="6">
          <h4>请选择需要冻结的课程</h4>
          <el-select v-model="memberTypeId" placeholder="请选择课程">
            <el-option
              v-for="item in memberTypeIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleCheck">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "statusFreeze",
    data() {
      return {
        memberTypeId:null,
        memberTypeIdList:[],
        memberIds:''
      }
    },
    methods:{
      loadRiseMember () {
        apiDataFilter.request({
          apiPath: 'manage.addVip.loadRiseMember',
          successCallback: (res)=> {
            this.memberTypeIdList = res.msg
          }
        })
      },
      handleCheck(){
        if(!this.memberTypeId){
          this.$message.error('请选择课程');
          return
        }if(!this.memberIds){
          this.$message.error('请填写学号');
          return
        }
        this.handleSubmit()
      },
      handleSubmit(){
        let memberIdsList = this.memberIds.split('\n');
        let param = {memberIds:memberIdsList,memberTypeId:this.memberTypeId};
        apiDataFilter.request({
          apiPath:'manage.statusFreeze.freeze',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('提交成功')
          }
        })
      }
    },
    created(){
      this.loadRiseMember();
    }
  }
</script>

<style scoped lang='less'>
  @import "statusFreeze.less";
</style>
