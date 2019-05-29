<template>
  <div class="class-sort-component">
    <el-card shadow="hover">

      <el-row :gutter="20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>课程项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>体验课排班</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <el-card shadow="hover">
      <el-form :inline="true"
               :rules="selectFormRule"
               status-icon
               ref="selectForm"
               :model="selectForm">
        <el-row>
          <el-col :span='8'>
            <el-form-item label="所学项目"
                          prop="projectPeriod">
              <el-cascader :options="projectType"
                           :props="{children:'projectList'}"
                           v-model="selectForm.projectPeriod">
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="按班级类型"
                          prop="selectClass">
              <el-select v-model="selectForm.selectClass"
                         value-key="typeName"
                         placeholder="请选择">
                <el-option v-for="item in classTypeList"
                           :key="item.typeName"
                           :label="item.typeName"
                           :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click="submitScreen('selectForm')">筛选班级</el-button>
              <el-button @click="addSendData('selectForm')"
                         type="primary">添加班级</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <br>
    <el-card shadow="hover">
      <el-table :data="tableData">
        <el-table-column prop="classType"
                         label="班级类型">
        </el-table-column>
        <el-table-column prop="classNumber"
                         label="班级号">
        </el-table-column>
        <el-table-column prop="quanwaiEmployee.name"
                         label="班主任">
        </el-table-column>
        <el-table-column prop="headTeacher.nickName"
                         label="微信昵称">
        </el-table-column>
        <el-table-column prop="enterGroupQrCode"
                         label="群二维码"
                         v-if="entryType">
          <template slot-scope="scope">
            <img :src="scope.row.enterGroupQrCode ?scope.row.enterGroupQrCode.qrCode:''"
                 @click="viewBigQrcodeClick(scope.row.enterGroupQrCode.qrCode)"
                 width="39"
                 height="65"
                 class="head_pic" />
          </template>
        </el-table-column>

        <el-table-column prop="sequence"
                         label="顺序">
        </el-table-column>
        <el-table-column prop="systemClassQuantity"
                         label="流量分布">
          <template slot-scope="scope">
            {{scope.row.systemClassQuantity}}/{{scope.row.limit}} <el-link style="color:#7DBE00"
                     @click.stop="viewFlowInfo(scope.row)"
                     type="success">查看分布</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="actualQuantity"
                         label="实际到客">
          <template slot-scope="scope">
            <span>添加班主任：{{scope.row.actualQuantity ? scope.row.actualQuantity:0}}</span>
            <span>加入班级群：{{scope.row.actualEnterGroupQuantity ? scope.row.actualEnterGroupQuantity:0}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="channel"
                         label="投放渠道">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button @click="handleEdit(scope.row,scope.$index)"
                         size="mini">编辑</el-button>
            </div><br>
            <div>
              <el-button type="danger"
                         :disabled="scope.row.isOperable"
                         @click="handledelete(scope.row,scope.$index)"
                         size="mini">删除</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
      <br>
      <el-pagination v-show="!!tableData&&tableData.length"
                     @current-change="loadCurrentChange"
                     :hide-on-single-page="total&&total===1"
                     :current-page.sync="currentPage"
                     :page-size="15"
                     layout="prev, pager, next, jumper"
                     :total="Number(total)">
      </el-pagination>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="编辑"
               :visible.sync="editPopup">
      <el-form :model="editForm"
               status-icon
               label-width="120px"
               ref="editForm"
               :rules="editFormRules">
        <el-form-item label="班级号"
                      prop="classNumber">
          <el-input v-model.number="editForm.classNumber"
                    style="width:250px"
                    :disabled="editdDisabled"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="顺序"
                      prop="sequence">
          <el-input v-model.number="editForm.sequence"
                    style="width:250px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加班主任"
                      prop="actualQuantity">
          <el-input v-model.number="editForm.actualQuantity"
                    style="width:250px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="加入班级群"
                      prop="actualEnterGroupQuantity">
          <el-input v-model.number="editForm.actualEnterGroupQuantity"
                    style="width:250px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="投放渠道"
                      prop="channel">
          <el-select v-model="editForm.channel"
                     style="width:250px"
                     :disabled="editdDisabled"
                     value-key="typeName"
                     placeholder="请选择">
            <el-option v-for="item in memberLabels"
                       :key="item.label"
                       :label="item.labelName"
                       :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择班主任"
                      v-show="!entryType">
          <el-select v-model="editForm.headTeacherId"
                     filterable
                     headTeacherId:
                     :rules="{ required: true, message: '请选择班主任', trigger: 'change' }"
                     :disabled="editdDisabled"
                     style="width:250px"
                     placeholder="请选择班主任">
            <el-option v-for="item in headTeachers"
                       :key="item.id"
                       :label="item.nickName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信昵称"
                      v-show="!entryType">
          <el-select v-model="editForm.nickName"
                     filterable
                     headTeacherId:
                     :rules="{ required: true, message: '请选择微信昵称', trigger: 'change' }"
                     :disabled="editdDisabled"
                     style="width:250px"
                     placeholder="请选择微信昵称">
            <el-option v-for="item in headTeachers"
                       :key="item.id"
                       :label="item.nickName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="entryType"
                      label="群二维码"
                      ref="imageUpload"
                      :rules="entryType ? { required: true, message: '上传群二维码', trigger: 'change' }:''"
                      prop="qrcodeUrl">
          <el-upload class="avatar-uploader"
                     action="/pc/upload/file"
                     list-type="picture-card"
                     :limit="1"
                     :disabled="editdDisabled"
                     :class="{hide:hideUpload1}"
                     :file-list="fileList1"
                     :multiple="false"
                     :before-upload="checkPicType"
                     :on-remove="clearFileList1"
                     :on-success="upQrcode">

            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editPopup = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看大图"
               :visible.sync="viewBigQrcode">
      <div style="text-align:center">
        <img :src="bigQcordUrl"
             style="width:80%"
             alt="入群二维码">
      </div>
    </el-dialog>
    <el-dialog title="查看分布"
               :visible.sync="distributionPopup">
      <el-table :data="distributionData">
        <el-table-column property="channelName"
                         label="渠道"
                         width="150"></el-table-column>
        <el-table-column property='actualQuantity'
                         label="到客周期"
                         width="200">
          <template slot-scope="scope">
            <span>{{scope.row.firstReachDate}} ~ {{scope.row.lastReachDate}}</span>
          </template>
        </el-table-column>
        <el-table-column property="channelCount"
                         label="公众号到客"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';
export default {
  data () {
    const validate = (rule, value, callback) => {
      const { classNumbers } = this
      console.log(classNumbers, value)
      if (!value) return callback('班级号不能为空')
      if (classNumbers.includes(value)) {
        callback('班级号已存在')
      } else {
        callback()
      }
    }
    return {
      selectForm: {
        projectPeriod: [],
        selectClass: {
          entryType: 0,
          typeName: '扫码加班主任'
        },
        channelType: ''
      },
      channelTypeList: [{ name: '公众号投放', value: 1 }, { name: '老带新', value: 2 }, { name: '自增长', value: 3 }],
      selectFormRule: {
        projectPeriod: { required: true, message: '请选择项目／日期', trigger: 'change' },
        selectClass: { required: true, message: '请选择班级类型', trigger: 'change' }
      },
      editFormRules: {
        classNumber: [{ required: true, message: '请输入班级号', trigger: 'change' }],
        channel: { required: true, message: '请选择渠道', trigger: 'change' },
        sequence: { required: true, message: '请输入顺序', trigger: 'change' }
        // actualEnterGroupQuantity: { required: true, message: '请输入加入班级群', trigger: 'change' }
      },
      classTypeList: [{
        typeName: '扫码加班主任',
        entryType: 0

      }, {
        typeName: '扫码入群',
        entryType: 1

      }],
      tableData: [],
      projectType: [],
      currentPage: 1,
      total: '',
      editPopup: false,
      editForm: {
        classNumber: '',
        channel: '',
        qrcodeUrl: '',
        actualQuantity: '',
        headTeacherId: '',
        sequence: '',
        operateRotateId: '',
        actualEnterGroupQuantity: '',
        nickName: ''
      },
      classNumbers: [],
      headTeachers: [],
      memberLabels: [],
      entryType: '',
      viewBigQrcode: false,
      bigQcordUrl: '',
      hideUpload: false,
      fileList1: [],
      editdDisabled: false,
      editIndex: '',
      distributionPopup: false,
      distributionData: []
    }
  },
  mounted () {
    this.load()
  },
  computed: {
    hideUpload1 () {
      return this.fileList1.length >= 1
    }
  },
  methods: {
    load () {
      apiDataFilter.request({
        apiPath: 'manage.classSort.load',
        successCallback: (res) => {
          // console.log(res)
          const { projectType } = res.msg
          console.log(projectType)
          projectType.forEach(item => {
            const { typeName, memberTypeId, projectList } = item
            for (let project of projectList) {
              const { term } = project
              Object.assign(project, { label: `第${term}期`, value: term })
            }
            Object.assign(item, { label: typeName, value: memberTypeId })
          })
          console.log(projectType)
          this.projectType = projectType
        }
      })
    },
    submitScreen (formName) { //筛选班级
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('pppp')
          const { entryType } = this.selectForm.selectClass
          this.entryType = entryType
          this.loadPageList()
          this.loadTeacher()
        }
      });
    },
    loadTeacher () {
      const [memberTypeId, term] = this.selectForm.projectPeriod
      const { entryType: enterType } = this
      const data = {
        memberTypeId, term, enterType
      }
      apiDataFilter.request({
        data,
        apiPath: 'manage.classSort.loadTeacher',
        successCallback: (res) => {
          console.log(res)
          const { classNumbers, headTeachers, memberLabels } = res.msg
          this.classNumbers = classNumbers
          this.headTeachers = headTeachers
          this.memberLabels = memberLabels
        }
      })
    },
    checkPicType (file) {
      const { type } = file
      if (type !== 'image/jpeg') {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
    },
    loadPageList (page) { // 筛选班级
      const { projectPeriod, selectClass } = this.selectForm
      const [memberTypeId, term] = projectPeriod
      const { entryType } = selectClass

      const params = {
        memberTypeId,
        term,
        page: page || this.currentPage,
        entryType
      }

      console.log(memberTypeId, term)
      apiDataFilter.request({
        apiPath: 'manage.classSort.listLoad',
        data: params,
        successCallback: (res) => {
          console.log(res)
          if (res.code !== 200) return

          const { list, page } = res.msg
          list.forEach(item => {
            Object.assign(item, { isOperable: new Date() > new Date(item.termActiveDate.replace(/-/g, '/')), classType: item.entryType ? '扫码入群' : '扫码加班主任' })
          })
          const { page: currentPage, total } = page
          this.currentPage = currentPage
          this.total = total
          this.tableData = list
        }
      })
    },
    addSendData (formName) { //添加班级
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //const { selectClass } = this.selectForm
          const { projectPeriod, selectClass } = this.selectForm
          const [memberTypeId, term] = projectPeriod
          const { entryType } = selectClass
          const { projectType } = this
          // alert()
          console.log(entryType)
          localStorage.setItem('query', JSON.stringify({ projectType, memberTypeId, term, entryType }))
          this.$router.push({
            path: '/management/manage/addClass'
          })
          console.log('pppp')
        }
      });
    },
    handledelete (row, i) {
      console.log(row, i)
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id: operateRotateId } = row
        const params = { operateRotateId }
        apiDataFilter.request({
          apiPath: 'manage.classSort.del',
          data: params,
          method: 'post',
          successCallback: (res) => {
            this.tableData.splice(i, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });

            this.load()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    loadCurrentChange () {
      this.loadPageList(this.currentPage)
    },
    handleEdit (row, i) { // 编辑
      this.editIndex = i
      const { entryType } = this
      const { classNumber, sequence, channel, actualQuantity, headTeacher, enterGroupQrCode, termActiveDate, id: operateRotateId, actualEnterGroupQuantity } = row
      this.editdDisabled = new Date() > new Date(termActiveDate.replace(/-/g, '/'))
      let qrcodeUrl, headTeacherId
      if (entryType) {
        const { qrCode = '' } = enterGroupQrCode
        qrcodeUrl = qrCode
      } else {
        const { id = '' } = headTeacher
        headTeacherId = id
      }
      let nickName = headTeacher.nickName
      console.log(headTeacherId, qrcodeUrl)
      const editForm = {
        classNumber,
        channel,
        sequence,
        actualQuantity,
        operateRotateId,
        actualEnterGroupQuantity,
        nickName
      }
      this.editForm = entryType ? Object.assign(editForm, { qrcodeUrl }) : Object.assign(editForm, { headTeacherId })

      this.editPopup = true
      if (!entryType) return //班主任类型不需要
      this.fileList1 = [{ url: qrcodeUrl }]
    },
    editSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        const { actualQuantity, actualEnterGroupQuantity, classNumber, headTeacherId, sequence, channel, qrcodeUrl, operateRotateId, nickName } = this.editForm
        const params = {
          actualQuantity, actualEnterGroupQuantity, headTeacherId, classNumber, sequence, channel, qrcodeUrl, operateRotateId, nickName
        }
        apiDataFilter.request({
          apiPath: 'manage.classSort.upClass',
          data: params,
          method: 'post',
          successCallback: (res) => {
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
            this.submitScreen('selectForm')
            this.editPopup = false
          }
        })
      });
    },
    upQrcode (res, file, fileList) {
      let { msg } = res
      this.editForm.qrcodeUrl = msg
      this.fileList1 = fileList
      console.log(fileList)
      this.$refs.imageUpload.clearValidate()
    },
    viewBigQrcodeClick (url) {
      this.viewBigQrcode = true
      this.bigQcordUrl = url
    },
    clearFileList1 () {
      this.fileList1 = []
    },
    viewFlowInfo (row) {
      const { id: classId } = row
      apiDataFilter.request({
        apiPath: 'manage.classSort.flowInfo',
        data: { classId },
        method: 'get',
        successCallback: (res) => {
          console.log(res)
          this.distributionPopup = true
          this.distributionData = res.msg
        }
      })
      console.log(row)
    }
  }
}
</script>
<style lang="less">
@import "./classSort.less";
</style>
