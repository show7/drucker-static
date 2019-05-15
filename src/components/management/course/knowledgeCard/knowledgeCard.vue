<template>
  <div class="knowledge-card-container">
    <h3>知识卡管理</h3>
    <div class="knowledge-card-top">
      <el-row>
        <el-col :span="12">
          <h4>课程</h4>
          <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程标题" @change="handleChangeSelect">
            <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="knowledge-card-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAddNew">新增</el-button>
      </div>
      <!--table列表-->
      <el-table
        :data="cardList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
          序号
        </el-table-column>
        <el-table-column
          prop="essenceTitle"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="essenceContent"
          label="内容">
          <template slot-scope="scope">
            <div class="question-box">
              <p class="content">{{scope.row.essenceContent}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="chapterId"
          label="章">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签">
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
              <h4>标题</h4>
              <el-input class="essence-title" v-model="essenceTitle"   placeholder="请输入标题"></el-input>
            </el-col>
            <el-col :span="12">
              <h4>章</h4>
                <el-select v-model="chapterId" placeholder="请选择" :disabled="disabledFlag">
                <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h4>标签</h4>
              <el-input v-model="tag"   placeholder="请输入标签"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <h4>内容编辑(以 | 换行)</h4>
              <el-input type="textarea" autosize v-model="essenceContent"   placeholder="请输入标签"></el-input>
            </el-col>
          </el-row>
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
  export default {
    name: "knowledgeCard",
    data() {
      return {
        courseTitleList:[],//课程list
        searchCourseTitleValueId:'',//id
        cardList:[],//指示卡list
        title:'新增',
        dialogVisible:false,
        essenceTitle:'',//标题
        tag:'',//标签
        essenceContent:'',//内容
        list:[1,2,3,4,5,6,7,8,9],
        disabledFlag:false,
        chapterId:'',//章
        id:'',//编辑的id
      }
    },
    methods: {
      // 获取课程名称列表
      getData () {
        ApiDataFilter.request({
          apiPath: 'common.simple',
          successCallback: (res)=> {
            this.courseTitleList = res.msg;
            this.searchCourseTitleValueId = this.courseTitleList[0].id;
            this.handleLoad()
          }
        });
      },
      /*知识卡获取*/
      handleLoad(){
        let param = {problemId: this.searchCourseTitleValueId };
        ApiDataFilter.request({
          apiPath:'course.card.load',
          data:param,
          successCallback:(res)=>{
            this.cardList = res.msg;
          }
        })
      },
      /*指示卡选择*/
      handleChangeSelect(){
          this.handleLoad();
      },
      /*新增*/
      handleAddNew(){
        this.title = '新增';
        this.dialogVisible = true;
        this.essenceTitle = '';
        this.tag = '';
        this.essenceContent = '';
        this.chapterId = '';
        this.disabledFlag = false;
        this.id = '';
      },
      /*编辑*/
      handleEdit(indes,row){
        this.title = '编辑';
        this.dialogVisible = true;
        this.essenceTitle = row.essenceTitle;
        this.tag = row.tag;
        this.essenceContent = row.essenceContent;
        this.chapterId =row.chapterId;
        this.disabledFlag = true;
        this.id = row.id;
      },
      /*提交接口*/
      handleSubmit(){
        let param = {essenceTitle:this.essenceTitle,essenceContent:this.essenceContent,
          chapterId:this.chapterId,problemId:this.searchCourseTitleValueId, tag:this.tag};
          this.id ? Object.assign(param,{id:this.id}):'';
          ApiDataFilter.request({
            apiPath:'course.card.submit',
            method:'post',
            data:param,
            successCallback:(res)=>{
              this.$message.success('提交成功');
              this.dialogVisible =false;
              this.handleLoad();
            }
          })
      },
      /*检验数据*/
      handleCheckData(){
        if (!this.essenceTitle || !this.essenceContent || !this.chapterId || !this.tag){
          this.$message.error('请完善信息');
          return
        }
        this.handleSubmit();
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang='less'>
  @import "knowledgeCard.less";
</style>
