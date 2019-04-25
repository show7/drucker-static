<template>
  <div class="invest-container">
    <el-card shadow="hover">
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理员功能</el-breadcrumb-item>
          <el-breadcrumb-item>投资圈外</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <el-form :model="investmentFrom"
               status-icon
               :rules="investmentFromRules"
               ref="investmentFrom"
               label-width="200px">
        <el-form-item label="riseId(多个换行隔开)"
                      prop="riseIds">
          <el-input type="textarea"
                    placeholder="请输入riseId(多个换行隔开)"
                    :row="4"
                    style="width:300px"
                    v-model="investmentFrom.riseIds"
                    clearable></el-input>

        </el-form-item>
        <el-form-item label="投资圈外列表:"
                      prop="investTaskId">
          <el-select v-model="investmentFrom.investTaskId"
                     style="width:300px"
                     @change="handleGetCoin"
                     placeholder="请选择">
            <el-option v-for="item in investList"
                       :key="item.id"
                       :label="item.taskName"
                       :value="item.id">
              <span style="float: left">{{ item.taskName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.contributionPoint }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额:">
          <el-input placeholder="请输入金额"
                    style="width:300px"
                    readonly
                    disabled
                    v-model="investmentFrom.contributionPoint">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitSendData('investmentFrom')">提交</el-button>
          <el-button @click="resetForm('investmentFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import apiDataFilter from "../../../../libraries/apiDataFilter";

export default {
  name: "invest",
  data () {
    return {
      investmentFrom: {
        riseIds: '',
        investTaskId: '',
        contributionPoint: ''
      },
      investmentFromRules: {
        riseIds: {
          required: true, message: '请输入riseId(多个换行隔开)', trigger: 'change'
        },
        investTaskId: {
          required: true, message: '请选择类型', trigger: 'change'
        }
      },
      investList: [],
      investId: '',
      coin: '',
      riseIds: ''
    }
  },
  methods: {
    loadInvest () {
      apiDataFilter.request({
        apiPath: 'manage.invest.investTask',
        successCallback: (res) => {
          this.investList = res.msg;
        }
      })
    },
    submitSendData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    submit () {
      const { riseIds, investTaskId, contributionPoint } = this.investmentFrom
      let param = { riseIds: riseIds.split('\n'), investTaskId, contributionPoint };
      apiDataFilter.request({
        apiPath: 'manage.invest.record',
        data: param,
        method: 'post',
        successCallback: () => {
          this.$message.success('提交成功');
          this.$refs['investmentFrom'].resetFields();
        }
      })
    },
    handleGetCoin (value) {
      this.investList.forEach((item) => {
        if (item.id === value) {
          this.investmentFrom.contributionPoint = item.contributionPoint
        }
      })
    }
  },
  created () {
    this.loadInvest();
  }
}
</script>

<style scoped lang='less'>
@import "invest.less";
</style>
