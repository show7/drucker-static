<template>
  <section class="status-change-wrapper">
    <el-form :model="ruleForm"
             :rules="rules">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-row>
            <el-col :span="24">
              <el-form-item label="所学项目"
                            prop="region">
                <el-select v-model="courseId"
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
              <el-form-item label="所学项目"
                            prop="region">
                <el-select v-model="periodsId"
                           placeholder="项目类型"
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
              <el-form-item label="所学项目"
                            prop="region">
                <el-select v-model="classNumberId"
                           placeholder="项目类型"
                           :clearable="true">
                  <el-option v-for="item in classNumber"
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
              <el-form-item label="所学项目"
                            prop="region">
                <el-select v-model="headmasterId"
                           placeholder="项目类型"
                           :clearable="true">
                  <el-option v-for="(item, index) in headmaster"
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
          <el-button type="primary"
                     @click="getQuery">筛选</el-button>
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
          <el-table-column prop="riseId"
                           label="学号">
          </el-table-column>
          <el-table-column prop="nickName"
                           label="圈外ID">
          </el-table-column>
          <el-table-column label="头像">
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">{{ scope.row.className }}</span>
              <div v-else>
                <el-input v-model="edit.className"
                          placeholder="请输入内容"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="昵称">
            <template slot-scope="scope">
              <span v-if="!scope.row.isEdit">{{ scope.row.groupNo }}</span>
              <div v-else>
                <el-input v-model="edit.groupNo"
                          placeholder="请输入内容"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="课程完成进度">
            <template slot-scope="scope">
              <el-button type="primary"
                         v-if="!scope.row.isEdit"
                         @click="handleEdit(scope.row)">编辑</el-button>
              <template v-else>
                <el-button type="success"
                           @click="handleChangeStatus">提交</el-button>
                <el-button type="info"
                           @click="() => { scope.row.isEdit = false }">取消</el-button>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="riseId"
                           label="作业完成情况">
          </el-table-column>
          <el-table-column prop="riseId"
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
      courseId: '', //项目选中index
      statusList: [],
      headmasterId: '', //班主任选中index
      headmaster: [], //班主任数组
      classNumberId: '', //班级好选中index
      classNumber: [], //班级数组
      periodsId: '', //选中期数index
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
      rules: {
        course: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getQuery () {
      apiDataFilter.request({
        apiPath: 'manage.classScheduling.getQuery',
        method: 'post',
        successCallback: (res) => {
          const { msg } = res
          console.log(msg)
          // this.statusList = msg.memberTypeList
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
    courseId: function (val) {
      this.periodsId = ''
      this.headmasterId = ''
      this.classNumberId = ''
      this.periods = []
      this.mapArr(this.course, this.periods, 'termList', 'memberTypeId', val)
    },
    periodsId (val) {
      this.headmasterId = ''
      this.classNumberId = ''
      this.classNumber = []
      this.mapArr(this.periods, this.classNumber, 'rotateDtoList', 'term', val)
    },
    headmasterId: function (val) {

    },
    classNumberId (val) {
      this.headmasterId = ''
      this.headmaster = []
      this.mapArr(this.classNumber, this.headmaster, 'classNumberList', 'headTeacherId', val)
    }

  },
  mounted () {
    this.getCourse()
  }
}
</script>

<style lang="less" scoped>
@import url("./audioCourse.less");
</style>
