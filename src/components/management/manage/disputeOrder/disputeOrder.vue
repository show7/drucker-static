<template>
  <div class="dispute-order-wrap">
    <el-card shadow="hover">

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
        <el-breadcrumb-item>业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>争议订单认领</el-breadcrumb-item>
      </el-breadcrumb>

    </el-card>
    <el-card shadow="hover">
      <el-form ref="queryForm"
               :inline="true"
               :model="queryForm">

        <el-col :span="6">
          <el-form-item label="学员查询">
            <el-input v-model="queryForm.name"
                      placeholder="学员昵称/ID/学号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="购买项目">
            <el-select v-model="queryForm.region"
                       placeholder="请选择购买项目">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="认领状态">
            <el-select v-model="queryForm.region"
                       placeholder="请选择认领状态">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">查询</el-button>
        </el-col>

      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="日期"
                         width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名"
                         width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover"
                        placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'disputeOrder',
  data () {
    return {
      queryForm: {}
    }
  }
}
</script>
<style lang="less">
@import "./disputeOrder.less";
</style>

