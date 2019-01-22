<template>
  <el-form :inline="true">
    <el-form-item label="人数">
      <el-input-number :min="1" :max="10"></el-input-number>
    </el-form-item>
    <el-form-item label="类名">
      <el-select></el-select>
    </el-form-item>
    <el-form-item label="消息">
      <el-input
        class="textarea"
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        :autosize="{ minRows: 3, maxRows: 3}"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">测试</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    // 最小人数
    min: {
      type: Number,
      required: false,
      default: 0
    },

    // 最大人数
    max: {
      type: Number,
      required: false,
      default: 0
    },

    // 当前人数
    current: {
      type: Number,
      required: false,
      default: 0
    },

    // 类名
    className: {
      type: String,
      required: false,
      default: ''
    },

    // 消息
    message: {
      type: String,
      required: false,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./task-form.less");
</style>
