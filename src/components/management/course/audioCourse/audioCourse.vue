<template>
  <div class="audio-course-container">
    <h3>音频课管理</h3>
   <div class="audio-course-top">

   </div>
   <div class="audio-course-content">
     <div class="add-box">
       <!--<el-button type="primary" @click="handleAddNew">新增</el-button>-->
     </div>
     <!--table列表-->
     <el-table
       :data="courseList"
       style="width: 100%">
       <el-table-column type="index" label="序号" width="150">序号</el-table-column>
       <el-table-column prop="name" label="标题" width="200"></el-table-column>
       <el-table-column prop="url" width="400" label="语音">
         <template slot-scope="scope">
           <div class="audio-box">
             <audio class="audio" controls :src="scope.row.url">
               您的浏览器不支持 audio 元素。
             </audio>
           </div>
         </template>
       </el-table-column>
       <el-table-column prop="wordsString" label="描述">
         <template slot-scope="scope">
           <div class="question-box">
             <p class="content">{{scope.row.wordsString}}</p>
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
    <!--弹框-->
    <el-dialog
      :title="popName"
      :visible="centerDialogVisible"
      :show-close="false"
      width="50%"
      center>
      <div class="editor-audio">
        <p class="audio-name">音频名称：
          <el-input
            placeholder="请输入音频名称"
            v-model="audioName"
            clearable>
          </el-input>
        </p>
        <!--富文本-->
        <Editor id="threeEditor"
                ref="threeEditor"
                @change="changeAudio"></Editor>
        <!--音频选择-->
        <div class="chose-audio">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="actionRrl"
            :limit="1"
            :on-change="handleChange"
            :on-remove="handleAudioRemove"
            :before-upload="beforeAvatarUpload"
            :on-success = "handleAudioSuccess"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传m4a/mp3文件</div>
          </el-upload>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="centerDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="submitUpload">提 交</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";
  import {removeHtmlTags} from '@/libraries/commonMethod'
  import editor from '../../../common/editor/editor'

  export default {
    name: "audioCourse",
    components: {Editor:editor},
    data(){
      return{
        courseList:[],
        centerDialogVisible: false,
        popName:'',
        audioName:'',
        audioWords:'',
        actionRrl: '', //语音上传的url
        fileList: [], //选取的语音
        promotionActivityId:'',
        id:'',
        audioId:'',
      }
    },
    methods:{
      getList(){
        apiDataFilter.request({
          apiPath:'course.audio.loadAll',
          successCallback:(res)=>{
            this.courseList = this.handleChangeData(res.msg);
          }
        })
      },
      /* 处理语音list文案*/
      handleChangeData (tableData) {
        if (tableData.length === 0) return
        tableData.map((item, index) => {
          tableData[index].wordsString = removeHtmlTags(item.words)
        });
        return tableData
      },
      handleAddNew(){
        this.centerDialogVisible = true;
        this.fileList = [];
        this.popName = '上传语音';
        this.audioName = '';
        this.audioId = 0;
        setTimeout(() => { this.$refs.threeEditor.editor.setValue('') }, 200)
      },
      handleEdit(index,row){
        this.popName = '编辑语音';
        this.centerDialogVisible = true;
        this.audioName = row.name;
        this.audioId = row.id;
        this.fileAudioUrl = row.url;
        this.promotionActivityId = row.promotionActivityId;
        setTimeout(() => { this.$refs.threeEditor.editor.setValue(row.words) }, 200)
        this.fileList = [];
        let rowL = {
          name: row.name,
          url: row.url
        };
        this.fileList[0] = rowL;
      },
      /*语音文本描述*/
      changeAudio (val) {
        this.audioWords = val
      },
      /*语音上传成功*/
      handleAudioSuccess (response, file, fileList) {
        this.handleSendAudio(response.msg)
      },
      handleAudioRemove (file, fileList) {
        console.log(file, fileList);
      },
      /*判断音频格式*/
      beforeAvatarUpload (file) {
        const isM4AMP3 = (file.type === 'audio/x-m4a' || file.type === 'audio/mp3');
        if (!isM4AMP3) {
          this.$message.error('上传音频只能是 m4a或mp3 格式!');
        }
        return isM4AMP3
      },
      /*获取语音原始信息*/
      handleChange (file, fileList) {
        this.fileList = fileList;
        this.actionRrl = `/pc/upload/audio/ftp?prefix=${file.name}`
      },
      /*语音编辑和上传*/
      submitUpload () {
        if (this.popName === '上传语音') {
          if (this.fileList.length > 0) {
            if (this.audioName && this.audioWords) {
              this.$refs.upload.submit();
            } else {
              this.$message.error('请完善信息');
            }
          } else {
            this.$message.error('请选择语音');
          }
        } else {
          if (this.fileList[0].url !== this.fileAudioUrl) {
            if (this.audioName && this.audioWords) {
              this.$refs.upload.submit();
            } else {
              this.$message.error('请完善信息');
            }
          } else {
            if (this.audioName && this.audioWords) {
              this.handleSendAudio('')
            } else {
              this.$message.error('请完善信息');
            }
          }
        }
      },
      /*发送添加和编辑的语音*/
      handleSendAudio (ftpFileName) {
        let dataBody = {
          audioId: this.audioId,
          ftpFileName: ftpFileName,
          name: this.audioName,
          words: this.audioWords,
          promotionActivityId:this.promotionActivityId,
          id:this.id
        };
        apiDataFilter.request({
          apiPath: 'course.audio.save',
          method: 'post',
          data: dataBody,
          successCallback: (res)=> {
            this.centerDialogVisible = false;
            this.getList();
            this.$message.success('发送成功');
          }
        })
      },
    },
    created(){
       this.getList();
    }
  }
</script>

<style scoped lang='less'>
    @import "audioCourse.less";
</style>
