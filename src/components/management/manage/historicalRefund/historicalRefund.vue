<template>
  <div>
    <el-card shadow="hover">
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>历史订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <el-card shadow="hover">
      <el-form :modules="screenForm"
               red="screenForm"
               :inline="true">

        <el-col :span="12">

          <el-form-item label="退款时间">
            <el-date-picker v-model="value3"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6"
                :offset="3">
          <el-form-item>
            <el-button type="primary">筛选报表</el-button>
            <el-button type="primary">导出报表</el-button>
          </el-form-item>
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
  name: 'historicalRefund',
  data () {
    return {
      screenForm: {

      },
      tableData: []
    }
  }
}
</script>
<style lang="less">
</style>


