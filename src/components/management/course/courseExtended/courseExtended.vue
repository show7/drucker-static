<template>
  <div class="course-extended-container">
    <h3>拓展学习</h3>
    <div class="course-extended-top">
      <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程">
        <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import ApiDataFilter from '../../../../libraries/apiDataFilter'
  export default {
    name: "courseExtended",
    data() {
      return {
        courseTitleList:[],
        searchCourseTitleValueId:null,
      }
    },
    methods: {
      // 获取小课名称列表
      getData () {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'common.simple',
          successCallback (res) {
            self.courseTitleList = res.msg;
            /*self.getList(self.courseTitleList[0].id);*/
            self.searchCourseTitleValueId = self.courseTitleList[0].id
          }
        });
      },
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped lang='less'>
  @import "courseExtended.less";
</style>
