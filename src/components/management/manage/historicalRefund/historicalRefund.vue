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
      <el-table :data="tableData">
        <el-table-column label="圈外ID"
                         prop="riseId">
        </el-table-column>
        <el-table-column label="用户微信昵称"
                         prop="nickName">
        </el-table-column>
        <el-table-column label="体验课班级"
                         prop="audioCourse">
        </el-table-column>
        <el-table-column label="分享人信息"
                         prop="shareInfo">
        </el-table-column>
        <el-table-column label="购买课程"
                         prop="purchase">
        </el-table-column>
        <el-table-column label="支付时间"
                         prop="payTime">
        </el-table-column>
        <el-table-column label="实际支付金额（元）"
                         prop="totalPay">
        </el-table-column>
        <el-table-column label="退款金额（元）"
                         prop="payBack">
        </el-table-column>
        <el-table-column label="实收金额（元）"
                         prop="totalGet">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配订单"
               :visible.sync="editVisible"
               :close-on-click-modal="false"
               width="30%">
      <el-form :model="itemData"
               :rules="rules">
        <div class="popout">
          <el-row>
            <el-col :span="18">
              <el-form-item label="riseId"
                            prop="riseId">
                <el-input v-model="itemData.riseId"
                          placeholder="请输入riseId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="真实姓名"
                            prop="nickName">
                <el-input v-model="itemData.nickName"
                          placeholder="请输入真实姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="手机"
                            prop="phone">
                <el-input v-model="itemData.phone"
                          placeholder="请输入手机"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="部门"
                            prop="department">
                <el-select v-model="itemData.department"
                           placeholder="请选择公众号"
                           clearable
                           filterable>
                  <el-option v-for="item in department"
                             :key="item.name"
                             :label="item.name"
                             :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="职位"
                            prop="position">
                <el-select v-model="itemData.position"
                           placeholder="请选择公众号"
                           clearable
                           filterable>
                  <el-option v-for="item in position"
                             :key="item.name"
                             :label="item.name"
                             :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="组长"
                          prop="leader">
              <el-select v-model="itemData.leader"
                         placeholder="请选择组长"
                         @change="handleSelect"
                         clearable
                         filterable
                         remote
                         reserve-keyword
                         :remote-method="getLeader">
                <el-option v-for="item in leader"
                           :key="item.name"
                           :label="item.name"
                           :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </div>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleSubmit(false)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'historicalRefund',
  data () {
    return {
      screenForm: {

      },
      tableData: [{ riseId: '123123', nickName: 'yuyu', audioCourse: 'qweasd', shareInfo: 'asdzxc', purchase: 'tushu', payTime: '2019', totalPay: '100', payBack: '50', totalGet: '50' }],
      value3: ''
    }
  }
}
</script>
<style lang="less">
</style>
