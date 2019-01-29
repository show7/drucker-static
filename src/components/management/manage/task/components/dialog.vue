<template>
  <el-dialog
    @open="handleOpen"
    @close="handleClose"
    title="编辑任务"
    :visible.sync="dialogVisible"
    width="80%"
  >
    <div class="row">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="formData.activityChineseName" placeholder="活动名称"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="formData.activity" placeholder="活动英文名"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="formData.promotionImg" placeholder="海报链接"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="row">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-select v-model="formData.posterTemplateType" placeholder="海报类型(左中右)">
            <el-option
              label="左"
              :value="1"
            ></el-option>
            <el-option
              label="中"
              :value="2"
            ></el-option>
            <el-option
              label="右"
              :value="3"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="formData.offlineMessage" placeholder="下线消息"></el-input>
        </el-col>
      </el-row>
    </div>
    <Steps>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.firstReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.firstReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                class="textarea"
                v-model="formData.firstReachMessage"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.firstReachMessage)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.firstRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.firstRangeMessage, formData.firstReachNumber, formData.secondReachNumber)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.secondReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.secondReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.secondReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.secondReachMessage)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.secondRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.secondRangeMessage, formData.secondReachNumber, formData.thirdReachNumber)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.thirdReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.thirdReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.thirdReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.thirdReachMessage)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.thirdRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.thirdRangeMessage, formData.thirdReachNumber, formData.fourthReachNumber)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.fourthReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.fourthReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.fourthReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="handleTest(formData.fourthReachMessage)"
              >测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
    </Steps>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Steps from "./steps";
import Step from "./step";

export default {
  components: {
    Steps,
    Step
  },

  props: {
    dialogVisible: {
      type: Boolean,
      required: false,
      default: false
    },

    editData: {
      type: Object,
      required: false,
      default() {
        return {
          id: '',
          firstReachMessage: "",
          firstReachNumber: 0,
          firstReachHandleClassName: "",
          firstRangeMessage: "",
          secondReachMessage: "",
          secondReachNumber: 0,
          secondReachHandleClassName: "",
          secondRangeMessage: "",
          thirdReachMessage: "",
          thirdReachNumber: 0,
          thirdReachHandleClassName: "",
          thirdRangeMessage: "",
          fourthReachMessage: "",
          fourthReachNumber: 0,
          fourthReachHandleClassName: "",
          activityChineseName: "", // 活动中文名称
          activity: "", // 活动英文名称
          promotionImg: "", // 海报链接
          posterTemplateType: "", // 海报模版类型
          offlineMessage: "" // 下线消息
        };
      }
    }
  },

  data() {
    return {
      formData: {
        id: '',
        firstReachMessage: "",
        firstReachNumber: 0,
        firstReachHandleClassName: "",
        firstRangeMessage: "",
        secondReachMessage: "",
        secondReachNumber: 0,
        secondReachHandleClassName: "",
        secondRangeMessage: "",
        thirdReachMessage: "",
        thirdReachNumber: 0,
        thirdReachHandleClassName: "",
        thirdRangeMessage: "",
        fourthReachMessage: "",
        fourthReachNumber: 0,
        fourthReachHandleClassName: "",
        activityChineseName: "",
        activity: "",
        promotionImg: "",
        posterTemplateType: "",
        offlineMessage: ""
      }
    };
  },

  methods: {
    /**
     * 保存按钮点击
     */
    handleSave() {
      // 判断输入的人数是否合法
      const {
        firstReachNumber,
        secondReachNumber,
        thirdReachNumber,
        fourthReachNumber
      } = this.formData
      if (
        (firstReachNumber >= secondReachNumber || firstReachNumber >= thirdReachNumber || firstReachNumber >= fourthReachNumber) ||
        (secondReachNumber >= thirdReachNumber || secondReachNumber >= fourthReachNumber) ||
        (thirdReachNumber >= fourthReachNumber)
      ) {
        return this.$message.error('人数设置错误')
      }
      this.$emit("save", this.formData)
    },

    /**
     * 弹窗打开
     */
    handleOpen() {
      this.formData = {
        ...this.formData,
        ...this.editData
      };
    },

    /**
     * 弹窗关闭
     */
    handleClose() {
      // 还原数据
      this.formData = {
        id: '',
        firstReachMessage: "",
        firstReachNumber: 0,
        firstReachHandleClassName: "",
        firstRangeMessage: "",
        secondReachMessage: "",
        secondReachNumber: 0,
        secondReachHandleClassName: "",
        secondRangeMessage: "",
        thirdReachMessage: "",
        thirdReachNumber: 0,
        thirdReachHandleClassName: "",
        thirdRangeMessage: "",
        fourthReachMessage: "",
        fourthReachNumber: 0,
        fourthReachHandleClassName: "",
        activityChineseName: "",
        activity: "",
        promotionImg: "",
        posterTemplateType: "",
        offlineMessage: ""
      }
    },

    /**
     * 测试
     */
    handleTest (templateMsg, previousCount, nextCount) {
      if (!templateMsg) {
        return this.$message.error('测试消息不能为空')
      }
      nextCount = nextCount ? nextCount : 0
      previousCount = previousCount ? previousCount : 0
      this.$emit('test', {
        templateMsg,
        previousCount,
        nextCount
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./dialog.less");
</style>
