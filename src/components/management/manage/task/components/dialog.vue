<template>
  <el-dialog
    @open="handleOpen"
    @close="handleClose"
    title="编辑任务"
    :visible="dialogVisible"
    width="80%"
  >
    <Steps>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.FirstReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.FirstReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                class="textarea"
                v-model="formData.FirstReachMessage"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.FirstRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.SecondReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.SecondReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.SecondReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.SecondRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.ThirdReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.ThirdReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.ThirdReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
        <template slot="interval">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="消息">
              <el-input
                v-model="formData.ThirdRangeMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
      <Step>
        <template slot="current">
          <el-form :inline="true" class="form__wrapper">
            <el-form-item label="人数">
              <el-input-number :min="0" v-model="formData.FourthReachNumber"></el-input-number>
            </el-form-item>
            <el-form-item label="类名">
              <el-select v-model="formData.FourthReachHandleClassName">
                <el-option label="送优惠券" value="couponTemplateMessageActivityHandleServiceImpl"/>
                <el-option label="发送模板消息" value="templateMessageActivityHandleServiceImpl"/>
                <el-option label="音频课开课" value="openAudioClassActivityHandleServiceImpl"/>
              </el-select>
            </el-form-item>
            <el-form-item label="消息">
              <el-input
                v-model="formData.FourthReachMessage"
                class="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleTest">测试</el-button>
            </el-form-item>
          </el-form>
        </template>
      </Step>
    </Steps>
    <div slot="footer" class="dialog-footer">
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
          FirstReachMessage: "",
          FirstReachNumber: 0,
          FirstReachHandleClassName: "",
          FirstRangeMessage: "",
          SecondReachMessage: "",
          SecondReachNumber: 0,
          SecondReachHandleClassName: "",
          SecondRangeMessage: "",
          ThirdReachMessage: "",
          ThirdReachNumber: 0,
          ThirdReachHandleClassName: "",
          ThirdRangeMessage: "",
          FourthReachMessage: "",
          FourthReachNumber: 0,
          FourthReachHandleClassName: ""
        };
      }
    }
  },

  data() {
    return {
      formData: {
        FirstReachMessage: "",
        FirstReachNumber: 0,
        FirstReachHandleClassName: "",
        FirstRangeMessage: "",
        SecondReachMessage: "",
        SecondReachNumber: 0,
        SecondReachHandleClassName: "",
        SecondRangeMessage: "",
        ThirdReachMessage: "",
        ThirdReachNumber: 0,
        ThirdReachHandleClassName: "",
        ThirdRangeMessage: "",
        FourthReachMessage: "",
        FourthReachNumber: 0,
        FourthReachHandleClassName: ""
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
        FirstReachNumber,
        SecondReachNumber,
        ThirdReachNumber,
        FourthReachNumber
      } = this.formData
      if (FirstReachNumber >= SecondReachNumber || FirstReachNumber >= ThirdReachNumber || FirstReachNumber >= FourthReachNumber) {
        return this.$message.error('第一次条件的人数不合法')
      }
      if (SecondReachNumber >= ThirdReachNumber || SecondReachNumber >= FourthReachNumber) {
        return this.$message.error('第二次条件的人数不合法')
      }
      if (ThirdReachNumber >= FourthReachNumber) {
        return this.$message.error('第三次条件的人数不合法');
      }
      this.$emit("save", this.formData);
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
        FirstReachMessage: "",
        FirstReachNumber: 0,
        FirstReachHandleClassName: "",
        FirstRangeMessage: "",
        SecondReachMessage: "",
        SecondReachNumber: 0,
        SecondReachHandleClassName: "",
        SecondRangeMessage: "",
        ThirdReachMessage: "",
        ThirdReachNumber: 0,
        ThirdReachHandleClassName: "",
        ThirdRangeMessage: "",
        FourthReachMessage: "",
        FourthReachNumber: 0,
        FourthReachHandleClassName: ""
      }
    },

    /**
     * 测试
     */
    handleTest () {
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./dialog.less");
</style>
