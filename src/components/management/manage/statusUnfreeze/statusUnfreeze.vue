<template>
  <div class="status-unfreeze-container">
    <h3>解冻学籍</h3>
    <div class="status-unfreeze-content">
      <el-row>
        <el-col :span="8">
          <h4>请输入学号（换行隔开）</h4>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入学号"
            v-model="memberIds">
          </el-input>
        </el-col>
        <el-col :span="8">
          <h4>请选择需要解冻的课程</h4>
          <el-select v-model="memberTypeId" placeholder="请选择课程">
            <el-option
              v-for="item in memberTypeIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <h4>请选择班级</h4>
          <el-select v-model="classNameId" placeholder="请选择课程">
            <el-option
              v-for="item in classNameList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <h4>请选择开课时间</h4>
          <el-date-picker
            v-model="openDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开课时间">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <h4>请填写组号</h4>
          <el-input v-model="groupId" placeholder="请输入组号"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="handleCheck">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";
  export default {
    name: "statusUnfreeze",
    data(){
      return{
        memberTypeId:null,
        memberTypeIdList:[],
        memberIds:'',
        classNameList:[],
        classNameId:'',
        groupIdsList:[],
        openDate:'',
        groupId:''
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
      loadcClassname(){
        apiDataFilter.request({
          apiPath:'manage.statusUnfreeze.classname',
          successCallback:(res)=>{
             this.classNameList = res.msg.className;
             this.groupIdsList = res.msg.groupIds;
          }
        })
      },
      handleCheck(){
        if (!this.memberTypeId) {
          this.$message.error('请填写学号')
          return;
        }else if (!this.memberIds) {
          this.$message.error('请选择项目id')
          return;
        }else if (!this.classNameId) {
          this.$message.error('请选择班级号')
          return;
        }else if (!this.openDate) {
          this.$message.error('请选择开课时间')
          return;
        }
        this.submitUnfreeze();
      },
      submitUnfreeze(){
        let memberIdsList = this.memberIds.split('\n');
        let param = {
          memberIds:memberIdsList,
          memberTypeId: this.memberTypeId,
          className:this.classNameId,
          openDate:this.openDate,
          groupId: this.groupId,
        }
        apiDataFilter.request({
          apiPath:'manage.statusUnfreeze.unfreeze',
          data:param,
          method:'post',
          successCallback:(res)=>{
            this.$message.success('解冻完成')
          }
        })
      }
    },
    created(){
      this.loadRiseMember();
      this.loadcClassname();
    }
  }
</script>

<style scoped lang='less'>
  @import "statusUnfreeze.less";
</style>
