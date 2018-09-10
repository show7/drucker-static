<template>
  <div class="add-vip">
    <h3>添加vip会员</h3>
    <div class="vip-top">
      <el-row>
        <el-col :span="6">
          <el-input class="riseId" type="textarea" v-model="riseId" placeholder="请输入圈外Id"></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="month" placeholder="请选择会员有效期">
            <el-option
              v-for="item in [1,6,12]"
              :key="item"
              :label="item+'月'"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-model="memberTypeId" placeholder="请选择会员类型">
            <el-option
              v-for="item in memberTypeIdList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="memo" maxlength="10" placeholder="请输入用户身份（10字以内）"></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="6">
          <el-date-picker
            v-model="startDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addRiseMember">提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
export default {
  name: 'addVip',
  data () {
    return {
      riseId: '', //圈外id
      month: '', //会员有效期
      memberTypeId: '', //会员类型
      memberTypeIdList: [],
      memo: '',//用户身份
      startDate:''
    }
  },
  methods: {
    loadRiseMember () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.addVip.loadRiseMember',
        successCallback (res) {
          self.memberTypeIdList = res.msg
        }
      })
    },
    addRiseMember () {
      let self = this;
      let param = {riseId: this.riseId, memo: this.memo, month: this.month,startDate:this.startDate,
        memberTypeId: this.memberTypeId};
      ApiDataFilter.request({
        apiPath: 'manage.addVip.addRiseMember',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功')
        }
      })
    }
  },

  created () {
    this.loadRiseMember()
  }
}
</script>

<style scoped lang="less">
  @import "./addvip.less";
</style>
