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
          <p>小课缩略名称</p>
          <el-input
            placeholder="请输入小课缩略名称"
            v-model="abbreviation"
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
          <el-button @click="centerDialogVisible = true">上传语音</el-button>
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
            prop="words"
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
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
         <el-button @click="centerDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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

  </div>
</template>

<script>
  import Editor from '../../../../common/editor/editor'
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import _ from 'lodash'

  export default {
    name: 'courseIntroduce',
    components: {Editor},
    data() {
      return {
        courseTitleList: [],  // 小课标题list
        courseTitleValue: '', // 选择小课标题之后的id
        courseChangeData: {}, // 选择小课之后的返回的数据
        catalogMain: {},   // 小课类别
        catalogsValue: '', //小课主类别value
        subCatalogsValue: '',//小课次类别value
        abbreviation: '',   // 小课缩略名
        who: "", // 适用人群
        oneEditorValue:'', //课程介绍
        twoEditorValue:'',// 知识体系
        tableData: [], // 语音list
        outerVisible: false,
        innerVisible: false,
        centerDialogVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,

      }
    },
    methods: {
      getData() {
        let self = this;
        // 获取小课名称列表
        ApiDataFilter.request({
          apiPath: 'project.course.courseIntroduction.simple',
          method: 'get',
          successCallback(res) {
            self.courseTitleList = res.msg
          }
        });
        // 获取小课主次类别
        ApiDataFilter.request({
          apiPath: 'project.course.courseIntroduction.catalog',
          method: 'get',
          successCallback(res) {
            self.catalogMain = res.msg
          }
        });
      },
      sendData(value) { // 发送选择小课名称接口
        let self = this;
        ApiDataFilter.request({
          apiPath: 'project.course.courseIntroduction.sendData',
          method: 'get',
          pathParams: [value],
          successCallback(res) {
            self.courseChangeData = res.msg;
            self.catalogsValue = res.msg.catalogId;
            self.subCatalogsValue = res.msg.subCatalogId;
            self.abbreviation = res.msg.abbreviation;
            self.tableData = self.handleChangeData(res.msg.audioList);
            self.who = res.msg.who;
            self.$refs.oneEditor.editor.setValue(res.msg.why);
            self.$refs.twoEditor.editor.setValue(res.msg.how);
          }
        })
      },
      change(val) {
        console.log(val)  //以html格式获取simditor的正文内容
      },
      /*删除照片*/
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
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
      handleChangeData(tableData){  // 处理语音文案
          tableData.map((item,index)=>{
            tableData[index].words = this.removeHtmlTags(item.words)
        });
        return tableData
      }

    },
    created() {
      this.getData()
    }
  }
</script>

<style lang="less">
  @import "courseIntroduce.less";
</style>
