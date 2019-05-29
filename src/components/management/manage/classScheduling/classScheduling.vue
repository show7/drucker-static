<template>
  <div class="class-Scheduling-component-wrap">
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>课程项目管理</el-breadcrumb-item>
          <el-breadcrumb-item>体验课排期</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <el-row>
        <el-col :span='12'
                :offset="3">
          <span>所学项目：</span>
          <el-select v-model="selectItem"
                     value-key="typeName"
                     placeholder="请选择">
            <el-option v-for="item in projectType"
                       :key="item.typeName"
                       :label="item.typeName"
                       :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="9">
          <el-button type="primary"
                     @click="openAddSchedulingPopup"
                     icon="el-icon-edit">新建排期</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <el-table :data="selectItem.projectList"
                style="width: 100%">
        <el-table-column label="体验课项目"
                         width="180">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              {{ scope.row.typeName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="体验课期数">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              <el-tag size="medium">第{{ scope.row.term }}期</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="报名开始日期">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              {{ scope.row.activeDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="报名结束日期">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              {{ scope.row.expiredDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开课日期">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              {{ scope.row.openDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="结课日期">
          <template slot-scope="scope">
            <div slot="reference"
                 class="name-wrapper">
              {{ scope.row.closeDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="体验课项目"
                         width="180"
                         prop='typeName'>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       :disabled="checkTime(scope.row.activeDate,scope.row.expiredDate)"
                       @click="edit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       :disabled="checkTime(scope.row.activeDate,scope.row.expiredDate)"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增排期 -->

    <el-dialog :title="saveType?'编辑排期':'新增排期'"
               :visible.sync="dialogFormVisible">
      <el-form :model="addScheduling"
               status-icon
               ref="addScheduling"
               label-width="200px"
               :rules="addSchedulingRules">
        <el-form-item label="所学项目"
                      prop="item">
          <el-select v-model="addScheduling.item"
                     style="width:250px"
                     value-key="typeName"
                     placeholder="请选择">
            <el-option v-for="item in projectType"
                       :key="item.typeName"
                       :label="item.typeName"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输入期数"
                      prop="term">
          <el-input v-model.number="addScheduling.term"
                    style="width:250px"
                    autocomplete="off"></el-input>
          <span v-show="addScheduling.item.previousIssue">上一期为{{addScheduling.item.previousIssue}}期</span>
        </el-form-item>
        <el-form-item label="报名开始日期"
                      prop="activeDate">
          <el-date-picker v-model="addScheduling.activeDate"
                          value-format="yyyy-MM-dd"
                          type="date"
                          style="width:250px"
                          placeholder="选择报名开始日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="报名结束日期"
                      prop="expiredDate">
          <el-date-picker v-model="addScheduling.expiredDate"
                          value-format="yyyy-MM-dd"
                          type="date"
                          style="width:250px"
                          placeholder="选择报名结束日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="开课日期"
                      prop="openDate">
          <el-date-picker v-model="addScheduling.openDate"
                          type="date"
                          style="width:250px"
                          value-format="yyyy-MM-dd"
                          @change="setCloseDate"
                          placeholder="选择开课日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="结课日期">
          <el-date-picker v-model="addScheduling.closeDate"
                          type="date"
                          value-format="yyyy-MM-dd"
                          style="width:250px"
                          readonly
                          disabled
                          placeholder="">
          </el-date-picker>

        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitSendData('addScheduling')">提交</el-button>
          <el-button @click="resetForm('addScheduling')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>
<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';
export default {
  name: 'classScheduling',
  data () {
    const termValidate = (rule, value, callback) => {
      const validate = /^[1-9]\d*$/
      if (validate.test(value)) {
        callback()
      } else {
        callback('期数输入不合法')
      }
    }
    return {
      saveType: 0,
      selectItem: {},
      formLabelWidth: '180px',
      dialogFormVisible: false,
      addSchedulingRules: {
        item: { required: true, message: '请选择项目类型', trigger: 'change' },
        term: [{ required: true, message: '请输入期数', trigger: 'change' }, { validator: termValidate, trigger: 'change' }],
        activeDate: { type: 'string', required: true, message: '请选择时间', trigger: 'change' },
        expiredDate: { type: 'string', required: true, message: '请选择时间', trigger: 'change' },
        openDate: { type: 'string', required: true, message: '请选择时间', trigger: 'change' }
      },
      projectType: [],
      addScheduling: {
        item: '',
        term: '',
        activeDate: '',
        expiredDate: '',
        openDate: '',
        closeDate: ''
      }
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    openAddSchedulingPopup () {
      this.addScheduling = {
        item: '',
        term: '',
        id: '',
        activeDate: '',
        expiredDate: '',
        openDate: '',
        closeDate: ''
      }
      this.saveType = 0
      this.dialogFormVisible = true
      this.$refs['addScheduling'] ? this.$refs['addScheduling'].resetFields() : '';
    },
    checkTime (startTime, endTime) {
      return new Date() > new Date(startTime.replace(/-/g, '/')) || new Date() >= new Date(endTime.replace(/-/g, '/'))
    },
    load () {
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.load',
        successCallback: (res) => {
          this.projectType = res.msg.projectType
        }
      })
    },
    setCloseDate () {
      const { openDate } = this.addScheduling
      const { problemScheduleSize } = this.addScheduling.item
      let startDate = new Date(openDate.replace(/-/g, '/'))
      var date = new Date(startDate.setDate(startDate.getDate() + problemScheduleSize));
      this.addScheduling.closeDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    addSchedulings () {
      const { saveType } = this
      const { item, term, activeDate, expiredDate, id = '', openDate, closeDate } = this.addScheduling
      const { memberTypeId } = item
      const params = {
        memberTypeId, term, activeDate, expiredDate, id, openDate, closeDate
      }
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.save',
        data: params,
        method: 'post',
        successCallback: (res) => {
          console.log(res)
          if (res.code !== 200) return
          this.$message({
            message: saveType ? '修改成功' : '新建成功',
            type: 'success'
          });
          this.dialogFormVisible = false
          this.load()
          this.selectItem = ''
          this.resetForm('addScheduling')
        }
      })
    },
    edit (index, row) {
      console.log(index, row)
      this.saveType = 1
      this.dialogFormVisible = true
      this.addScheduling = {
        item: this.selectItem,
        ...row
      }
    },
    submitSendData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSchedulings()
        }
      });
    },
    resetForm (formName) {
      const { saveType } = this
      const { id = '' } = this.addScheduling
      const addScheduling = {
        item: '',
        term: '',
        activeDate: '',
        expiredDate: '',
        openDate: '',
        closeDate: ''
      }
      this.addScheduling = saveType ? Object.assign(addScheduling, { id }) : addScheduling
      this.$refs[formName].resetFields();
    },
    handleDelete (i, row) {
      console.log(row)
      const { id = '' } = row
      this.$confirm('此操作将永久删除该条信息吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDataFilter.request({
          apiPath: 'manage.classScheduling.del',
          data: { id },
          method: 'post',
          successCallback: (res) => {
            console.log(res)
            if (res.code !== 200) return
            this.selectItem.projectList.splice(i, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
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
    }

  }

}

</script>
<style lang="less">
@import "./classScheduling.less";
</style>
