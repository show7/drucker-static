<template>
 <div class="course-thinking-container">
   <h3>课前思考</h3>
   <div class="thinking-top">
     <el-row>
       <el-col :span="12">
         <h4>课程</h4>
         <el-select v-model="searchCourseTitleValueId" placeholder="请选择小课标题" @change="handleChangeSelect">
           <el-option
             v-for="item in courseTitleList"
             :key="item.id"
             :label="item.abbreviation"
             :value="item.id">
           </el-option>
         </el-select>
       </el-col>
       <el-col :span="12">

       </el-col>
     </el-row>
   </div>
   <div class="add-box">
        <el-button type="primary" @click="handleNewAdd">新增</el-button>
   </div>
   <div class="thinking-content">
     <el-table
       :data="courseList"
       style="width: 100%">
       <el-table-column
         type="index"
         label="序号"
         width="180">
         序号
       </el-table-column>
       <el-table-column
         prop="abbreviation"
         label="课程"
         width="180">
       </el-table-column>
       <el-table-column
         prop="chapter"
         label="章节">
       </el-table-column>
       <el-table-column
         prop="section"
         label="小节">
       </el-table-column>
       <el-table-column
         prop="descriptionString"
         width="500"
         label="课前思考内容">
         <template slot-scope="scope">
           <div class="content-box">
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
   </div>
   <!--新增和编辑-->
   <el-dialog
     :title="title"
     :show-close="false"
     :close-on-click-modal="false"
     :visible.sync="dialogVisible"
     width="40%">
     <div class="popOut-box">
       <el-row>
         <el-col :span="12">
           <h4>课程</h4>
           <el-select v-model="courseTitleValueId" :disabled="disabledFlag" placeholder="请选择小课标题">
             <el-option
               v-for="item in courseTitleList"
               :key="item.id"
               :label="item.abbreviation"
               :value="item.id">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="12">
           <h4>章节</h4>
           <el-select v-model="chapter" :disabled="disabledFlag" placeholder="请选择">
             <el-option
               v-for="item in List"
               :key="item"
               :label="item"
               :value="item">
             </el-option>
           </el-select>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="12">
           <h4>小节</h4>
           <el-select v-model="section" :disabled="disabledFlag" placeholder="请选择">
             <el-option
               v-for="item in List"
               :key="item"
               :label="item"
               :value="item">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="12">
           <h4>语音</h4>
           <el-upload
             class="upload-demo"
             ref="upload"
             :action="actionRrl"
             :limit="1"
             :on-change="handleChange"
             :on-remove="handleAudioRemove"
             :before-upload="beforeAvatarUpload"
             :on-success = "handleAudioSuccess"
             :on-exceed = "handleExceed"
             :file-list="fileList"
             :auto-upload="false">
             <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
             <div slot="tip" class="el-upload__tip">只能上传m4a/mp3文件</div>
           </el-upload>
         </el-col>
       </el-row>
       <h3>课前思考内容</h3>
       <Editor id="oneEditor"
               ref="oneEditor"
               @change="oneEditorChange"></Editor>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="handleSubmit">确 定</el-button>
     </span>
   </el-dialog>
 </div>
</template>

<script>
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  import Editor from '../../../common/editor/editor'
  import _ from 'lodash'
  import { Loading } from 'element-ui';
