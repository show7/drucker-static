<template>
  <div class="role">
    <h3>身份管理</h3>
    <div class="content-box">
      <el-row>
        <!--<el-col :span="5" class="grid-content-left">-->
        <!--<el-button type="primary" @click="handleSearch">搜索</el-button>-->
        <!--</el-col>-->
        <el-col :span="12">
          <div class="grid-content-right">
            <el-button type="primary" size="medium" @click="addUserRole">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!--table表格-->
      <el-table
        :data="userRoleList"
        style="width: 100%">
        <el-table-column
          prop="name"
          width="150"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="nickname"
          width="150"
          label="身份">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleOnDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'

  export default {
    name: 'role',
    data() {
      return {
        userRoleList: []
      }
    },
    methods: {
      addUserRole() {
        console.log('添加用户身份');
      },
      handleOnEdit(index, row) {
        console.log(index, row);
      },
      handleOnDelete(index, row) {
        console.log(index, row);
      }

    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  @import "./role.less";
</style>
