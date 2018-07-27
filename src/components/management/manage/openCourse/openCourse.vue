<template>
  <div class="open-course">
    <h3>新开/解锁课程</h3>
    <div class="course-top">
      <el-row>
        <el-col :span="6">
          <el-select v-model="problemId" placeholder="请选择小课">
            <el-option
              v-for="item in courseTitleList"
              :key="item.id"
              :label="item.abbreviation"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-checkbox v-model="sendWelcomeMsg">是否发送模板消息</el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="startDate"
            type="date"
            default-value
            placeholder="选择课程开始时间">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入圈外Id,多人换行书写"
            v-model="riseIds">
          </el-input>
        </el-col>
      </el-row>
      <el-button type="primary" @click="sendData">提交</el-button>
    </div>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'

  export default {
    name: "openCourse",
    data(){
      return{
        problemId:null,//
        sendWelcomeMsg:false, //是否发送模板消息
        startDate:'',//课程开始时间
        riseIds:'', //
        courseTitleList:[]
      }
    },
    methods:{
      sendData(){
        let self = this;
        if (!this.problemId || !this.riseIds) {
          this.$message.info('请补充完整数据再提交');
          return
        }
        let param={riseIds:this.riseIds.split('\n'), problemId:this.problemId, startDate:this.startDate, sendWelcomeMsg:this.sendWelcomeMsg}
        ApiDataFilter.request({
          apiPath:"manage.openCourse.openCourseByriseIds",
          method:'post',
          data:param,
          successCallback(res){
            self.$message.success('提交成功')
          }
        })
      },
    /* 获取小课名称列表*/
      getList(){
       let self =this;
        ApiDataFilter.request({
          apiPath: 'common.simple',
          successCallback (res) {
            self.courseTitleList = res.msg
          }
        });
      }
    },
    created(){
      this.getList()
    }
  }
</script>

<style scoped lang="less">
  @import "./openCourse.less";
</style>
