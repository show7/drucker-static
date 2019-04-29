<template>
  <section class="status-change-wrapper">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <el-form-item label="所学项目"
                            prop="memberTypeId">
                <el-select v-model="ruleForm.memberTypeId"
                           placeholder="项目类型"
                           :clearable="true">
                  <el-option v-for="item in course"
                             :key="item.id"
                             :label="item.typeName"
                             :value="item.memberTypeId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <el-form-item label="选择期数"
                            prop="term">
                <el-select v-model="ruleForm.term"
                           placeholder="选择期数"
                           :clearable="true">
                  <el-option v-for="item in periods"
                             :key="item.term"
                             :label="item.term"
                             :value="item.term">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <el-form-item label="班主任"
                            prop="headTeacherId">
                <el-select v-model="ruleForm.headTeacherId"
                           placeholder="班主任"
                           :clearable="true">
                  <el-option v-for="item in headmaster"
                             :key="item.id"
                             :label="item.headTeacherName"
                             :value="item.headTeacherId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <el-form-item label="班级号"
                            prop="classNumber">
                <el-select v-model="ruleForm.classNumber"
                           placeholder="班级号"
                           :clearable="true">
                  <el-option v-for="(item, index) in classNumber"
                             :key="index"
                             :label="item"
                             :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">筛选</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="textTit">
        <el-col :span="24"
                class="textList">
          <el-row>
            <el-col :span="2">
              班级概况：
            </el-col>
            <el-col :span="4">
              班级开课率：{{openrate}}
            </el-col>
            <el-col :span="4">
              班级完课率：{{completerate}}
            </el-col>
            <el-col :span="4">
              更新时间（{{updateTime}}）
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
            </el-col>
            <el-col :span="4">
              班级复购L1：{{repayL1}}
            </el-col>
            <el-col :span="4">
              班级复购L2：{{repayL2}}
            </el-col>
            <el-col :span="4">
              班级复购L3：{{repayL3}}
            </el-col>
            <el-col :span="4">
              合计：{{total}}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          学员列表
        </el-col>
        <el-col :span="5"
                :gutter="1">
          <el-row>
            <el-col :span="8"
                    style="line-height:40px">
              学员查询
            </el-col>
            <el-col :span="15">
              <el-input>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="5">
          <el-row>
            <el-col :span="8"
                    class="titleText">是否复购</el-col>
            <el-col :span="16">
              <el-select v-model="isrepay"
                         placeholder=""
                         :clearable="true">
                <el-option v-for="(item,index) in isrepayList"
                           :key="item.id"
                           :label="item.typeName"
                           :value="index">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="table-wrapper">
        <el-table :data="statusList"
                  style="width: 100%">
          <el-table-column prop="memberId"
                           label="学号">
          </el-table-column>
          <el-table-column prop="riseId"
                           label="圈外ID">
          </el-table-column>
          <el-table-column label="头像"
                           width="100%">
            <template slot-scope="scope">
              <img :src="scope.row.headimgurl"
                   class="headImg">
            </template>
          </el-table-column>
          <el-table-column label="昵称"
                           prop="nickname">
          </el-table-column>
          <el-table-column label="课程完成进度"
                           prop="courseCompletion">
          </el-table-column>
          <el-table-column prop="homeworkCompletion"
                           label="作业完成情况">
          </el-table-column>
          <el-table-column prop="repurchase"
                           label="复购情况">
          </el-table-column>
          <el-table-column prop="riseId"
                           label="问卷信息">
          </el-table-column>
          <el-table-column prop="riseId"
                           label="操作">
            <el-button type="success"
                       @click="handleChangeStatus">查看作业</el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginat">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="15"
                       layout="prev, pager, next, jumper"
                       :total="studentTotal">
        </el-pagination>
      </div>
    </el-form>
  </section>
</template>

<script>
import apiDataFilter from '../../../../libraries/apiDataFilter'
export default {
  data () {
    return {
      course: [], //项目列表
      statusList: [],
      headmaster: [], //班主任数组
      classNumber: [], //班级数组
      periods: [], //期数数组
      openrate: '', //班级开课率
      completerate: '', //班级完课率
      updateTime: '', //更新时间
      repayL1: '', //复购L1
      repayL2: '', //复购L2
      repayL3: '', //复购L3
      total: '', //总计
      isrepayList: [],
      currentPage: 1,
      isrepay: '',
      studentTotal: 0,
      ruleForm: {
        memberTypeId: '', //项目选中index
        headTeacherId: '', //班主任选中index
        classNumber: '', //班级好选中index
        term: '' //选中期数index
      },
      rules: {
        memberTypeId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        headTeacherId: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        classNumber: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        term: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getQuery()
        } else {
          return false;
        }
      });
    },
    getQuery () {
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.getQuery',
        method: 'post',
        data: this.ruleForm,
        successCallback: (res) => {
          const { msg } = res
          this.statusList = msg.userInfoDtoList
        }
      })
    },
    handleChangeStatus () {

    },
    handleCurrentChange (val) {
      console.log(val)
    },
    handleSizeChange (val) {
      console.log(val)
    },
    getCourse () {
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.getInfo',
        method: 'get',
        successCallback: (res) => {
          const { msg } = res
          this.course = msg.memberTypeList
        }
      })
    },
    mapArr (arr, setArr, str, listId, val) {
      arr.map((item, index) => {
        if (item[listId] === val) {
          item[str].map((res, i) => {
            this.$set(setArr, i, res)
          })
        }
      })
    }
  },
  watch: {
    'ruleForm.memberTypeId': {
      deep: true,
      handler: function (val) {
        this.ruleForm.term = ''
        this.ruleForm.headTeacherId = ''
        this.ruleForm.classNumber = ''
        this.periods = []
        this.mapArr(this.course, this.periods, 'termList', 'memberTypeId', val)
      }
    },
    'ruleForm.term': {
      deep: true,
      handler: function (val) {
        this.ruleForm.headTeacherId = ''
        this.ruleForm.classNumber = ''
        this.headmaster = []
        this.mapArr(this.periods, this.headmaster, 'rotateDtoList', 'term', val)
      }
    },
    'ruleForm.headTeacherId': {
      deep: true,
      handler: function (val) {
        this.ruleForm.classNumber = ''
        this.classNumber = []
        this.mapArr(this.headmaster, this.classNumber, 'classNumberList', 'headTeacherId', val)
      }
    }
    // 'ruleForm.classNumber': {

    // }
  },
  mounted () {
    this.getCourse()
  }
}
</script>

<style lang="less" scoped>
@import url("./audioCourse.less");
</style>
