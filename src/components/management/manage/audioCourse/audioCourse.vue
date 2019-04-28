<template>
  <section class="status-change-wrapper">
    <el-row :gutter="30">
      <el-col :span="5">
        <el-row>
          <el-col :span="8"
                  class="titleText">所学项目</el-col>
          <el-col :span="16">
            <el-select v-model="courseId"
                       placeholder="项目类型"
                       :clearable="true">
              <el-option v-for="(item,index) in course"
                         :key="item.id"
                         :label="item.typeName"
                         :value="index">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col :span="8"
                  class="titleText">选择期数</el-col>
          <el-col :span="16">
            <el-select v-model="periodsId"
                       placeholder="项目类型"
                       :clearable="true">
              <el-option v-for="(item, index) in periods"
                         :key="item.term"
                         :label="item.term"
                         :value="index">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col :span="8"
                  class="titleText">班级号</el-col>
          <el-col :span="16">
            <el-select v-model="classNumberId"
                       placeholder="项目类型"
                       :clearable="true">
              <el-option v-for="(item, index) in classNumber"
                         :key="item.id"
                         :label="item.headTeacherName"
                         :value="index">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="5">
        <el-row>
          <el-col :span="8"
                  class="titleText">班主任</el-col>
          <el-col :span="16">
            <el-select v-model="headmasterId"
                       placeholder="项目类型"
                       :clearable="true">
              <el-option v-for="(item, index) in headmaster"
                         :key="index"
                         :label="item"
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
                         label="圈外ID">
        </el-table-column>
        <el-table-column prop="nickName"
                         label="名称">
        </el-table-column>
        <el-table-column label="班级名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.className }}</span>
            <div v-else>
              <el-input v-model="edit.className"
                        placeholder="请输入内容"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="分组号">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.groupNo }}</span>
            <div v-else>
              <el-input v-model="edit.groupNo"
                        placeholder="请输入内容"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
      </el-table>
    </div>
  </section>
</template>

<script>
import apiDataFilter from '../../../../libraries/apiDataFilter'
export default {
  data () {
    return {
      course: [],
      courseId: '',
      statusList: [],
      headmasterId: '',
      headmaster: [],
      classNumberId: '',
      classNumber: [],
      periodsId: '',
      periods: []
    }
  },
  methods: {
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
    mapArr (arr, setArr, str, listindex) {
      arr.map((item, index) => {
        if (index === listindex) {
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
      this.mapArr(this.course, this.periods, 'termList', val)
    },
    periodsId (val) {
      this.headmasterId = ''
      this.classNumberId = ''
      this.classNumber = []
      this.mapArr(this.periods, this.classNumber, 'rotateDtoList', val)
    },
    headmasterId: function (val) {

    },
    classNumberId (val) {
      this.headmasterId = ''
      this.headmaster = []
      this.mapArr(this.classNumber, this.headmaster, 'classNumberList', val)
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
