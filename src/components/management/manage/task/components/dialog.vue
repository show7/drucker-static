<template>
<el-dialog title="编辑任务" :visible="dialogVisible" width="80%">
  <Steps>
    <Step>
      <template slot="current">
        <TaskForm/>
      </template>
      <template slot="interval">
        <TaskForm/>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <TaskForm/>
      </template>
      <template slot="interval">
        <TaskForm/>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <TaskForm/>
      </template>
      <template slot="interval">
        <TaskForm/>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <TaskForm/>
      </template>
    </Step>
  </Steps>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleSave">保 存</el-button>
  </div>
</el-dialog>
</template>

<script>
import Steps from './steps'
import Step from './step'
import TaskForm from './task-form'

export default {

  components: {
    Steps,
    Step,
    TaskForm
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
