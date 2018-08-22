<template>
  <div class="course-knowledge-container">
    <h3>小课知识导入</h3>
    <div class="course-knowledge-top">
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
    <el-button type="primary" @click="handleNewAdd">新增</el-button>
    <div class="course-content">
      <el-table
        :data="courseList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
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
export default {
  name: 'courseKnowledge',
  data () {
    return {
      courseTitleList:[],//课程名称列表
      courseTitleValueId:'',//选取的课程id
      searchCourseTitleValueId:'',//课程id
      List : [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        /*  self.getList(self.courseTitleList[0].id);*/
          self.searchCourseTitleValueId = self.courseTitleList[0].id
        }
      });
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
