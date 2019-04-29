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
          <span>所选项目：<el-tag type="success">标签二</el-tag></span>
        </el-col>
        <el-col :span="8">
          <span>选择期数：<el-tag type="success">{{term}}</el-tag></span>
        </el-col>
        <el-col :span="8">
          <span>班级类型：<el-tag type="success">{{entryType? '微信群':'班主任'}}</el-tag></span>
        </el-col>
      </el-row>

    </el-card>
    <el-card shadow="hover"
             class="box-card"
             v-show="!entryType"
             v-for="(item,i) in addClassType1"
             :key='i'>

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
        <el-form-item label="班级渠道"
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
        </el-form-item>
        <el-form-item label="选择班主任"
                      prop="headTeacherId">
          <el-select v-model="item.headTeacherId"
                     filterable
                     style="width:250px"
                     placeholder="请选择班主任">
            <el-option v-for="item in headTeachers"
                       :key="item.id"
                       :label="item.nickName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请输入优先级"
                      prop="sequence">
          <el-input v-model.number="item.sequence"
                    style="width:250px"
                    autocomplete="off"></el-input>
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
                 v-for="(items,j) in item.groupClass"
                 :key='j'>

          <el-form-item label="输入班级号"
                        :rules=" [{ required: true, message: '请输入班级号', trigger: 'change' }, { validator: validate, trigger: 'blur' }]"
                        :prop="`groupClass.${j}.classNumber`">
            <el-input v-model.number="items.classNumber"
                      style="width:250px"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级渠道"
                        :rules="[{ required: true, message: '请输入渠道', trigger: 'change' }]"
                        :prop="`groupClass.${j}.channel`">
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
                        prop="qrcodeUrl">
            <div @click="setUploadIndex(i,j)">
              <el-upload class="avatar-uploader"
                         action="/pc/upload/file"
                         :class="{hide:items.hideUpload}"
                         list-type="picture-card"
                         :limit="1"
                         :multiple="false"
                         :on-remove="removePic"
                         :on-success="upPicSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="请输入优先级"
                        :rules="[{ required: true, message: '请输入优先级', trigger: 'change' }]"
                        :prop="`groupClass.${j}.sequence`">
            <el-input v-model.number="items.sequence"
                      style="width:250px"
                      autocomplete="off"></el-input>
          </el-form-item>

        </el-card>
        <el-button icon="el-icon-edit"
                   v-show='item.groupClass.length!==3'
                   @click="addClassItem(item)"
                   type="success">继续添加班主任</el-button>
      </el-form>
    </el-card>
    <el-button @click="submitSave">保存</el-button>
    <el-button @click="addSendData('addClassType1')"
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
      addClassType1: [
        {
          classNumber: 1,
          channel: '',
          headTeacherId: '',
          sequence: ''
        }

      ],
      validate,
      addClassType2: [{
        headTeacherId: '',
        groupClass: [
          {
            classNumber: '',
            channel: '',
            qrcodeUrl: '',
            sequence: '',

          }
        ]
      }],
      addClassTypeRules: {
        classNumber: [{ required: true, message: '请输入班级号', trigger: 'change' }, { validator: validate, trigger: 'blur' }],
        headTeacherId: { required: true, message: '请选择班主任', trigger: 'change' },
        channel: { required: true, message: '请选择渠道', trigger: 'change' },
        sequence: { required: true, message: '请输入顺序', trigger: 'change' }
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
      addRowButton: true,
      classNumbers: [],
      headTeachers: [],
      memberLabels: '',
      timeout: null,
      selectIndex: '',
      uploadIndex: ''

    }
  },
  computed: {
    addClassTypeLength () {
      return (this.addClassType1.length === 10) || (this.addClassType2.length === 10)
    }

  },
  mounted () {
    const { memberTypeId, term, entryType } = this.$route.query
    this.memberTypeId = memberTypeId
    this.term = term
    this.entryType = entryType
    this.loadTeacher()
  },
  methods: {
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
    addRow () {
      const type = this.entryType
      if (type) {
        this.addClassType2.push({
          headTeacherId: '',
          groupClass: [
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
            sequence: ''
          }
        )
      }

    },
    addClassItem (item) {
      console.log(item)
      item.groupClass.push({
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
      const { memberTypeId, term } = this
      const data = {
        memberTypeId, term
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
    upPicSuccess (res, file, fileList) {//添加图片
      console.log(res, file, fileList)
      let { msg } = res
      const [i, j] = this.uploadIndex
      let map = new Map()
      this.addClassType2.forEach((item, i) => {
        map.set(i, item)
      })
      map.get(i).groupClass.forEach((item, i) => {
        item.qrcodeUrl = i === j ? msg : item.qrcodeUrl
      })
    },
    removePic () {//移除图片
      const [i, j] = this.uploadIndex
      let map = new Map()
      this.addClassType2.forEach((item, i) => {
        map.set(i, item)
      })
      map.get(i).groupClass.forEach((item, i) => {
        item.qrcodeUrl = i === j ? '' : item.qrcodeUrl
      })
    },
    setUploadIndex (i, j) {
      this.uploadIndex = [i, j]
    },
    submitSave () {
      const type = this.entryType
      console.log(type)
      if (!type) {//班主任
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

        }
      })
    }
  }}
</script>
<style lang="less">
@import "./addClass.less";
</style>

