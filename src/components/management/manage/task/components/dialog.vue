<template>
<el-dialog title="编辑任务" :visible="dialogVisible" width="80%">
  <Steps>
    <Step>
      <template slot="current">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="interval">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="interval">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template slot="interval">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
          </el-form-item>
        </el-form>
      </template>
    </Step>
    <Step>
      <template slot="current">
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input-number :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="类名">
            <el-select>
            </el-select>
          </el-form-item>
          <el-form-item label="消息">
            <el-input
              class="textarea"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 3}"
              v-model="textarea">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">测试</el-button>
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
import Steps from './steps'
import Step from './step'

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
    }
  },

  methods: {
    /**
     * 保存按钮点击
     */
    handleSave () {
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./dialog.less');
</style>
