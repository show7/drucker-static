<template>
<el-dialog title="编辑任务" :visible="dialogVisible">
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleSave">保 存</el-button>
  </div>
</el-dialog>
</template>

<script>
import Steps from './steps'

export default {

  components: {
    Steps
  },
  
  props: {
    dialogVisible: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    /**
     * 保存按钮点击
     */
    handleSave () {
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./dialog.less');
</style>
