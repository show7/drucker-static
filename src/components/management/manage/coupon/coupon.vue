<template>
    <div class="coupon-container">
      <h3>创建优惠券</h3>
      <div class="coupon-top">
        <el-row>
          <el-col :span="6">
            <h4>优惠券截止日期</h4>
            <el-date-picker v-model="expiredDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="6">
            <h4>优惠券金额</h4>
            <el-input type="number" placeholder="请输入内容" v-model="amount" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <h4>学员id(以英文,逗号隔开)</h4>
            <el-input placeholder="请输入内容" v-model="riseIdList" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <h4>优惠券描述</h4>
            <el-input type="textarea" placeholder="请输入内容" v-model="description" clearable></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" @click="handleCheck">提交</el-button>
      </div>
    </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'coupon',
  data () {
    return {
      amount: '',
      description: '', //优惠券描述
      expiredDate: '',
      riseIdList: ''
    }
  },
  methods: {
    handleSendData () {
      let self = this;
      let param = {amount: this.amount, description: this.description, expiredDate: this.expiredDate, riseIdList: this.riseIdList.split(',')}
      ApiDataFilter.request({
        apiPath: 'manage.couponAdd',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('添加成功')
        }
      })
    },
    handleCheck () {
      if (!this.amount || !this.description || !this.expiredDate || !this.riseIdList) {
        this.$message.error('请填写完整')
        return
      }
      this.handleSendData();
    }
  }
}
</script>

<style scoped lang='less'>
@import "coupon.less";
</style>
