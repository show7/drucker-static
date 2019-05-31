<template>
  <div class="sales-order-component">
    <el-card shadow="hover">
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>业务管理</el-breadcrumb-item>
          <el-breadcrumb-item>销售订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br>
    <el-card shadow="hover">
      <el-form ref="screenForm"
               :model="screenForm"
               :inline="true">
        <el-col :span="8">
          <el-form-item label="选择班主任"
                        prop="teacher">
            <el-select v-model="screenForm.teacher"
                       placeholder="请选择班主任">
              <el-option v-for="item in teacherList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学员查询">
            <el-select v-model="screenForm.studentInfoType"
                       placeholder="选择查询类型">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="">
            <el-input v-model="screenForm.studentInfo"
                      placeholder="学员昵称/ID/学号"></el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item label="支付时间"
                          prop="paymentDate">
              <el-date-picker v-model="screenForm.paymentDate"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-button type="primary">筛选报表</el-button>
            <el-button type="primary">导出报表</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="圈外ID">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户微信昵称">
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
        <el-table-column label="体验课班级">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="成单社群运营">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="购买课程">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="支付时间">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="实际支付金额（元）">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="退款金额（元）">
          <template slot-scope="scope">
            {{scope}}
          </template>
        </el-table-column>
        <el-table-column label="实收金额（元）">
          <template slot-scope="scope">
            {{scope}}
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
  name: 'salesOrder',
  data () {
    return {
      screenForm: {
        paymentDate: [],
        teacher: '',
        studentInfoType: 1
      },
      screenRules: {
        paymentDate: { required: true, message: '请输入支付日期', trigger: 'change' },
        teacher: { required: true, message: '请选择班主任', trigger: 'change' },
        studentInfo: { required: true, message: '学员昵称/ID/学号', trigger: 'change' }
      },
      teacherList: [
        { value: '1', label: '' },
        { value: '', label: '' }
      ],
      studentInfoTypeList: [

      ],
      tableData: [
        {
          riseId: '12121',
          userNickName: '昵称',//用户昵称
          classNumber: '121',//体验课班级
          teacherInfo: {
            teacherName: '灭霸', //班主任姓名
            teacherNickName: '灭霸爸爸' //班主任昵称
          },
          buyCourse: 'L1项目', //购买项目
          paymentDate: '2018-10-21', //支付日期
          amountReceived: '1200', //实际支付金额
          efundAmount: '1200', //退款金额
          AmountReceived: '1200'//实收金额
        }
      ]
    }
  }
}
</script>
<style lang="less">
@import "./salesOrder.less";
</style>

