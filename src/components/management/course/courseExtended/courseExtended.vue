<template>
  <div class="course-extended-container">
    <h3>拓展学习</h3>
    <div class="course-extended-top">
      <el-select v-model="searchCourseTitleValueId" placeholder="请选择课程">
        <el-option v-for="item in courseTitleList" :key="item.id" :label="item.abbreviation" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="course-extended-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAddNew">新增</el-button>
      </div>
      <!--table列表-->
      <el-table
        :data="courseList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180">
          序号
        </el-table-column>
        <el-table-column
          prop="abbreviation"
          label="课程"
          width="180">
        </el-table-column>
        <el-table-column
          prop="section"
          label="课程介绍">
          <template slot-scope="scope">
            <div class="content-box">
              <p class="content">{{scope.row.descriptionString}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
        prop="section"
        label="位置">
        </el-table-column>
        <el-table-column width="150" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          </template>

        </el-table-column>
      </el-table>

      <!--新增编辑弹框-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        width="40%">
        <div class="pop-out">

        </div>
        <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
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
        title:'新增',
        dialogVisible:false
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
