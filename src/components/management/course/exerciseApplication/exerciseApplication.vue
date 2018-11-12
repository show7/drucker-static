<template>
  <div class="exercise-application-container">
    <h3>应用题管理</h3>
    <div class="exercise-application-top">
      <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程" @change="handleChangeCourse">
        <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="exercise-application-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAddNew">新增</el-button>
      </div>
      <!--table列表-->
      <el-table
        :data="choiceList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="150">
          序号
        </el-table-column>
        <el-table-column
          prop="topic"
          label="话题"
          width="200">
        </el-table-column>
        <el-table-column
          prop="descriptionString"
          label="描述">
          <template slot-scope="scope">
            <div class="question-box">
              <p class="content">{{scope.row.descriptionString}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="150" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增编辑弹框-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        width="60%">
        <div class="pop-out">
          <el-row>
            <el-col :span="12">
              <h4>知识点</h4>
              <el-select v-model="knowledgeId" placeholder="请选择位置" :disabled="disabledFlag" >
                <el-option v-for="(item,index) in knowledgesList" :key="index" :label="item.knowledge"
                           :value="item.id"></el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <h4>题目顺序</h4>
              <el-input v-model="sequence"  type="number" :disabled="disabledFlag" placeholder="请输入顺序"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h4>任务标题</h4>
              <el-input v-model="topic"   placeholder="请输入顺序"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="question">
                <h4>题干</h4>
                <Editor id="oneEditor"
                        ref="oneEditor"
                        :value="description"
                        @change="oneEditorChange"></Editor>
              </div>
            </el-col>
          </el-row>
          <div class="extra-option">
            <h4>录入额外信息</h4>
            <el-row>
              <el-col :span="12">
                <p>应用题类型</p>
                <el-radio v-model="type" label="11">普通应用题</el-radio>
                <el-radio v-model="type" label="13">案例作业</el-radio>
              </el-col>
              <el-col :span="12">
                <p>选择题目难易度</p>
                <el-radio v-model="difficulty" label="1">容易</el-radio>
                <el-radio v-model="difficulty" label="2">普通</el-radio>
                <el-radio v-model="difficulty" label="3">困难</el-radio>
              </el-col>
            </el-row>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCheckData">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  import {removeHtmlTags} from '../../../../libraries/commonMethod'
  import Editor from '../../../common/editor/editor'
  export default {
    name: "exerciseApplication",
    components: {Editor},
    data() {
      return {
        courseTitleList:[],
        searchCourseTitleValueId:null,
        title:'新增',
        dialogVisible:false,
        choiceList:[],//列表
        knowledgesList:[],//
        topic:'',//任务话题
        exerciseId:'',//任务id
        difficulty:'1',//难易程度
        knowledgeId:'',//知识点id
        disabledFlag:false,//
        sequence:'',//顺序
        description:'',//描述
        type:'11',//
      }
    },
    methods: {
      /*获取应用题列表*/
      getExerciseChoice(){
        let param = [ this.searchCourseTitleValueId];
        ApiDataFilter.request({
          apiPath:'course.application.homework',
          pathParams:param,
          successCallback:(res)=>{
            let result = res.msg || [];
            result.forEach((item,index)=>{
              result[index]['descriptionString'] = removeHtmlTags(item.description)
            });
            this.choiceList = result;
          }
        })
      },
      /*获取知识点*/
      getKnowledges(){
        ApiDataFilter.request({
          apiPath:'course.exerciseChoice.knowledges',
          successCallback:(res)=>{
            let result = res.msg;
            let problemList = [];
            result.forEach((item,index)=>{
              let problemItem = {knowledges:item.knowledges};
              Object.assign(problemItem,item.problem);
              problemList.push(problemItem);
            });
            this.courseTitleList = problemList;
            this.searchCourseTitleValueId = this.courseTitleList[0].id;
            this.knowledgesList = this.courseTitleList[0].knowledges;
            this.getExerciseChoice();
          }
        })
      },
      /*标题的选择*/
      handleChangeCourse(){
        this.courseTitleList.forEach((item,index)=>{
          if (item.id == this.searchCourseTitleValueId){
            this.knowledgesList = item.knowledges;
            this.knowledgeId = '';
          }
        });
        this.getExerciseChoice();
      },
      /*新增*/
      handleAddNew(){
        this.dialogVisible = true;
        this.title = '新增';
        this.sequence = '';
        this.description = '';
        this.difficulty = '1';
        this.knowledgeId = '';
        this.disabledFlag = false;
        this.exerciseId = '';
        this.topic = '';
        this.type = '11'
      },
      /*编辑*/
      handleEdit(index,row){
        this.dialogVisible = true;
        this.title='编辑';
        this.sequence = row.sequence;
        this.description = row.description;
        this.difficulty = row.difficulty.toString();
        this.knowledgeId = row.knowledgeId;
        this.disabledFlag = true;
        this.exerciseId = row.id;
        this.topic = row.topic;
        this.type = row.type.toString();
      },
      /*提交校验数据*/
      handleCheckData(){
        if (!this.description || !this.knowledgeId || !this.sequence || !this.topic){
          this.$message.error('请填写完整');
          return
        }
        this.sendAddedData();
      },
      /*发送数据*/
      sendAddedData(){
        let param = {difficulty:parseInt(this.difficulty),sequence:parseInt(this.sequence), description:this.description,
         type:parseInt(this.type),problemId:this.searchCourseTitleValueId,knowledgeId:this.knowledgeId,topic:this.topic};
        this.exerciseId ? Object.assign(param,{applicationId:this.exerciseId}):'';
        ApiDataFilter.request({
          apiPath:'course.application.submit',
          method:'post',
          data:param,
          successCallback:()=>{
            this.$message.success('提交成功');
            this.getExerciseChoice();
            this.dialogVisible = false;
          }
        })
      },
      /*文本编辑*/
      oneEditorChange(val){
        this.description = val;
      }
    },
    created() {
      this.getKnowledges()
    }
  }
</script>

<style scoped lang='less'>
  @import "exerciseApplication.less";
</style>
