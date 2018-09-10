<template>
  <div class="course-knowledge-container">
    <h3>小课知识导入</h3>
    <div class="course-knowledge-top">
      <el-row>
        <el-col :span="12">
          <h4>课程</h4>
          <el-select v-model="searchCourseTitleValueId" placeholder="请选择小课标题" @change="getList">
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
    <div class="course-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAddNew">新增</el-button>
      </div>
      <!--表格-->
      <el-table
        :data="courseList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
          序号
        </el-table-column>
        <el-table-column
          prop="problemName"
          label="课程">
        </el-table-column>
        <el-table-column
          prop="chapterName"
          label="章节">
        </el-table-column>
        <el-table-column
          prop="sectionName"
          label="小节">
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
    <!--新增和编辑-->
    <el-dialog
      :title="title"
      :show-close="false"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="popOut-box">
        <el-row>
          <el-col :span="12">
            <p>章节</p>
            <el-select v-model="chapterId" placeholder="请选择章节" :disabled="disabledFlag" @change="handleChangeChapter">
              <el-option
                v-for="item in chapterInfos"
                :key="item.chapter"
                :label="item.chapter"
                :value="item.chapter">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <p>章节名称</p>
            <el-input v-model="chapterName" placeholder="请输入章名"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>小节</p>
            <el-select v-model="sectionsId" placeholder="请选择小节" :disabled="disabledFlag" >
              <el-option
                v-for="item in sections"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <p>小节名称</p>
            <el-input v-model="sectionName" placeholder="请输入节名"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p>小提示</p>
            <el-input v-model="learningTips" placeholder="请输入提示"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="pic-box">
              <span>总结图片</span>
              <el-upload
                class="avatar-uploader-box"
                action="/pc/upload/file"
                :show-file-list="false"
                :on-success="handleAvatarPicSuccess"
                :before-upload="beforeAvatarPicUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <p class="tip-des" v-if="title=='新增'" > *请先增加知识点才能增加语音*</p>
          </el-col>
          <el-col :span="12">
            <div class="button-box">
              <el-button type="primary" @click="handleCheckSubmit">提交知识点</el-button>
              <el-button type="primary" :disabled="disabledButtonAud" @click="handleAddAudio">增加语音</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table
          :data="mediaVOs"
          style="width: 100%">
          <el-table-column
            prop="audioName"
            label="语音名称">
          </el-table-column>
          <el-table-column
            prop="audioWordsString"
            label='语音描述'>
            <template slot-scope="scope">
              <div class="question-box">
                <p class="content">{{scope.row.audioWordsString}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="audioUrl"
            label='音频'>
            <template slot-scope="scope">
              <div class="audio-box">
                <audio class="audio" controls :src="scope.row.audioUrl">
                  您的浏览器不支持 audio 元素。
                </audio>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="videoFileId"
            label='视频'>
          </el-table-column>
          <el-table-column width="100" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEditAudio(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
         <!--内部语音维护编辑弹框-->
        <el-dialog
          width="40%"
          :title="titleMedia"
          :visible.sync="innerVisible"
          :close-on-click-modal="false"
          append-to-body>
          <div class="editor-audio">
            <el-row>
              <el-col :span="12">
                <p class="audio-name">音频名称</p>
                <el-input placeholder="请输入音频名称" v-model="audioName" clearable></el-input>
              </el-col>
              <el-col :span="12">
                <p class="audio-name">视频Id </p>
                <el-input placeholder="请输入视频FileId" v-model="videoFileId" clearable></el-input>
              </el-col>
            </el-row>
            <!--富文本-->
            <Editor id="oneEditor"
                    ref="oneEditor"
                    @change="changeAudio"></Editor>
            <!--音频和封面选择-->
            <div class="sudio-poster">
              <el-row>
                <el-col :span="12">
                  <div class="chose-audio">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="actionRrl"
                      :limit="1"
                      :on-change="handleChange"
                      :before-upload="beforeAvatarUpload"
                      :on-success="handleAudioSuccess"
                      :file-list="fileList"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传m4a/mp3文件</div>
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
              </el-row>
            </div>

          </div>
          <span slot="footer" class="dialog-footer">
             <el-button @click="innerVisible = false">取 消</el-button>
             <el-button type="primary" @click="submitUpload">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
       <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
       <el-button type="primary" @click="handleComplet">关 闭</el-button>
     </span>
    </el-dialog>
  </div>
</template>

<script>
  import Editor from '../../../common/editor/editor'
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  import {removeHtmlTags} from '../../../../libraries/commonMethod'
  import { Loading } from 'element-ui';

export default {
  name: 'courseKnowledge',
  components: {Editor},
  data () {
    return {
      courseTitleList:[],//课程名称列表
      courseTitleValueId:'',//选取的课程id
      searchCourseTitleValueId:'',//课程id
      courseList:[],//课程list
      title:'新增',
      titleMedia:'新增语音',//
      List: [{chapter: 1, sections: [1, 2, 3, 4, 5,6,7,8,9]}, {chapter: 2, sections: [1, 2, 3, 4, 5,6,7,8,9]},
        {chapter: 3, sections: [1, 2, 3, 4, 5,6,7,8,9]}, {chapter: 4, sections: [1, 2, 3, 4, 5,6,7,8,9]},
        {chapter: 5, sections: [1, 2, 3, 4, 5,6,7,8,9]},{chapter: 6, sections: [1, 2, 3, 4, 5,6,7,8,9]},
        {chapter: 7, sections: [1, 2, 3, 4, 5,6,7,8,9]},{chapter: 8, sections: [1, 2, 3, 4, 5,6,7,8,9]},{chapter: 9, sections: [1, 2, 3, 4, 5,6,7,8,9]}],
      dialogVisible:false,
      innerVisible:false,//
      knowledgeId:'',//课程id
      actionRrl: '', //语音上传的url
      fileList: [], //选取的语音
      chapterName:'',//章名
      sectionName:'',//节名
      learningTips:'',//小提示
      mediaVOs:[],//语音list
      chapterInfos:[],//章节list
      chapterId:'',//章名
      sections:[],//节list
      sectionsId:'',//节id
      disabledFlag:false,
      disabledButtonAud:true,
      audioName:'',//语音名称
      audioWords:'',//语音描述
      videoFileId:'',//视频id
      audioId:'',//语音id
      videoId:'',//
      mediaId:[],//媒体id（语音和视频）
      imageUrl:'',//图片url
      loadingInstance:null,//加载动画
    }
  },
  methods: {
    //获取小课名称列表
    getData () {
      ApiDataFilter.request({
        apiPath: 'common.simple',
        successCallback :(res)=> {
          this.courseTitleList = res.msg;
          this.searchCourseTitleValueId = this.courseTitleList[0].id;
          this.getList();
        }
      });
    },
    /*获取list*/
    getList(){
      let param = {problemId:this.searchCourseTitleValueId};
      ApiDataFilter.request({
        apiPath:'course.knowledge.list',
        data:param,
        successCallback:(res)=>{
          let result = res.msg;
          this.courseList = result.knowledgeVOs;
          this.chapterInfos = result.chapterInfos;
        }
      })
    },
    /*完成编辑*/
    handleComplet(){
      this.dialogVisible = false;
      this.getList();
    },
    /*章的选择*/
    handleChangeChapter(val){
      this.chapterInfos.forEach((item)=>{
        if (val == item.chapter) {
          this.sections = item.sections;
          this.sectionsId = ''
        }
      })
    },
    /*编辑知识点*/
    handleEdit(index,row){
      this.dialogVisible = true;
      this.title = '编辑';
      this.knowledgeId = row.knowledgeId;
      this.disabledButtonAud = row.knowledgeId ? false:true;
      this.chapterName = row.chapterName;
      this.sectionName = row.sectionName;
      this.learningTips = row.learningTips;
      this.chapterId = row.chapter;
      this.imageUrl = row.picUrl;
      this.disabledFlag= true;
      this.handleChangeChapter(row.chapter);
      this.sectionsId = row.section;
      this.mediaVOs = row.mediaVOs || [];
      this.mediaVOs.forEach((item,index)=>{
        this.mediaVOs[index]['audioWordsString']= removeHtmlTags(item.audioWords);
      })
    },
    /*新增知识点和语音*/
    handleAddNew(){
      this.dialogVisible = true;
      this.title='新增';
      this.disabledFlag =false;
      this.knowledgeId = '';
      this.chapterId ='';
      this.sectionsId = '';
      this.chapterInfos = this.List;
      this.sections = [];
      this.chapterName = '';
      this.sectionName = '';
      this.learningTips ='';
      this.mediaVOs = [];
      this.disabledButtonAud = true;
      this.imageUrl = '';
    },
    /*添加语音*/
    handleAddAudio(){
      this.titleMedia = '新增语音';
      this.innerVisible = true;
      this.audioName = '';
      setTimeout(() => {this.$refs.oneEditor.editor.setValue('');},200);
      this.videoFileId ='';
      this.fileList = [];
      this.audioId = '';
      this.videoId = '';
      this.mediaResourceId = '';
    },
    /*语音编辑和上传*/
    submitUpload () {
      if (this.titleMedia === '新增语音') {
        if (this.fileList.length > 0) {   // 判断有没有上传语音
          if (this.audioName && this.audioWords) {
            this.loadingInstance = Loading.service();
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
            this.loadingInstance = Loading.service();
            this.$refs.upload.submit();
          } else {
            this.$message.error('请完善信息');
          }
        } else {
          if (this.audioName && this.audioWords) {
            this.handleSendMedia('')
          } else {
            this.$message.error('请完善信息');
          }
        }
      }
    },
    /*提交音频*/
    handleSendMedia(ftpFileName){
      let param = {audioName: this.audioName, audioWords: this.audioWords, fileId: this.videoFileId};
      this.videoFileId ? Object.assign(param, {
        fileId: this.videoFileId,
        videoName: this.audioName,
        videoWords: this.audioWords,
      }) : '';
      ftpFileName ? Object.assign(param, {ftpFileName: ftpFileName}) : '';
      this.audioId ? Object.assign(param, {audioId: this.audioId}) : '';
      this.videoId ? Object.assign(param, {videoId: this.videoId}) : '';
      ApiDataFilter.request({
        apiPath: 'course.knowledge.media',
        method: 'post',
        data: param,
        successCallback: (res) => {
          this.mediaId = res.msg || [];
          this.handleConcat();
        }
      })
    },
    /*绑定音视频*/
    handleConcat(){
      let param = {knowledgeId:this.knowledgeId,audioId:this.mediaId[0]};
      this.mediaId.length > 0 ? Object.assign(param,{videoId:this.mediaId[1]}):'';
      this.mediaResourceId ? Object.assign(param,{mediaResourceId:this.mediaResourceId}):'';
      ApiDataFilter.request({
        apiPath:'course.knowledge.submitMedia',
        method:'post',
        data:param,
        successCallback:(res)=>{
          this.$message.success('成功添加语音');
          this.innerVisible= false;
          this.mediaVOs = res.msg;
          this.mediaVOs.forEach((item,index)=>{
            this.mediaVOs[index]['audioWordsString']= removeHtmlTags(item.audioWords);
          })
        }
      })
    },
    /*检测知识点数据*/
    handleCheckSubmit(){
      if (!this.chapterId){
        this.$message.error('请选择章')
        return
      }
      if (!this.sectionsId){
        this.$message.error('请选择节')
        return
      }
      if (!this.chapterName){
        this.$message.error('请填写章名')
        return
      }
      if (!this.sectionName){
        this.$message.error('请填写节名')
        return
      }
      this.handleSubmitMedia();
    },
    /*新增及修改知识点*/
    handleSubmitMedia(){
       let  param  = {chapter:this.chapterId,section:this.sectionsId,problemId:this.searchCourseTitleValueId,
       chapterName:this.chapterName,sectionName:this.sectionName,picUrl:this.imageUrl,learningTips:this.learningTips};
       this.knowledgeId ? Object.assign(param,{knowledgeId:this.knowledgeId}):'';
       ApiDataFilter.request({
         apiPath:'course.knowledge.submit',
         method:'post',
         data:param,
         successCallback:(res)=>{
           this.$message.success('知识点提交成功');
           this.disabledButtonAud = false;
           this.disabledFlag = true;
           this.knowledgeId = res.msg;
         }
       })
    },
    /*编辑语音*/
    handleEditAudio(index,row){
      this.titleMedia = '编辑语音';
      this.innerVisible = true;
      this.audioName = row.audioName;
      setTimeout(() => {this.$refs.oneEditor.editor.setValue(row.audioWords);},200);
      this.videoFileId = row.videoFileId;
      this.fileAudioUrl = row.audioUrl;
      this.fileList = [];
      let rowL = {
        name: row.audioName,
        url: row.audioUrl
      };
      this.fileList[0] = rowL;
      this.videoPicUrl = row.videoPicUrl;
      this.mediaResourceId = row.mediaResourceId;
      this.audioId = row.audioId;
      this.videoId = row.videoId;
    },
    /*获取语音原始信息*/
    handleChange (file, fileList) {
      this.fileList = fileList;
      this.actionRrl = `/pc/upload/audio/ftp?prefix=${file.name}`
    },
    /*语音上传成功*/
    handleAudioSuccess (response, file, fileList) {
      this.loadingInstance.close();
      this.handleSendMedia(response.msg)
    },
    /*语音文案*/
    changeAudio(val){
      this.audioWords= val;
    },
    /*判断音频格式*/
    beforeAvatarUpload (file) {
      console.log(file.type);
      const isM4AMP3 = (file.type === 'audio/x-m4a' || file.type === 'audio/mp3');
      if (!isM4AMP3) {
        this.$message.error('上传音频只能是 m4a或mp3 格式!');
        this.loadingInstance.close();
      }
      return isM4AMP3
    },
    /*图片上传成功*/
    handleAvatarPicSuccess(res, file) {
      this.imageUrl = res.msg
      /*   this.imageUrl = URL.createObjectURL(file.raw);*/
    },
    beforeAvatarPicUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG / png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang='less'>
  @import "courseKnowledge.less";
</style>
