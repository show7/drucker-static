<template>
  <div class="course-introduce">
    <h2>小课导入</h2>
    <el-row class="content-box">
      <el-col :span="6">
        <div class="box">
          <p>小课标题</p>
          <el-select v-model="courseTitleValue" @change="sendData(courseTitleValue)" placeholder="请选择小课标题">
            <el-option
              v-for="item in courseTitleList"
              :key="item.id"
              :label="item.abbreviation"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="box">
          <p>小课副标题</p>
          <el-input
            placeholder="请输入小课副标题"
            v-model="problem"
            clearable>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="box">
          <p>小课主类别</p>
          <el-select v-model="catalogsValue" placeholder="请选择小课主类别">
            <el-option
              v-for="item in catalogMain.catalogs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="box">
          <p>小课次级类别</p>
          <el-select v-model="subCatalogsValue" placeholder="请选择小课次级类别">
            <el-option
              v-for="item in catalogMain.subCatalogs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <!--上传语音-->
    <el-row class="content-box">
      <el-col :span="4">
        <div class="box">
          <el-button @click="handleAddAudio">添加语音</el-button>
        </div>
      </el-col>
      <el-col :span="20">
        <el-table
          :data="tableData"
          height="270"
          style="width: 100%">
          <el-table-column
            prop="name"
            width="200"
            label="语音名称">
          </el-table-column>
          <el-table-column
            prop="url"
            width="400"
            label="语音">
            <template slot-scope="scope">
              <div class="audio-box">
                <audio class="audio" controls :src="scope.row.url">
                  您的浏览器不支持 audio 元素。
                </audio>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="wordsString"
            width="300"
            label="语音描述">
          </el-table-column>
          <el-table-column width="200" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

   <!--上传图片与适用人群-->
    <el-row class="">
      <el-col :span="8">
        <el-upload
          action="/pc/upload/file"
          list-type="picture-card"
          :limit="1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
      <el-col :span="16">
        <label class="text-name">适用人群：</label>
        <el-input
          type="textarea"
          :rows="7"
          placeholder="请输入内容"
          v-model="who">
        </el-input>
      </el-col>
    </el-row>

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

    <div class="project-introduce">
      <h3>课程介绍</h3>
      <Editor id="oneEditor"
              ref="oneEditor"
              @change="change"></Editor>
    </div>
    <div class="project-introduce">
      <h3>知识体系</h3>
      <Editor id="twoEditor"
              ref="twoEditor"
              @change="change"></Editor>
    </div>
    <el-button size="medium" type="primary">更新数据</el-button>
  </div>
</template>

<script>
import Editor from '../../../../common/editor/editor'
import ApiDataFilter from '@/libraries/apiDataFilter'
import _ from 'lodash'

