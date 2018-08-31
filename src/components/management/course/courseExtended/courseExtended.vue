<template>
  <div class="course-extended-container">
    <h3>拓展学习</h3>
    <div class="course-extended-top">
      <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程" @change="handleChangeCourse">
        <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="course-extended-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAddNew">新增</el-button>
      </div>
      <!--table列表-->
      <el-table
        :data="courseList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="150">
          序号
        </el-table-column>
        <el-table-column
          prop="problemName"
          label="课程">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
        prop="position"
        label="位置">
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

      <!--新增编辑弹框-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        width="40%">
        <div class="pop-out">
          <el-row>
            <el-col :span="4">选择安放位置</el-col>
            <el-col :span="8">
              <el-select v-model="positionId" placeholder="请选择位置" :disabled="disabledFlag" @change="handleChangePosition">
                <el-option v-for="item in positions" :key="item.positionId" :label="item.positionName"
                           :value="item.positionId"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" v-if="positionId == 10">
              <el-select v-model="chaptersId" placeholder="请选择章" :disabled="disabledFlag" @change="handleChapters">
                <el-option v-for="item in chapters" :key="item.chapter" :label="item.chapter"
                           :value="item.chapter"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6" v-if="positionId == 10">
              <el-select v-model="sectionId" :disabled="disabledFlag" placeholder="请选择节">
                <el-option v-for="item in section" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row v-if="positionId !=30">
            <el-col :span="4">顺序</el-col>
            <el-col :span="20">
              <el-input v-model="sequence" type="number" placeholder="请输入顺序"></el-input>
            </el-col>
          </el-row>
          <el-row v-if="positionId !=30">
            <el-col :span="4">标题</el-col>
            <el-col :span="20">
              <el-input v-model="titleName"  placeholder="请输入标题"></el-input>
            </el-col>
          </el-row>
          <el-row v-if="positionId !=30">
            <el-col :span="4">ICON</el-col>
            <el-col :span="20">
              <el-select v-model="iconsURL" placeholder="请选择ICON">
                <el-option v-for="item in icons" :key="item.iconUrl" :label="item.name" :value="item.iconUrl"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">是否外链</el-col>
            <el-col :span="6">
              <el-radio v-model="outRadio" label="1" @change="handleOutRadio">否</el-radio>
              <el-radio v-model="outRadio" label="2" @change="handleOutRadio" v-if="positionId !=30">是</el-radio>
            </el-col>
            <el-col :span="14" v-if="outRadio == 2">
              <el-input v-model="outLink"  placeholder="请输入外链"></el-input>
            </el-col>
          </el-row>
          <el-row v-if="outRadio == 1">
            <el-col :span="24">
              <Editor id="oneEditor"
                      ref="oneEditor"
                      @change="oneEditorChange"></Editor>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCheckSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  import Editor from '../../../common/editor/editor'
  export default {
    name: "courseExtended",
    components: {Editor},
    data() {
      return {
        courseTitleList:[],
        searchCourseTitleValueId:null,
        title:'新增',
        dialogVisible:false,
        courseList:[],
        positions:[], //安放顺序
        positionId:null,//选择的id
        chapters:[],  //章
        chaptersId:'',//章id
        section:[],  //节
        sectionId:'',//节id
        icons:[],    //图标
        iconsURL:'', //ICON值
        titleName:'',//标题
        sequence:null,//顺序
        outRadio:'1',
        outLink:'',//外链
        content:'',//文本编辑内容
        disabledFlag:false,
      }
    },
    methods: {
      // 获取小课名称列表
      getData () {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'common.simple',
          successCallback (res) {
            self.courseTitleList = res.msg;
           /* self.getLoadList(self.courseTitleList[0].id);*/
            self.searchCourseTitleValueId = self.courseTitleList[0].id;
            self.getLoadList();
          }
        });
      },
      /*获取list*/
      getLoadList(){
        let param = {problemId:this.searchCourseTitleValueId};
        ApiDataFilter.request({
          apiPath:'course.extension.load',
          data:param,
          successCallback:(res)=>{
            this.courseList = res.msg;
          }
        })
      },
      /*新增和编辑的选择内容*/
      getDetail(){
        let param = {problemId:this.searchCourseTitleValueId};
        this.title=='编辑' ? Object.assign(param,{extensionId:this.extensionId,extensionTypeId:this.extensionTypeId}):"";
        ApiDataFilter.request({
          apiPath:'course.extension.detail',
          method:'post',
          data:param,
          successCallback:(res)=>{
            let result = res.msg;
            this.positions = result.positions;
            this.chapters = result.chapters;
            this.icons = result.icons;
            this.sequence = result.sequence;
            this.titleName = result.title;
            this.positionId = result.positionId;
            this.iconsURL=result.iconUrl;
            this.chaptersId = result.chapter;
            this.sectionId = result.section;
            if (result.outLink){
              this.outRadio = '2';
              this.outLink = result.outLink
            }else {
              this.outRadio = '1';
              setTimeout(() => { this.$refs.oneEditor.editor.setValue(result.content);}, 200)
            }
          }
        })
      },
      /*位置的选择*/
      handleChangePosition(val){
        if (val != 10){

        }
      },
      /*章的选择*/
      handleChapters(val){
        if (this.chapters.length > 0){
          this.chapters.forEach((item,index)=>{
            if (item.chapter == val) {
              this.section = item.section;
            }
          })
        }
      },
      /*搜索改变课程*/
      handleChangeCourse(){
        this.getLoadList()
      },
      /*新增*/
      handleAddNew(){
        this.dialogVisible = true;
        this.title='新增';
        this.disabledFlag = false;
        this.getDetail();
      },
      /*编辑*/
      handleEdit(index,row){
        this.extensionId=row.extensionId;
        this.extensionTypeId = row.extensionTypeId;
        this.dialogVisible = true;
        this.disabledFlag = true;
        this.title='编辑';
        this.getDetail();
      },
      handleOutRadio(val){
        if (this.outRadio == '2'){
          this.outLink = '';
        }else {
          setTimeout(() => { this.$refs.oneEditor.editor.setValue('');}, 200)
        }
      },
      /*文本编辑*/
      oneEditorChange(val){
        this.content = val;
      },
      /*提交*/
      handleSubmit(){
        let param={problemId:this.searchCourseTitleValueId,type:this.positionId,
          hasOutLink:this.outRadio =='1'? false:true};
        this.title=='编辑' ? Object.assign(param,{extensionId:this.extensionId,extensionTypeId:this.extensionTypeId}):"";
        this.positionId == 10 ? Object.assign(param,{ chapter:this.chaptersId,section:this.sectionId}):"";
        this.positionId !=30  ? Object.assign(param,{ title:this.titleName,iconUrl:this.iconsURL,sequence:this.sequence}):"";
        this.outRadio == '2' ? Object.assign(param,{ outLink:this.outLink}):Object.assign(param,{ content:this.content});
        ApiDataFilter.request({
          apiPath:'course.extension.submit',
          method:'post',
          data:param,
          successCallback:(res)=>{
             this.$message.success('提交成功');
             this.dialogVisible = false;
             this.getLoadList();
          }
        })
      },
      /*数据填写的完整性*/
      handleCheckSubmit(){
        if(this.positionId == null){
          this.$message.error('请先选择安放位置信息');
          return
        }
        if (this.positionId == 10){
          if (!this.chaptersId || !this.sectionId){
            this.$message.error('请完善章节信息')
            return
          }
        } else if (this.positionId !=30) {
          if (!this.titleName || !this.iconsURL || !this.sequence) {
            this.$message.error('请填写名称和选择Icon和顺序')
            return
          }
        }
        if (this.outRadio == '2') {
          if (!this.outLink){
            this.$message.error('请填写外链')
            return
          }
        }else {
          if (!this.content){
            this.$message.error('请填写文本内容')
            return
          }
        }
        this.handleSubmit()
      },
      /*删除操作*/
      handleDelete(index,row){
        let param = {extensionId:row.extensionId,extensionTypeId:row.extensionTypeId};
        ApiDataFilter.request({
          apiPath:'course.extension.delete',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('删除成功');
            this.getLoadList();
          }
        })
      }
    },

    created() {
      this.getData();
    }
  }
</script>

<style scoped lang='less'>
  @import "courseExtended.less";
</style>
