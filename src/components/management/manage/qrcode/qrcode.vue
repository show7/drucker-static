<template>
  <div class="qrcode">
    <h3>推广二维码</h3>
    <div class="qrcode-top">
      <el-row>
        <el-col :span="8">
          <h4>渠道选择</h4>
          <el-select v-model="channelId"
                     placeholder="请选择渠道"
                     :clearable="true">
            <el-option v-for="item in channels"
                       :key="item.id"
                       :label="item.channelName"
                       :value="item.id"></el-option>
          </el-select>
        </el-col>
        <template v-if="!!channel && !member">
          <el-col :span="8">
            <h4>标签(不可输入#、|)</h4>
            <el-input v-model="defaultValue"
                      placeholder="请输入标签"
                      @input="handleChangeLabel"></el-input>
          </el-col>
        </template>
        <el-col :span="8"
                v-if="!!member">
          <h4>课程选择(必填)</h4>
          <el-form :model="ruleForm"
                   :rules="rules"
                   ref="ruleForm">
            <el-form-item prop="project">
              <el-select v-model="ruleForm.project"
                         placeholder="请选择渠道"
                         :clearable="true"
                         @clear="clearCourse"
                         filterable>
                <el-option v-for="item in memberLabelList"
                           :key="item.id"
                           :label="item.labelName"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <br />
      <el-row v-if="!!channel">
        <template>
          <h4>参数</h4>
          <el-col :span="8"
                  v-for="(item, index) in parameters"
                  :key="index"
                  style="margin:8px 0">
            <el-input v-model="parameters[index]"
                      placeholder="请输入标签"
                      @input="parameterChange(index)"></el-input>
          </el-col>
        </template>
      </el-row>
      <el-button type="primary"
                 @click="addParameter"
                 v-if="!!channel">添加</el-button>
      <el-button type="primary"
                 @click="reduceParameter"
                 v-if="!!channel">删除</el-button>
      <br />
      <el-row>
        <el-col :span="8">
          <h4>英文活动名和编号（格式例如：subscribe_push_1）</h4>
          <el-input v-model="scene"
                    :disabled="!!channel"
                    placeholder="请输入英文活动名和编号"></el-input>
        </el-col>
        <el-col :span="8">
          <h4>中文活动名称</h4>
          <el-input v-model="remark"
                    placeholder="请输入中文活动名称"></el-input>
        </el-col>
        <el-col :span="8">
          <h4>选择微信公众号</h4>
          <el-select v-model="serviceId"
                     placeholder="请选择微信公众号">
            <el-option v-for="item in serviceList"
                       :key="item.serviceId"
                       :label="item.name"
                       :value="item.serviceId">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="qrcode-content">
      <div class="single"
           v-for="(item,index) in ruleList"
           :key="index">
        <el-row>
          <el-col :span="12">
            <div class="nickname-url">
              <p>预置变量：{nickname} 昵称,{url}跳转链接 例如：你好，{nickname}即将跳转到: {url}</p>
              <el-input type="textarea"
                        class="required"
                        placeholder="请输入关注文案"
                        v-model="ruleList[index].content"
                        clearable></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="nickname-url">
              <p>{url}跳转链接</p>
              <el-input type="textarea"
                        placeholder="请输入跳转链接"
                        v-model="ruleList[index].link"
                        clearable></el-input>
            </div>
          </el-col>
        </el-row>
        <el-button v-if="index != 0"
                   type="primary"
                   icon="el-icon-delete"
                   @click="handleDel(index)">删除</el-button>
      </div>
    </div>

    <el-row>
      <el-col :span="8">
        <el-button type="primary"
                   @click="handleAdd">添加规则</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary"
                   @click="checkData">点击生成</el-button>
      </el-col>
      <el-col v-if="qrCodeObj.link"
              :span="8">
        <el-button type="primary"
                   @click="dialogVisible=true">查看二维码</el-button>
      </el-col>
    </el-row>

    <el-dialog title="右击图片进行保存"
               :visible.sync="dialogVisible"
               width="60%">
      <div>活动链接地址：{{qrCodeObj.link}}</div>
      <div>二维码链接：{{qrCodeObj.qrCode}}</div>
      <img :src="qrCodeObj.qrCode"
           alt="二维码">
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'qrcode',
  data () {
    return {
      remark: '', //中文活动名称
      scene: '', //英文活动名称
      ruleList: [{ link: '', content: '' }],
      qrCodeObj: {
        link: '',
        qrCode: ''
      },
      dialogVisible: false,
      serviceId: 1,
      serviceList: [{ serviceId: 1, name: '圈外同学' }, { serviceId: 6, name: '圈外职场学园' }, { serviceId: 10, name: '又更新了' }, { serviceId: 13, name: '圈外职场研究所' }],
      channel: undefined,
      channelId: undefined,
      channels: [],
      defaultValue: '',
      parameters: [''],
      memberLabelList: [],
      member: undefined,
      ruleForm: {
        project: ''
      },
      rules: {
        project: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    channelId: function (val, oldVal) {
      let selectArr = this.channels.filter(item => item.id === val);
      if (selectArr.length > 0) {
        this.channel = selectArr[0];
        this.onChannelChange(selectArr[0]);
        if (selectArr[0].memberLabelList) {
          this.member = selectArr[0].memberLabelList
          this.memberLabelList = selectArr[0].memberLabelList
        } else {
          this.member = undefined
          this.memberLabelList = []
        }
      } else {
        this.channel = undefined;
        this.onChannelChange();
      }
    },
    'ruleForm.project': {
      deep: true,
      handler: function (val) {
        let selectArr = this.memberLabelList.filter(item => item.id === val);
        if (selectArr.length > 0) {
          this.handleChangeLabel(selectArr[0].label);
        }
      }
    }
  },
  methods: {
    clearCourse () {
      let _strsearch = this.scene.split('#rise#')[0].split('|')[0]
      let _strCourse = this.scene.split('#rise#')[1]
      this.scene = _strsearch + '#rise#' + _strCourse
    },
    reduceParameter () {
      if (this.parameters.length === 1) return
      this.parameters.splice(this.parameters.length - 1, this.parameters.length - 1)
      let _arr = this.scene.split('#rise#')[1].split('|')
      let scene = this.scene.split('#rise#')[0] + '#rise#'
      let _scene = ''
      _arr.map((item, index) => {
        if (index < _arr.length - 1) {
          if (index === _arr.length - 2) {
            _scene += item
          } else {
            _scene += item + '|'
          }
        }
      })
      this.scene = scene + _scene
    },
    addParameter () {
      if (this.parameters[this.parameters.length - 1] === '') return
      this.parameters.push('')
      this.scene += '|'
    },
    parameterChange (index) {
      let value = ''
      let scene = this.scene.split('#rise#')[0]
      this.parameters.map((item, index) => {
        if (index > 0) {
          value += '|' + item
        } else {
          value += item
        }
      })
      this.scene = scene + '#rise#' + value
    },
    handleAdd () {
      let ruleItem = { link: '', content: '' }
      this.ruleList.push(ruleItem)
    },
    handleDel (index) {
      this.ruleList.splice(index, 1)
    },
    canCheck () {
      if (!this.remark) {
        this.$message.error('请输入中文活动名称');
        return
      }
      if (!this.scene) {
        this.$message.error('请输入英文活动名和编号');
        return
      }
      let ruleList = [];
      this.ruleList.forEach((item, index) => {
        if (!item.content) {
          ruleList.push(item)
        }
      });
      /*  if (ruleList.length > 0) {
          this.$message.error('请填写完整必要信息');
          return
        }*/
      this.sendData();
    },
    checkData () {
      if (this.$refs['ruleForm']) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.canCheck()
          } else {
            return false;
          }
        });
      } else {
        this.canCheck()
      }
    },
    sendData () {
      let self = this;
      let param = { remark: this.remark, scene: this.scene, ruleList: this.ruleList, serviceId: this.serviceId }
      ApiDataFilter.request({
        apiPath: 'manage.qrCode',
        method: 'post',
        data: param,
        successCallback (res) {
          self.dialogVisible = true;
          self.$message.success('提交成功');
          self.qrCodeObj = res.msg;
        }
      })
    },
    onChannelChange (channel) {
      if (channel) {
        // 选择渠道
        this.scene = channel.channel + '|' + '#rise#';
        this.remark = channel.channelName;
      } else {
        // 清空
        this.scene = '';
        this.remark = '';
      }
    },
    handleChangeLabel (value) {
      let _str = this.scene.split('#rise#')[1]
      this.scene = this.channel.channel + '|' + value + '#rise#' + _str;
    }
  },
  created () {
    ApiDataFilter.request({
      apiPath: 'manage.channel.rules',
      method: 'get',
      successCallback: (res) => {
        console.log(this, res.msg);
        this.channels = res.msg;
      }
    })
  }
}
</script>

<style scoped lang="less">
@import "./qrcode.less";
</style>
