<template>
  <section class="status-change-wrapper">
    <el-row :gutter="30">
      <el-col :span="6">
        <el-input v-model="memberId" placeholder="学籍ID"></el-input>
      </el-col>
      <el-col :span="6">
        <el-select v-model="memberTypeId" placeholder="项目类型" :clearable="true">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-button
          type="success"
          @click="handleFetchStatus"
        >
          查询学籍
        </el-button>
      </el-col>
    </el-row>
    <div class="table-wrapper">
      <el-table
        :data="statusList"
        style="width: 100%">
        <el-table-column
          prop="riseId"
          label="圈外ID">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="名称">
        </el-table-column>
        <el-table-column
          label="班级名称">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.className }}</span>
            <div v-else>
              <el-input v-model="edit.className" placeholder="请输入内容"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="分组号">
          <template slot-scope="scope">
            <span v-if="!scope.row.isEdit">{{ scope.row.groupNo }}</span>
            <div v-else>
              <el-input v-model="edit.groupNo" placeholder="请输入内容"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" v-if="!scope.row.isEdit" @click="handleEdit(scope.row)">编辑</el-button>
            <template v-else>
              <el-button type="success" @click="handleChangeStatus">提交</el-button>
              <el-button type="info" @click="() => { scope.row.isEdit = false }">取消</el-button>
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
      // 项目列表
      options: [],
      // 学籍列表
      statusList: [],
      // 学员id
      memberId: '',
      // 项目id
      memberTypeId: '',
      // 编辑的数据
      edit: {
        riseId: '',
        nickName: '',
        className: '',
        groupNo: ''
      }
    }
  },

  mounted () {
    this.getMember()
  },

  methods: {
    /**
     * 获取类型列表
     */
    getMember () {
      apiDataFilter.request({
        apiPath: 'manage.statuschange.options',
        method: 'get',
        successCallback: (res) => {
          const { msg } = res
          this.options = msg
        }
      })
    },

    /**
     * 查询学籍
     */
    handleFetchStatus () {
      if (!this.memberId || !this.memberTypeId) {
        return this.$message({
          message: '查询信息请填写完整',
          type: 'warning'
        }) 
      }
      let data = { memberId: this.memberId, memberTypeId: this.memberTypeId }
      apiDataFilter.request({
        apiPath: 'manage.statuschange.load',
        method: 'post',
        data,
        successCallback: (res) => {
          let { msg } = res
          if (msg.riseId) {
            msg = { ...msg, isEdit: false }
            this.statusList = [msg]
          }
        }
      })
    },

    /**
     * 提交修改
     */
    handleChangeStatus () {
      apiDataFilter.request({
        apiPath: 'manage.statuschange.update',
        method: 'post',
        data: this.edit,
        successCallback: (res) => {
          this.handleFetchStatus()
        }
      })
    },

    /**
     * 编辑学籍信息
     */
    handleEdit (row) {
      this.statusList = this.statusList.map(status => {
        if (status.riseId === row.riseId) {
          return { ...status, isEdit: true }
        } else {
          return { ...status, isEdit: false }
        }
      })
      this.edit = { ...row }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./statusChange.less');
</style>
