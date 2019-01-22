<template>
<section class="wrapper">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="ActivityChineseName" label="推广活动名"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)" type="success">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Dialog
    :dialogVisible="dialogVisible"
    @test="handleTest"
    @save="handleSave"
  />
</section>
</template>

<script>
import Dialog from './components/dialog'

export default {

  components: {
    Dialog
  },

  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },

  methods: {
    /**
     * 编辑按钮点击
     */
    handleEdit (row) {
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