export default {
  name: 'courseThinking',
  components: {Editor},
  data () {
    return {
      className:'',
      title:'新增',
      dialogVisible:false,
      actionRrl: '', //语音上传的url
      fileList: [], //选取的语音
      courseTitleList:[],//课程名称列表
      courseTitleValueId:'',//选取的课程id
      searchCourseTitleValueId:'',//课程id
      List : [1, 2, 3, 4, 5, 6, 7, 8, 9],
      chapter:'',//章节
      section:'',//小节
      editorValue:'',//文本
      courseList:[],
      audioId:0,
      loadingInstance:null,
      fileAudioUrl:'',
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
          self.getList(self.courseTitleList[0].id);
          self.searchCourseTitleValueId = self.courseTitleList[0].id
        }
      });
    },
    handleChangeSelect(){
      this.getList(this.searchCourseTitleValueId)
    },
    getList(problemId){
      let self = this;
      ApiDataFilter.request({
        apiPath: 'course.courseThinking.load',
        pathParams:[problemId],
        successCallback (res) {
          self.courseList = res.msg || [];
          if (self.courseList.length > 0) {
            self.courseList.forEach((item,index)=>{
              self.courseList[index]['descriptionString'] = self.removeHtmlTags(item.description)
            })
          }
        }
      });
    },
    /*上传语音返回Id*/
    handleSendAdio(name){
      let self = this;
      let param = {audioId:this.audioId,ftpFileName:name,name:'',words:'',referenceId:this.searchCourseTitleValueId};
      ApiDataFilter.request({
        apiPath:'course.courseThinking.audioDb',
        method:'post',
        data:param,
        successCallback(res){
          self.audioId = res.msg;
          self.handleSend(self.audioId)
        }
      })
    },
    /*提交*/
    handleSend(audioId){
      let self =this;
      let courseTitleValueId =  this.courseTitleValueId;
      let param = {chapter: this.chapter, section: this.section, description:this.editorValue};
      audioId ? Object.assign(param,{audioId:audioId}):'';
      ApiDataFilter.request({
        apiPath:'course.courseThinking.update',
        method:'post',
        pathParams:[courseTitleValueId],
        data:param,
        successCallback(res){
          self.loadingInstance.close();
          self.$message.success('提交成功');
          self.dialogVisible = false;
          if (self.title === '编辑'){
            self.getList(self.searchCourseTitleValueId)
          }
        },
        errorCallback(res){
          self.fileList = [];
          self.loadingInstance.close();
          self.$message.error(res.msg);
          self.dialogVisible = false;
        }
      })
    },
    /*点击提交*/
    handleSubmit(){
      if (!this.chapter || !this.section || !this.courseTitleValueId || !this.editorValue) {
        this.$message.error('请完善信息')
      }else {
        this.loadingInstance =  Loading.service();
        if (this.fileList.length > 0 && this.fileAudioUrl != this.fileList[0].url){
          this.$refs.upload.submit();
        } else {
          this.handleSend('')
        }
      }
    },
    /*新增*/
    handleNewAdd(){
      this.dialogVisible = true;
      this.fileList=[];
      this.chapter = '';
      this.section = '';
      this.title = '新增';
      this.disabledFlag = false;
      this.courseTitleValueId = '';
      setTimeout(() => { this.$refs.oneEditor.editor.setValue('') }, 200)
    },
    /*语音上传成功*/
    handleAudioSuccess (response, file, fileList) {
      this.handleSendAdio(response.msg)
    },
    /*获取语音原始信息*/
    handleChange (file, fileList) {
      console.log(fileList)
      this.fileList = fileList;
      this.actionRrl = `/pc/upload/audio/ftp?prefix=${file.name}`
    },
    /*判断音频格式*/
    beforeAvatarUpload (file) {
      const isM4AMP3 = (file.type === 'audio/x-m4a' || file.type === 'audio/mp3');
      if (!isM4AMP3) {
        this.$message.error('上传音频只能是 m4a或mp3 格式!');
      }
      return isM4AMP3
    },
    handleAudioRemove (file, fileList) {
      console.log(file, fileList);
    },
    /*超出文件上传的限制*/
    handleExceed(files, fileList){
      /*console.log(files)*/
     /* console.log(fileList)*/
      this.$message.info('请先删除当前音频');
    },
    /*文本编辑*/
    oneEditorChange(val){
      this.editorValue = val
    },
    /*编辑语音弹框*/
    handleEdit (index, row) {
      this.dialogVisible = true;
      this.title = '编辑';
      this.chapter = row.chapter;
      this.section = row.section;
      this.courseTitleValueId= this.searchCourseTitleValueId;
      this.disabledFlag = true;
      this.fileAudioUrl = row.audioUrl;
      setTimeout(() => { this.$refs.oneEditor.editor.setValue(row.description) }, 200)
      this.fileList = [];
      let rowL = null;
      if (row.audioUrl) {
        rowL = {
          name: row.abbreviation,
          url: row.audioUrl
        };
        this.fileList[0] = rowL;
      }

    },
    removeHtmlTags (str) {
      let newStr = _.trim(str)
      // 去除 html 标签
      newStr = newStr.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '')
      newStr = newStr.replace(/<\/?[^>]*>/g, '')
      // 去除实体字符
      newStr = newStr.replace(/&[^;]+;/g, '')
      return newStr
    },
  },
  created () {
     this.getData();
  }
}
</script>

<style scoped lang='less'>
 @import "courseThinking.less";
</style>
