<template>
    <div class="exercise-choice-container">
      <h3>选择题管理</h3>
      <div class="exercise-choice-top">
        <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程" @change="handleChangeCourse">
          <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="exercise-choice-content">
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
            prop="questionString"
            label="题目">
            <template slot-scope="scope">
              <div class="question-box">
                <p class="content">{{scope.row.questionString}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="chapter"
            label="章">
          </el-table-column>
          <el-table-column
            prop="section"
            label="小节">
          </el-table-column>

          <el-table-column width="150" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
            <el-col :span="12">
              <div class="question">
                <h4>题干</h4>
                <Editor id="oneEditor"
                        ref="oneEditor"
                        @change="oneEditorChange"></Editor>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="analysis">
                <h4>解析</h4>
                <Editor id="twoEditor"
                        ref="twoEditor"
                        @change="twoEditorChange"></Editor>
              </div>
            </el-col>
          </el-row>
          <h4>添加选择题选项（若该选项为正确选项，勾选左侧按钮）</h4>
          <div class="choice-box" v-for="(item,index) in addChoiceItem" :key="item.sequence">
            <el-checkbox  v-model="item.isRight"></el-checkbox>
            <el-input v-model="item.subject" placeholder="请输入内容"></el-input>
          </div>
          <el-row>
            <el-col :span="12" v-if="title=='新增'">
              <el-button type="primary" @click="handleAddQuestion">增加选项</el-button>
              <el-button type="primary" @click="handleDelQuestion">删除选项</el-button>
            </el-col>
          </el-row>
         <!-- <p>{{addChoiceItem}}</p>-->
          <div class="extra-option">
            <h4>录入额外信息</h4>
            <el-row>
              <el-col :span="12">
                <p>选择题目类型</p>
                <el-radio v-model="singleSelect" label="1">单选</el-radio>
                <el-radio v-model="singleSelect" label="2">多选</el-radio>
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
</template>

<script>
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  import {removeHtmlTags} from '../../../../libraries/commonMethod'
  import Editor from '../../../common/editor/editor'

  export default {
    name: "exerciseChoice",
    components: {Editor},
    data() {
      return {
        courseTitleList:[],
        searchCourseTitleValueId:null,
        title:'新增',
        dialogVisible:false,
        choiceList:[],//选择题列表
        addChoiceItem:[{sequence:1,isRight:false,subject:''}],
        singleSelect:'1',//是否单选，
        difficulty:'1',
        example:'0',
        sequence:'',//顺序
        knowledgesList:[],//知识点list
        knowledgeId:'',//知识点id
        disabledFlag:false,
        exerciseId:'',//题目id
      }
    },
    methods: {
      /*获取选择题列表*/
      getExerciseChoice(){
        let param = [ this.searchCourseTitleValueId];
        ApiDataFilter.request({
          apiPath:'course.exerciseChoice.all',
          pathParams:param,
          successCallback:(res)=>{
            let result = res.msg || [];
            result.forEach((item,index)=>{
              result[index]['questionString'] = removeHtmlTags(item.question)
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
      /*提交校验数据*/
      handleCheckData(){
        if (!this.analysis || !this.question || !this.knowledgeId || !this.sequence){
          this.$message.error('请填写完整');
          return
        }
        let list = this.addChoiceItem.filter((item,index)=>{
          if (!item.subject){
            return item
          }
        });
        if (list.length > 0){
          this.$message.error('请完善选择题内容');
          return
        }
       this.sendAddedData();
      },
      /*发送数据*/
      sendAddedData(){
        let param = {analysis:this.analysis,choices:this.addChoiceItem,difficulty:parseInt(this.difficulty),sequence:parseInt(this.sequence),
          type:this.singleSelect, question:this.question,problemId:this.searchCourseTitleValueId,knowledgeId:this.knowledgeId};
        this.exerciseId ? Object.assign(param,{warmUpId:this.exerciseId}):'';
        ApiDataFilter.request({
          apiPath:'course.exerciseChoice.submit',
          method:'post',
          data:param,
          successCallback:()=>{
            this.$message.success('提交成功');
            this.getExerciseChoice();
            this.dialogVisible = false;
          }
        })
      },
      /*新增*/
      handleAddNew(){
          this.dialogVisible = true;
          this.title = '新增';
          this.sequence = '';
          setTimeout(() => {
            this.$refs.oneEditor.editor.setValue('')
          }, 200);
          setTimeout(() => {
            this.$refs.twoEditor.editor.setValue('')
          }, 200);
          this.addChoiceItem = [{sequence: 1, isRight:false, subject: ''}];
          this.singleSelect = '1';
          this.difficulty = '1';
          this.knowledgeId = '';
          this.disabledFlag = false;
          this.exerciseId = '';
      },
      handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.conformDelete(row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      conformDelete(id){
        ApiDataFilter.request({
          apiPath:'course.exerciseChoice.delete',
          pathParams:[id],
          successCallback:()=>{
            this.$message.success('删除成功');
            this.getExerciseChoice();
          }
        })
      },
      /*编辑*/
      handleEdit(index,row){
        this.dialogVisible = true;
        this.title='编辑';
        this.sequence = row.sequence;
        setTimeout(() => { this.$refs.oneEditor.editor.setValue(row.question) }, 200);
        setTimeout(() => { this.$refs.twoEditor.editor.setValue(row.analysis) }, 200);
        this.singleSelect = row.type.toString();
        this.difficulty = row.difficulty.toString();
        this.knowledgeId = row.knowledgeId;
        this.disabledFlag = true;
        this.addChoiceItem = row.choiceList;
        this.exerciseId = row.id;
      },
      /*增加选择题*/
      handleAddQuestion(){
        let index = this.addChoiceItem.length +1;
        this.addChoiceItem.push({sequence:index,isRight:false,question:''})
      },
      /*删除选择题*/
      handleDelQuestion(){
        let lengthNum = this.addChoiceItem.length;
        if (lengthNum != 1) {
          this.addChoiceItem.splice(lengthNum - 1, 1)
        }
      },
      /*题干*/
      oneEditorChange(val){
        this.question = val;
      },
      /*分析*/
      twoEditorChange(val){
        this.analysis = val;
      },
      /*标题的选择*/
      handleChangeCourse(){
          console.log(this.searchCourseTitleValueId);
          this.courseTitleList.forEach((item,index)=>{
            if (item.id == this.searchCourseTitleValueId){
              this.knowledgesList = item.knowledges;
              this.knowledgeId = '';
            }
          });
          this.getExerciseChoice();
      },
    },
    created() {
      /*this.getData();*/
      this.getKnowledges();
    }
  }
</script>

<style scoped lang='less'>
  @import "exerciseChoice.less";
</style>