export default {
  name: 'courseIntroduce',
  components: {Editor},
  data () {
    return {
      courseTitleList: [], // 小课标题list
      courseTitleValue: '', // 选择小课标题之后的id
      courseChangeData: {}, // 选择小课之后的返回的数据
      catalogMain: {}, // 小课类别
      catalogsValue: '', //小课主类别value
      subCatalogsValue: '', //小课次类别value
      problem: '', // 小课缩略名
      who: '', // 适用人群
      oneEditorValue: '', //课程介绍
      twoEditorValue: '', // 知识体系
      tableData: [], // 语音list
      popName: '上传语音', // 弹框标题
      audioName: '', // 语音名称
      fileList: [], //选取的语音
      audioWords: '', // 语音文案
      uploadAudio: {}, // 上传语音信息
      ftpFileName: '', // 原始语音名称
      audioId: 0, // 需要编辑的audioId
      actionRrl: '', //语音上传的url
      fileAudioUrl: '', // 从语音list点击编辑获取的url
      outerVisible: false,
      innerVisible: false,
      centerDialogVisible: false,
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    getData () {
      let self = this;
      // 获取小课名称列表
      ApiDataFilter.request({
        apiPath: 'project.course.courseIntroduction.simple',
        method: 'get',
        successCallback (res) {
          self.courseTitleList = res.msg
        }
      });
      // 获取小课主次类别
      ApiDataFilter.request({
        apiPath: 'project.course.courseIntroduction.catalog',
        method: 'get',
        successCallback (res) {
          self.catalogMain = res.msg
        }
      });
    },
    // 发送选择小课名称接口
    sendData (value) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'project.course.courseIntroduction.sendData',
        method: 'get',
        pathParams: [value],
        successCallback (res) {
          self.courseChangeData = res.msg;
          self.catalogsValue = res.msg.catalogId;
          self.subCatalogsValue = res.msg.subCatalogId;
          self.problem = res.msg.problem;
          self.tableData = self.handleChangeData(res.msg.audioList);
          self.who = res.msg.who;
          self.$refs.oneEditor.editor.setValue(res.msg.why);
          self.$refs.twoEditor.editor.setValue(res.msg.how);
        }
      })
    },
    /*发送所有修改数据*/
    handleSendAll(){
      let self = this;
      let bodyData={
        abbreviation:''
      };
      ApiDataFilter.request({
        apiPath: 'project.course.courseIntroduction.save',
        method:  'post',
        data:bodyData,
        successCallback (res) {
          console.log(res)
        }
      })
    },
    //发送添加和编辑的语音
    handleSendAudio (ftpFileName) {
      let self = this;
      let dataBody = {
        audioId: this.audioId,
        ftpFileName: ftpFileName,
        name: this.audioName,
        words: this.audioWords
      };
      ApiDataFilter.request({
        apiPath: 'project.course.courseIntroduction.uploadAudio',
        method: 'post',
        data: dataBody,
        successCallback (res) {
          self.centerDialogVisible = false;
          self.$message.success('恭喜你，这是一条成功消息')
          console.log(res)
        }
      })
    },
    change (val) {

    },
    /*语音文本描述*/
    changeAudio (val) {
      this.audioWords = val
    },
    /*删除照片*/
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    /* 图片预览*/
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /*添加语音*/
    handleAddAudio () {
      this.centerDialogVisible = true;
      this.fileList = [];
      this.popName = '上传语音';
      this.audioName = '';
      this.audioId = 0;
      setTimeout(() => { this.$refs.threeEditor.editor.setValue('') }, 200)
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
    /*语音上传成功*/
    handleAudioSuccess (response, file, fileList) {
      this.handleSendAudio(response.msg)
    },
    handleAudioRemove (file, fileList) {
      console.log(file, fileList);
    },
    /*判断音频格式*/
    beforeAvatarUpload (file) {
      const isM4AMP3 = (file.type === 'audio/x-m4a' || file.type === 'audio/mpeg');
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
    /*编辑语音弹框*/
    handleEdit (index, row) {
      this.popName = '编辑语音';
      this.centerDialogVisible = true;
      this.audioName = row.name;
      this.audioId = row.id;
      this.fileAudioUrl = row.url;
      setTimeout(() => { this.$refs.threeEditor.editor.setValue(row.words) }, 200)
      this.fileList = [];
      let rowL = {
        name: row.name,
        url: row.url
      };
      this.fileList[0] = rowL;
    },
    handleDelete (index, row) {
      console.log(index, row);
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
    // 处理语音list文案
    handleChangeData (tableData) {
      tableData.map((item, index) => {
        tableData[index].wordsString = this.removeHtmlTags(item.words)
      });
      return tableData
    }
  },
  created () {
    this.getData()
    /*   abbreviation:"战略管理"
      audioId:null
      catalogId:4
      how:"<p>sdasdds</p>"
      id:44
      length:10
      problem:"四两拨千斤的艺术"
      why:"<p>你好，
      subCatalogId:21
      who:"公司管理层;↵创业公司的CEO;↵向管理岗位转变的技术从业者"*/
  }
}
</script>

<style lang="less">
  @import "courseIntroduce.less";
</style>
