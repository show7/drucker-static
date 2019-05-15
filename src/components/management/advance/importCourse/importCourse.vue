<template>
  <div class="import-course">
    <h3>赠送课程</h3>
    <div class="course-top">
      <el-row>
        <el-col :span="6">
          <p>会员类型</p>
          <el-select v-model="memberTypeId" placeholder="请选择会员类型">
            <el-option
                    v-for="item in memberTypeIdList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <p>选择小课</p>
          <el-select v-model="problemId" placeholder="请选择小课">
            <el-option
              v-for="item in courseTitleList"
              :key="item.id"
              :label="item.abbreviation"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <p>课程开始时间</p>
          <el-date-picker
            v-model="startDate"
            type="date"
            default-value
            placeholder="选择项目开始月份">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <p>用户信息</p>
          <el-input
                  type="textarea"
                  :rows="10"
                  placeholder="请输入圈外Id或学号,多人换行书写"
                  v-model="riseIds">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-button type="primary" @click="sendData">提交</el-button>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'openCourse',
  data () {
    return {
      problemId: null, //
      sendWelcomeMsg: false, //是否发送模板消息
      delImprovementPlan: false, //是否是强制关闭课程
      startDate: '', //课程开始时间
      riseIds: '', //圈外id
      courseTitleList: [], //课程标题列表
      memberTypeIdList : [], //会员类型列表
      memberTypeId : 0, //会员类型
    }
  },
  methods: {
    loadRiseMember () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.addVip.loadRiseMember',
        successCallback (res) {
          self.memberTypeIdList = res.msg
        }
      })
    },
    sendData () {
      let self = this;
      if (!this.problemId || !this.riseIds || !this.memberTypeId) {
        this.$message.info('请补充完整数据再提交');
        return
      }
      let param = {riseIds: this.riseIds.split('\n'), problemId: this.problemId, startDate: this.startDate, memberTypeId: this.memberTypeId}
      ApiDataFilter.request({
        apiPath: 'manage.addCourse.addCourseByRiseIds',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功')
        }
      })
    },
    /* 获取小课名称列表*/
    getList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'common.simple',
        successCallback (res) {
          self.courseTitleList = res.msg
        }
      });
    }
  },
  created () {
    this.loadRiseMember()
    this.getList()
  }
}
</script>

<style scoped lang="less">
  @import "importCourse.less";
</style>
