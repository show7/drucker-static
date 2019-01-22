<template>
<section class="wrapper">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="ActivityChineseName" label="推广活动名"></el-table-column>
    <el-table-column label="编辑">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Dialog
    :dialogVisible="dialogVisible"
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
      dialogVisible: true
    };
  },

  methods: {
    /**
     * 编辑按钮点击
     */
    handleEdit (row) {
    }
  }
};
</script>

<style lang="less" scoped>
@import url('./task.less');
</style>
