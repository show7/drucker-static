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
                       @click="submitForm('ruleForm')"
                       style="margin-top:42px">筛选</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="border-top: 2px solid #7DBE00;padding-top:8px"
              v-show="classmatePracticePlanDto.length > 0">
        <el-col :span="2"
                style="margin-top:10px">
          班级概况：
        </el-col>
      </el-row>
      <el-row class="textTit">
        <el-col :span="24"
                class="textList">
          <el-row>
            <el-col v-for="(item,index) in classmatePracticePlanDto"
                    :key="index"
                    :span="4">
              学习第{{item.series}}节：{{item.complete}}/{{item.total}}
            </el-col>
          </el-row>
          <el-row v-show="studentTotal > 0">
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
      <el-row style="margin-top:20px">
        <el-col :span="7"
                style="margin-top:10px;height:40px">
          学员列表
        </el-col>
        <el-form :model="selectForm"
                 :rules="selectRules"
                 ref="ruleFormData">
          <el-col :span="8"
                  :gutter="1">
            <el-row>
              <el-col :span="18">
                <el-form-item label="学员查询"
                              prop="studentSearch"
                              class="flexLine">
                  <el-select v-model="selectForm.studentSearch"
                             placeholder="学员昵称/圈外ID/学号"
                             :clearable="true">
                    <el-option v-for="(item, index) in studentSearch"
                               :key="index"
                               :label="item.text"
                               :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <el-input v-model="searchStr"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-row>
              <el-col :span="24"
                      class="titleText">
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否复购"
                              prop="isrepay"
                              class="flexLine">
                  <el-select v-model="selectForm.isrepay"
                             placeholder="是否复购"
                             :clearable="true">
                    <el-option v-for="(item, index) in getrepay"
                               :key="index"
                               :label="item.text"
                               :value="item.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button type="primary"
                         @click="submitFormSearch('ruleFormData')"
                         style="margin:0 auto;display:block">筛选</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="table-wrapper">
        <el-table :data="nowList"
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
            <template slot-scope="scope">
              <div>
                <a v-if="!scope.row.enrolment"
                   class="viewReport"
                   @click="viewReport">查看问卷</a>
                <a v-else>未填写问卷</a>
              </div>
            </template>
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
                       :page-size="pageSize"
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
      searchStr: '',
      studentSearch: [{ type: 1, text: '学员昵称' }, { type: 2, text: '圈外ID' }, { type: 3, text: '学号' }],
      getrepay: [{ type: 0, text: '全部' }, { type: 1, text: '已复购' }, { type: 2, text: '未复购' }],
      nowList: [],
      pageSize: 15,
      classmatePracticePlanDto: [],
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
          { required: true, message: '请选择期数', trigger: 'change' }
        ],
        classNumber: [
          { required: true, message: '请选择班主任', trigger: 'change' }
        ],
        term: [
          { required: true, message: '请选择班号', trigger: 'change' }
        ]
      },
      selectForm: {
        studentSearch: '',
        isrepay: ''
      },
      selectRules: {
        studentSearch: [
          { required: true, message: '请输入学员信息', trigger: 'change' }
        ],
        isrepay: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    viewReport () {

    },
    submitFormSearch (formName) {
      this.getSearch()
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.getSearch()
      //   } else {
      //     return false;
      //   }
      // });
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getQuery()
        } else {
          return false;
        }
      });
    },
    getSearch () {
      let _obj = {}
      if (this.selectForm.studentSearch === 1) {
        _obj = {
          nickname: this.searchStr
        }
      } else if (this.selectForm.studentSearch === 2) {
        _obj = {
          riseId: this.searchStr
        }
      } else if (this.selectForm.studentSearch === 3) {
        _obj = {
          memberId: this.searchStr
        }
      }
      let requestObj = Object.assign(_obj, { repurchase: this.selectForm.isrepay }, this.ruleForm)
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.getQuery',
        method: 'post',
        data: requestObj,
        successCallback: (res) => {
          const { msg } = res
          this.studentTotal = msg.userInfoDtoList !== null ? msg.userInfoDtoList.length : 0
          this.statusList = msg.userInfoDtoList
          this.handleCurrentChange()
          this.classmatePracticePlanDto = msg.classmatePracticePlanDto
          this.repayL1 = msg.repurchaseL1
          this.repayL2 = msg.repurchaseL2
          this.repayL3 = msg.repurchaseL3
          this.total = msg.repurchaseTotal
        }
      })
    },
    getQuery () {
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.getQuery',
        method: 'post',
        data: this.ruleForm,
        successCallback: (res) => {
          const { msg } = res
          this.studentTotal = msg.userInfoDtoList !== null ? msg.userInfoDtoList.length : 0
          this.statusList = msg.userInfoDtoList
          this.handleCurrentChange()
          this.classmatePracticePlanDto = msg.classmatePracticePlanDto
          this.repayL1 = msg.repurchaseL1
          this.repayL2 = msg.repurchaseL2
          this.repayL3 = msg.repurchaseL3
          this.total = msg.repurchaseTotal
        }
      })
    },
    handleChangeStatus () {

    },
    handleCurrentChange (val) {
      this.nowList = this.statusList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
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
