<template>

  <div class="coupon-container">
    <el-card shadow="hover">
      <el-row>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>高级功能</el-breadcrumb-item>
          <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加优惠券</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br>
    <br>
    <el-card shadow="hover">
      <el-form :model="couponFrom"
               status-icon
               :rules="couponFromRules"
               ref="couponFrom"
               label-width="200px"
               class="demo-ruleForm">
        <el-form-item label="优惠劵截止日期"
                      prop="expiredDate">
          <el-date-picker v-model="couponFrom.expiredDate"
                          value-format="yyyy-MM-dd"
                          type="date"
                          style="width:300px"
                          placeholder="选择日期"></el-date-picker>

        </el-form-item>
        <el-form-item label="优惠劵金额"
                      prop="amount">
          <el-input type="text"
                    placeholder="请输入金额"
                    maxlength="11"
                    step="0.01"
                    style="width:300px"
                    v-model="couponFrom.amount"
                    clearable></el-input>

        </el-form-item>
        <el-form-item label="优惠劵类型">
          <el-select v-model="couponFrom.category"
                     clearable
                     style="width:300px"
                     placeholder="请选择">
            <el-option v-for="(item,i) in couponType"
                       :key="i"
                       :label="item.category"
                       :value="item.category==='全场通用优惠劵'? '':item.category">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="学员的圈外id(换行隔开)"
                      prop="riseIdList">
          <el-input type="textarea"
                    placeholder="请输入学员的圈外id"
                    style="width:300px"
                    :row="4"
                    v-model="couponFrom.riseIdList"
                    clearable></el-input>

        </el-form-item>
        <el-form-item label="优惠劵描述"
                      prop="description">
          <el-input type="textarea"
                    placeholder="请输入优惠劵描述"
                    maxlength="20"
                    style="width:300px"
                    :row="4"
                    v-model="couponFrom.description"
                    clearable></el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitSendData('couponFrom')">发送优惠劵</el-button>
          <el-button @click="resetForm('couponFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'coupon',

  data () {
    let checkAmount = (rule, value, callback) => {
      if (value) {
        let rgx = /^\d+(\.\d{1,2})?$/;
        if (!value.match(rgx)) {
          return callback(new Error('请检查输入格式，不能为空，且最多两位位小数'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请检查输入格式，金额不能为空'))
      }
    };
    const expiredDate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`
    return {
      couponFrom: {
        expiredDate,
        amount: '',
        riseIdList: '',
        description: '',
        category: '',
        couponType: []
      },
      couponFromRules: {
        expiredDate: { required: true, message: '请选择优惠券截止日期', trigger: 'blur' },
        amount: { validator: checkAmount, trigger: 'change' },
        riseIdList: { required: true, message: '请输入学员的圈外id(换行隔开)', trigger: 'blur' },
        description: { required: false, message: '请输入优惠劵描述', trigger: 'blur' }
      },
      couponType: []

    }
  },
  methods: {
    /*获取优惠券类型*/
    getLoadType () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.coupon.loadType',
        successCallback (res) {
          self.couponType = [{ category: '全场通用优惠劵' }, ...res.msg]
          // self.couponTypeList = res.msg;
          console.log(res)
        }
      })
    },
    submitSendData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSendData()
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    /*添加优惠券*/
    handleSendData () {
      let self = this;
      const { amount, description, category, expiredDate, riseIdList } = this.couponFrom
      let param = { amount, description, category, expiredDate, riseIdList: riseIdList.split('\n') }
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
      if (!this.amount || !this.description || !this.expiredDate || !this.riseIdList) {
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
