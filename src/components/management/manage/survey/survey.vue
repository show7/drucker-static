<template>
 <div class="survey">
  <h3>问卷链接设置</h3>
   <div class="survey-top">
    <p>问卷设置前提：请在问卷星，为问卷设置"数据推送API"，其值为: https://www.iquanwai.com/pc/survey/wjx/submit</p>
     <el-button type="primary" @click="handleNewEdit">新增</el-button>
   </div>
   <div class="survey-content">
     <el-table
       :data="surveyList"
       style="width: 100%">
       <el-table-column
         type="index"
         width="150"
         label="序号">
         序号
       </el-table-column>
       <el-table-column
         prop="name"
         label="问卷名">
       </el-table-column>
       <el-table-column
         prop="activity"
         label="问卷id">
       </el-table-column>
       <el-table-column width="200" fixed="right" label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
   <el-dialog
     title="问卷信息："
     :show-close="false"
     :visible.sync="dialogVisible"
     width="30%">
     <div class="layout-box">
         <h4>问卷Id</h4>
         <el-input placeholder="请输入问卷Id" v-model="activityId" clearable></el-input>
         <h4>问卷名</h4>
         <el-input placeholder="请输入问卷名" v-model="name" clearable></el-input>
         <h4>问卷星链接</h4>
         <el-input placeholder="请输入问卷星链接" v-model="realHref" clearable></el-input>
     </div>
     <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sendData">确 定</el-button>
  </span>
   </el-dialog>
 </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
export default {
  name: 'survey',
  data () {
    return {
      surveyList: [],
      dialogVisible: false,
      activityId: '', //问卷Id
      name: '', //问卷名
      realHref: ''//问卷星链接
    }
  },
  methods: {
    getSurveyList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.survey.surveyList',
        successCallback (res) {
          self.surveyList = res.msg;
        }
      })
    },
    /*新增*/
    handleNewEdit () {
      this.dialogVisible = true;
      this.activityId = '';
      this.name = '';
      this.realHref = '';
    },
    /*编辑数据*/
    handleEdit ($index, rowData) {
      this.dialogVisible = true;
      this.activityId = rowData.activity;
      this.name = rowData.name;
      this.realHref = rowData.realHref
    },
    /*发送数据*/
    sendData () {
      let self = this;
      if (!this.activityId) {
        this.$message.error('请填写问卷Id')
        return
      } if (!this.realHref) {
        this.$message.error('请问卷星链接')
        return
      }
      let param = {activity: this.activityId, name: this.name, realHref: this.realHref}
      ApiDataFilter.request({
        apiPath: 'manage.survey.surveyConfig',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功');
          self.getSurveyList();
          self.dialogVisible = false
        }
      })
    }
  },
  created () {
    this.getSurveyList()
  }
}
</script>

<style scoped lang="less">
 @import "survey.less";
</style>
