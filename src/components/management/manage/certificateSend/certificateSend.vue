<template>
  <div class="certificate-send">
    <h3>证书发送</h3>
    <div class="send-top">
      <el-row>
        <el-col :span="8">
          <p>证书年份</p>
          <el-select v-model="certificateYear" placeholder="请选择证书年份">
            <el-option
              v-for="item in certificateYearList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>证书月份</p>
          <el-select v-model="certificateMonth" placeholder="请选择证书月份">
            <el-option
              v-for="item in certificateMonthList"
              :key="item"
              :label="item+'月'"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <p>生成学习项目</p>
          <el-select v-model="certificateProject" placeholder="请选择生成学习项目">
            <el-option
              v-for="item in certificateProjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="handleShowtitle(1)">发送证书</el-button>
          <el-button type="primary" @click="handleShowtitle(2)">发送全勤奖</el-button>
         </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false">
      <span>{{title}}</span>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleSendData">确 定</el-button>
       </span>
    </el-dialog>

  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
export default {
  name: 'certificateSend',
  data () {
    return {
      certificateYear: 2018, // 请选择证书年份
      certificateYearList: [], //证书年份list
      certificateMonth: 1, // 请选择证书月份
      certificateMonthList: [], // 月份list
      certificateProject: '', //请选择生成学习项目
      certificateProjectList: [{id: 3, name: '核心能力项目'}, {id: 12, name: 'L1项目'}, {
        id: 10, name: 'L2项目' }, {id: 8, name: 'L3项目'}], //项目list
      dialogVisible: false,
      title: '',
      index: null
    }
  },
  methods: {
    getYearList () {
      let date = new Date();
      let year = date.getFullYear() - 2;
      for (let i = 0; i < 3; i++) {
        year += 1;
        this.certificateYearList.push(year);
      }
      for (let i = 1; i < 13; i++) {
        let month = i;
        this.certificateMonthList.push(month);
      }
    },
    certificate (apiPath) {
      let self = this;
      let param = {year: this.certificateYear, month: this.certificateMonth, memberTypeId: this.certificateProject};
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: param,
        successCallback (res) {
          self.dialogVisible = false;
          self.$message.success('恭喜你，这是一条成功消息');
        }
      })
    },
    /*更换标题*/
    handleShowtitle (index) {
      this.dialogVisible = true;
      this.index = index;
      if (index === 0) {
        this.title = `点击生成${this.certificateYear} 年${this.certificateMonth} 月的证书`
      } else if (index === 1) {
        this.title = `点击发送${this.certificateYear} 年${this.certificateMonth} 月的证书（将会发送模板消息通知学员，谨慎操作）`
      } else if (index === 2) {
        this.title = `点击发送${this.certificateYear} 年${this.certificateMonth} 月的全勤奖（将会发送模板消息通知学员，谨慎操作）`
      }
    },
    /*发送数据*/
    handleSendData () {
      if (!this.certificateProject){
        this.$message.error('请选择项目');
        return
      }
      if (this.index === 0) {
        this.certificate('manage.certificateSend.generateCertificate')
      } else if (this.index === 1) {
        this.certificate('manage.certificateSend.sendCertificate')
      } else if (this.index === 2) {
        this.certificate('manage.certificateSend.Attendance')
      }
    }
  },
  created () {
    this.getYearList();
  }
}
</script>

<style scoped lang="less">
  @import "./certificateSend.less";
</style>
