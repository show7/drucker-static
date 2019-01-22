<template>
<section class="wrapper">
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
        firstReachMessage,
        firstReachNumber,
        firstReachHandleClassName,
        FirstRangeMessafe,
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
        fourthReachHandleClassName
      } = row
      this.editData = {
        firstReachMessage,
        firstReachNumber,
        firstReachHandleClassName,
        FirstRangeMessafe,
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
        fourthReachHandleClassName
      }
      this.dialogVisible = true
    },

    /**
     * 监听测试事件
     */
    handleTest () {
    },

    /**
     * 监听保存事件
     */
    handleSave () {
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./task.less');
</style>
