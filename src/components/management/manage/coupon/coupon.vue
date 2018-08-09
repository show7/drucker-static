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
            <h4>优惠券类型</h4>
            <el-select v-model="couponConfigId" placeholder="请选择">
              <el-option v-for="item in couponTypeList" :key="item.id" :label="item.description" :value="item.id"></el-option>
            </el-select>

          </el-col>
          <el-col :span="6">
            <h4>学员id(换行隔开)</h4>
            <el-input  type="textarea"  placeholder="请输入内容" :row="4" v-model="riseIdList" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>优惠券描述</h4>
            <el-input type="textarea" placeholder="请输入内容" v-model="description" clearable></el-input>
          </el-col>
          <el-col :span="12" class="button-send">
            <el-button type="primary" @click="handleCheck">提交</el-button>
          </el-col>
        </el-row>

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
      riseIdList: '',
      couponTypeList: [], //优惠券类型
      couponConfigId: null//类型id
    }
  },
  methods: {
    /*获取优惠券类型*/
    getLoadType () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.coupon.loadType',
        successCallback (res) {
          self.couponTypeList = res.msg;
        }
      })
    },
    /*添加优惠券*/
    handleSendData () {
      let self = this;
      let param = {amount: this.amount, description: this.description, expiredDate: this.expiredDate, riseIdList: this.riseIdList.split('\n'), couponConfigId: this.couponConfigId}
      ApiDataFilter.request({
        apiPath: 'manage.coupon.couponAdd',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('添加成功')
        }
      })
    },
    /*查看数据填写完整*/
    handleCheck () {
      if (!this.amount || !this.description || !this.expiredDate || !this.riseIdList || !this.couponConfigId) {
        this.$message.error('请填写完整')
        return
      }
      this.handleSendData();
    }
  },
  created () {
    this.getLoadType()
  }
}
</script>

<style scoped lang='less'>
@import "coupon.less";
</style>
