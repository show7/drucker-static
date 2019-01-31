<template>
<section class="wrapper">
  <el-button @click="handleAdd" type="primary">新增</el-button>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="activityChineseName" label="推广活动名"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="success">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Dialog
    :edit-data="editData"
    :dialog-visible="dialogVisible"
    @test="handleTest"
    @save="handleSave"
    @close="dialogVisible = false"
  />
</section>
</template>

<script>
import Dialog from './components/dialog'
import apiDataFilter from '../../../../libraries/apiDataFilter'

export default {

  components: {
    Dialog
  },

  data() {
    return {
      tableData: [],
      dialogVisible: false,
      editData: {}
    };
  },

  mounted () {
    this.getTaskList()
  },

  methods: {
    /**
     * 获取列表数据
     */
    getTaskList () {
      apiDataFilter.request({
        apiPath: 'manage.task.load',
        successCallback: (res) => {
          const { msg } = res
          this.tableData = msg
        }
      })
    },

    /**
     * 编辑按钮点击
     */
    handleEdit (row) {
      const {
        id,
        firstReachMessage,
        firstReachNumber,
        firstReachHandleClassName,
        firstRangeMessage,
        secondReachMessage,
        secondReachNumber,
        secondReachHandleClassName,
        secondRangeMessage,
        thirdReachMessage,
        thirdReachNumber,
        thirdReachHandleClassName,
        thirdRangeMessage,
        fourthReachMessage,
        fourthReachNumber,
        fourthReachHandleClassName,
        activityChineseName,
        activity,
        promotionImg,
        posterTemplateType,
        offlineMessage,
        welcomeWord
      } = row
      this.editData = {
        id,
        firstReachMessage,
        firstReachNumber,
        firstReachHandleClassName,
        firstRangeMessage,
        secondReachMessage,
        secondReachNumber,
        secondReachHandleClassName,
        secondRangeMessage,
        thirdReachMessage,
        thirdReachNumber,
        thirdReachHandleClassName,
        thirdRangeMessage,
        fourthReachMessage,
        fourthReachNumber,
        fourthReachHandleClassName,
        activityChineseName,
        activity,
        promotionImg,
        posterTemplateType,
        offlineMessage,
        welcomeWord
      }
      this.dialogVisible = true
    },

    /**
     * 新增按钮点击
     */
    handleAdd () {
      this.editData = {
        id: '',
        firstReachMessage: "",
        firstReachNumber: 0,
        firstReachHandleClassName: "",
        firstRangeMessage: "",
        secondReachMessage: "",
        secondReachNumber: 0,
        secondReachHandleClassName: "",
        secondRangeMessage: "",
        thirdReachMessage: "",
        thirdReachNumber: 0,
        thirdReachHandleClassName: "",
        thirdRangeMessage: "",
        fourthReachMessage: "",
        fourthReachNumber: 0,
        fourthReachHandleClassName: "",
        activityChineseName: "",
        activity: "",
        promotionImg: "",
        posterTemplateType: "",
        offlineMessage: "",
        welcomeWord: ""
      }
      this.dialogVisible = true
    },

    /**
     * 监听测试事件
     */
    handleTest (data) {
      apiDataFilter.request({
        apiPath: 'manage.task.test',
        method: 'post',
        data,
        successCallback: (res) => {
          this.$message({
            message: '测试消息发送成功',
            type: 'success'
          }) 
        }
      })
    },

    /**
     * 监听保存事件，如果id为空为新增，id不为空为编辑
     */
    handleSave (data) {
      apiDataFilter.request({
        apiPath: 'manage.task.update',
        method: 'post',
        data,
        successCallback: (res) => {
          this.dialogVisible = false
          this.getTaskList()
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./task.less');
</style>
