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
    <br>
    <br>
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
                         width="100"
                         label="班级类型">
        </el-table-column>
        <el-table-column prop="classNumber"
                         width="100"
                         label="班级号">
        </el-table-column>
        <el-table-column prop="headTeacher.nickName"
                         width="120"
                         label="班主任">
        </el-table-column>
        <el-table-column prop="city"
                         width="200"
                         label="群二维码">
        </el-table-column>
        <el-table-column prop="sequence"
                         width="120"
                         label="顺序">
        </el-table-column>
        <el-table-column prop="limit"
                         width="120"
                         label="班级上限">
        </el-table-column>
        <el-table-column prop="channel"
                         width="150"
                         label="投放渠道">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       size="mini">编辑</el-button>
            <el-button type="danger"
                       @click="handledelete(scope.row)"
                       size="mini">删除</el-button>
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
                     :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';
export default {
  data () {
    return {
      selectForm: {
        projectPeriod: [],
        selectClass: ''
      },
      selectFormRule: {
        projectPeriod: { required: true, message: '请选择项目／日期', trigger: 'change' },
        selectClass: { required: true, message: '请选择班级类型', trigger: 'change' }
      },
      classTypeList: [{
        typeName: '加班主任',
        entryType: 0

      }, {
        typeName: '加微信群',
        entryType: 1

      }],
      tableData: [],
      projectType: [],
      currentPage: 1,
      total: ''
    }
  },
  mounted () {
    this.load()
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
          this.loadPageList()
        }
      });
    },
    loadPageList (page) {
      const { projectPeriod, selectClass: entryType } = this.selectForm
      const [memberTypeId, term] = projectPeriod

      const params = {
        page: page || this.currentPage
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
            Object.assign(item, { classType: item.entryType ? '微信群' : '班主任' })
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
          // alert()
          console.log(entryType)
          this.$router.push({
            path: '/management/manage/addClass',
            query: { memberTypeId, term, entryType }
          })
          console.log('pppp')
        }
      });
    },
    handledelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id: operateRotateId } = row
        const params = { operateRotateId }
        apiDataFilter.request({
          apiPath: 'manage.classSort.listLoad',
          data: params,
          successCallback: (res) => {
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

      console.log(row)
    },
    loadCurrentChange () {
      this.loadPageList(this.currentPage)
    }
  }
}
</script>
<style lang="less">
@import "./classSort.less";
</style>
