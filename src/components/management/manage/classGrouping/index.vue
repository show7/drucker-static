<template>
<div class="class-grouping-container">
  <h3>班级分组导入</h3>
  <div class="class-grouping-top">
    <el-upload
      class="upload-demo"
      action="/pc/operation/social/group/upload"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleSuccess">
      <el-button size="small" type="primary">上传EXCEL</el-button>
      <div slot="tip" class="el-upload__tip">只能上传.xls文件</div>
    </el-upload>
  </div>
</div>
</template>

<script>
export default {
  name: 'social',
  methods: {
    handleSuccess (res, file) {
      this.$message.success('上传成功')
    },
    beforeUpload (file) {
      let typeName = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      const isXLS = typeName === 'xls';
      if (!isXLS) {
        this.$message.error('只能上传.xls格式!');
      }
      return isXLS;
    }
  },
  created () {

  }
}
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
