<template>
  <div class="add-class-component">
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>课程项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>体验课排班</el-breadcrumb-item>
          <el-breadcrumb-item>创建班级</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br>
    <el-card class="box-card"
             shadow="hover">
      <div slot="header"
           class="clearfix">
        <h3>创建班级</h3>
      </div>
      <el-row :gutter="20">
        <el-col :span="8">
          <span>所选项目：<el-tag type="success">{{typeName}}</el-tag></span>
        </el-col>
        <el-col :span="8">
          <span>选择期数：<el-tag type="success">{{term}}</el-tag></span>
        </el-col>
        <el-col :span="8">
          <span>班级类型：<el-tag type="success">{{entryType? '扫码入群':'扫码加班主任'}}</el-tag></span>
        </el-col>
      </el-row>

    </el-card>
    <el-card shadow="hover"
             class="box-card"
             v-show="!entryType"
             v-for="(item,i) in addClassType1"
             :key='i'>
      <el-tag type="success">序号：{{i+1}}</el-tag>
      <el-form :model="item"
               :inline="!entryType"
               :rules="addClassTypeRules"
               status-icon
               :ref="`addClassType1${i}`"
               label-width="120px"
               class="demo-ruleForm">
        <el-form-item label="输入班级号"
                      prop="classNumber">
          <el-input v-model.number="item.classNumber"
                    style="width:250px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="班级渠道"
                      prop="channel">
          <el-select v-model="item.channel"
                     style="width:250px"
                     value-key="typeName"
                     placeholder="请选择">
            <el-option v-for="item in memberLabels"
                       :key="item.label"
                       :label="item.labelName"
                       :value="item.label">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="请输入优先级"
                      prop="sequence">
          <el-input v-model.number="item.sequence"
                    style="width:250px"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择班主任"
                      prop="quanwaiEmployeeId">
          <el-select v-model="item.quanwaiEmployeeId"
                     filterable
                     style="width:250px"
                     placeholder="请选择班主任"
                     clearable
                     @change="headerChange(i,item.quanwaiEmployeeId)">
            <el-option v-for="item in employees"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="微信昵称"
                      prop="headTeacherId">
          <el-select v-model="item.headTeacherId"
                     placeholder="请选择公众号"
                     clearable
                     filterable
                     @change="inputName">
            <el-option v-for="item in headTeachers"
                       :key="item.id"
                       :label="item.nickName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <i class="el-icon-delete"
           style="margin-top:15px"
           @click="deleteRow(i)"></i>
      </el-form>
    </el-card>
    <el-card shadow="hover"
             class="box-card"
             v-show="entryType"
             v-for="(item,i) in addClassType2"
             :key='i'>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-tag type="success">序号：{{i+1}}</el-tag>
        </el-col>
      </el-row>
      <br>
      <el-form :model="item"
               :rules="addClassType2Rules"
               status-icon
               :ref="`addClassType2${i}`"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="选择班主任"
                      prop="headTeacherId">
          <el-select v-model="item.headTeacherId"
                     filterable
                     placeholder="请选择班主任">
            <el-option v-for="item in headTeachers"
                       :key="item.id"
                       :label="item.nickName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-card class="box-card"
                 v-for="(items,j) in item.groupClasses"
                 :key='j'>

          <el-form-item label="输入班级号"
                        label-width="150px"
                        :rules=" [{ required: true, message: '请输入班级号', trigger: 'change' }, { validator: validate, trigger: 'blur' }]"
                        :prop="`groupClasses.${j}.classNumber`">
            <el-input v-model.number="items.classNumber"
                      style="width:250px"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级渠道"
                        label-width="150px"
                        :rules="[{ required: true, message: '请输入渠道', trigger: 'change' }]"
                        :prop="`groupClasses.${j}.channel`">
            <el-select v-model="items.channel"
                       style="width:250px"
                       value-key="typeName"
                       placeholder="请选择">
              <el-option v-for="item in memberLabels"
                         :key="item.labelName"
                         :label="item.labelName"
                         :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传二维码"
                        label-width="150px"
                        prop="qrcodeUrl">
            <div @click="setUploadIndex(i,j)">
              <!-- <el-upload class="avatar-uploader"
                         action="/pc/upload/file"
                         list-type="picture-card"
                         :limit="1"
                         :multiple="false"
                         :on-remove="removePic"
                         :before-upload="checkPicType"
                         :on-change="upPicChange"
                         :on-success="upPicSuccess">
                <i class="el-icon-plus"></i>
              </el-upload> -->
            </div>
          </el-form-item>
          <el-form-item label="请输入优先级"
                        label-width="150px"
                        :rules="[{ required: true, message: '请输入优先级', trigger: 'change' }]"
                        :prop="`groupClasses.${j}.sequence`">
            <el-input v-model.number="items.sequence"
                      style="width:250px"
                      autocomplete="off"></el-input>
          </el-form-item>
          <i class="el-icon-delete"
             @click="deleteClassRow(i,j)"></i>
        </el-card>
        <el-button icon="el-icon-edit"
                   v-show='item.groupClasses.length!==3'
                   @click="addClassItem(item)"
                   type="success">继续添加班主任</el-button>
      </el-form>
    </el-card>
    <el-button @click="submitSave">保存</el-button>
    <el-button @click="cancelSave"
               type="primary">取消</el-button>
    <el-button type="primary"
               icon="el-icon-circle-plus"
               v-show='!addClassTypeLength'
               @click="addRow">继续添加</el-button>

  </div>
</template>
<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';
export default {
  data () {
    const validate = (rule, value, callback) => {
      const { allClassNumbers } = this
      console.log(allClassNumbers, value)
      if (typeof value !== 'number') return callback('班级号只能为数字')
      if (!value) return callback('班级号不能为0')
      if (allClassNumbers.includes(value)) {
        callback('班级号已存在')
      } else {
        callback()
      }
    }
    return {
      addClassType1: [
        {
          classNumber: '',
          channel: '',
          headTeacherId: '',
          sequence: '',
          quanwaiEmployeeId: ''
        }

      ],
      validate,
      addClassType2: [{
        headTeacherId: '',
        quanwaiEmployeeId: '',
        groupClasses: [
          {
            classNumber: '',
            channel: '',
            qrcodeUrl: '',
            sequence: ''

          }
        ]
      }],
      addClassTypeRules: {
        classNumber: [{ required: true, message: '请输入班级号', trigger: 'change' }, { validator: validate, trigger: 'blur' }, { type: 'number', message: '班级号为数字值' }],
        headTeacherId: { required: true, message: '请选择班主任', trigger: 'change' },
        channel: { required: true, message: '请选择渠道', trigger: 'change' },
        sequence: { required: true, message: '请输入顺序', trigger: 'change' },
        quanwaiEmployeeId: { required: true, message: '请选择或输入班主任', trigger: 'change' }
      },
      addClassType2Rules: {
        headTeacherId: { required: true, message: '请选择班主任', trigger: 'change' },
        //'groupClass[0].classNumber': [{ required: true, message: '请输入班级号', trigger: 'change' }, { validator: validate, trigger: 'blur' }],

        'groupClass[0].qrcodeUrl': [{ required: true, message: '请上传图片', trigger: 'change' }]
      },

      projectType: [],
      memberTypeId: '',
      term: '',
      entryType: '',
      typeName: '',
      addRowButton: true,
      classNumbers: [],
      headTeachers: [],
      employees: [],
      memberLabels: '',
      timeout: null,
      selectIndex: '',
      uploadIndex: '',
      allClassNumbers: [],
      allheadTeachers: []
    }
  },
  computed: {
    addClassTypeLength () {
      return (this.addClassType1.length === 10) || (this.addClassType2.length === 5)
    }

  },
  mounted () {
    const { memberTypeId, term, entryType, projectType } = JSON.parse(localStorage.getItem('query'))
    let item = projectType.filter(item => item.memberTypeId === memberTypeId)
    const { typeName } = item[0]
    this.memberTypeId = memberTypeId
    this.typeName = typeName
    this.term = term
    this.entryType = entryType
    this.loadTeacher()
  },
  methods: {
    inputName () {
      this.headTeachers = this.allheadTeachers
    },
    headerChange (index, quanwaiEmployeeId) {
      if (!quanwaiEmployeeId) return
      const { memberTypeId,
        term } = this
      const data = { memberTypeId,
        quanwaiEmployeeId,
        term }
      apiDataFilter.request({
        data,
        apiPath: 'manage.classSort.historyName',
        successCallback: (res) => {
          this.headTeachers = res.msg
        }
      })
    },
    deleteRow (i) {
      this.$confirm('此操作将删除该条编辑，无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.addClassType1.splice(i, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    checkPicType (file) {
      const { type } = file
      if (type !== 'image/jpeg') {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
    },
    deleteClassRow (i, j) {
      console.log(i, j)
      this.addClassType2[i].groupClasses.splice(j, 1)
      if (this.addClassType2[i].groupClasses.length) return
      this.addClassType2.splice(i, 1)
    },
    addRow () {
      const type = this.entryType
      if (type) {
        this.addClassType2.push({
          headTeacherId: '',
          quanwaiEmployeeId: '',
          groupClasses: [
            {
              classNumber: '',
              channel: '',
              qrcodeUrl: '',
              sequence: '',
              hideUpload: false
            }
          ]
        })
      } else {
        this.addClassType1.push(
          {
            classNumber: '',
            channel: '',
            headTeacherId: '',
            quanwaiEmployeeId: '',
            sequence: ''
          }
        )
      }
    },
    addClassItem (item) {
      console.log(item)
      item.groupClasses.push({
        classNumber: '',
        channel: '',
        qrcodeUrl: '',
        sequence: '',
        hideUpload: false
      })
    },
    handleSelect (item) {
      const { selectIndex, addClassType1 } = this
      this.$set(this.addClassType1, selectIndex)
    },
    loadTeacher () {
      const { memberTypeId, term, entryType: enterType } = this
      const data = {
        memberTypeId, term, enterType
      }
      apiDataFilter.request({
        data,
        apiPath: 'manage.classSort.loadTeacher',
        successCallback: (res) => {
          console.log(res)
          const { classNumbers, headTeachers, memberLabels, quanwaiEmployees } = res.msg
          this.classNumbers = classNumbers
          this.allheadTeachers = headTeachers
          this.memberLabels = memberLabels
          this.employees = quanwaiEmployees
        }
      })
    },
    upPicSuccess (res, file, fileList) { //添加图片
      console.log(res, file, fileList)
      // const isJPG = file.type === 'image/jpeg';
      // if (!isJPG) return this.$message.error('上传头像图片只能是 JPG 格式!');

      let { msg } = res
      const [i, j] = this.uploadIndex
      let map = new Map()
      this.addClassType2.forEach((item, i) => {
        map.set(i, item)
      })
      map.get(i).groupClasses.forEach((item, i) => {
        item.qrcodeUrl = i === j ? msg : item.qrcodeUrl
      })
    },
    removePic () { //移除图片
      const [i, j] = this.uploadIndex
      let map = new Map()
      this.addClassType2.forEach((item, i) => {
        map.set(i, item)
      })
      map.get(i).groupClasses.forEach((item, i) => {
        item.qrcodeUrl = i === j ? '' : item.qrcodeUrl
      })
    },
    setUploadIndex (i, j) {
      this.uploadIndex = [i, j]
    },
    submitSave () {
      const type = this.entryType
      console.log(type)
      if (!type) { //班主任
        const validateList = this.addClassType1.map((item, i) => {
          let validboolen
          this.$refs[`addClassType1${i}`][0].validate((valid) => {
            validboolen = (valid === true)
          });
          return validboolen
        })
        let checkSuccess = validateList.every(item => item === true)
        if (checkSuccess) {
          console.log('入群')
          const { memberTypeId, term, entryType, addClassType1: classes } = this
          const data = { memberTypeId, term, entryType, classes }
          this.saveSubmit(data)
        }
      } else {
        const validateList = this.addClassType2.map((item, i) => {
          let validboolen
          this.$refs[`addClassType2${i}`][0].validate((valid) => {
            validboolen = (valid === true)
          });
          return validboolen
        })
        let check2Success = validateList.every(item => item === true)
        if (!check2Success) return
        console.log('班主任')
        const { memberTypeId, term, entryType, addClassType2: classes } = this
        const data = { memberTypeId, term, entryType, classes }
        this.saveSubmit(data)
      }

      // console.log(checkSuccess)
    },
    saveSubmit (data) {
      const { entryType } = data
      apiDataFilter.request({
        data,
        method: 'post',
        apiPath: `manage.classSort.${entryType ? 'saveGroup' : 'saveTeacher'}`,
        successCallback: (res) => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.$router.push('/management/manage/classSort')
        }
      })
    },
    upQrcode (res, file, fileList) {
      let { msg } = res
      this.editForm.qrcodeUrl = msg
      this.$refs.imageUpload.clearValidate()
    },
    cancelSave () {
      this.$confirm('确定取消保存并返回排班管理页面, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/management/manage/classSort')
      })
    }
  }}
</script>
<style lang="less">
@import "./addClass.less";
</style>
