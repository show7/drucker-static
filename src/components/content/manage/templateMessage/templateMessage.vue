<template>
  <div class="template-message">
    <h3>模板消息</h3>
    <p>如果你是初次使用本功能，请先观看教学视频!<br/>
      链接: https://pan.baidu.com/s/1i0OjM2Aqh9LBqm6E3cLtMg 密码: k9pz</p>
    <div class="message-top">
      <h4>配置内容填写</h4>
      <el-row>
        <el-col :span="6">
          <el-select v-model="templateValue" placeholder="请选择模板消息类型">
            <el-option
              v-for="item in templateMsgs"
              :key="item.id"
              :label="item.remark"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-select v-if="forcePush" v-model="forcePushValue" placeholder="请选择是否强制推送">
            <el-option
              v-for="item in forcePushList"
              :key="item.id"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-input v-model="comment" placeholder="请输入消息用途（中文）"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="source" placeholder="请输入消息用途英文（格式xx_xx）"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="message-content">
      <h4>模板消息内容填写</h4>
      <el-row>
        <el-col :span="12">
fdsfs
        </el-col>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入内容（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
            v-model="first">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入keyword1（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
            v-model="keyword1">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入keyword2（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
            v-model="keyword2">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="12">
        <el-input
          type="textarea"
          resize="none"
          :rows="4"
          placeholder="请输入keyword3（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
          v-model="keyword3">
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input
          type="textarea"
          resize="none"
          :rows="4"
          placeholder="请输入keyword4（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
          v-model="keyword4">
        </el-input>
      </el-col>
    </el-row>
      <el-row>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入keyword5（如果会用到xxx这种指代用户昵称的内容请替换为{username}）"
            v-model="keyword5">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入remark"
            v-model="remark">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-input v-model="url" placeholder="请输入跳转链接（如果需要跳转链接请和开发人员沟通，如果不需要跳转则不用填写）"></el-input>
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入发送人员的openid（用换行符隔开）"
            v-model="openIds">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-input
            type="textarea"
            resize="none"
            :rows="4"
            placeholder="请输入需要排除人员的openid（用换行符隔开，选填）"
            v-model="excludeOpenIds">
          </el-input>
        </el-col>
      </el-row>
    </div>
    <el-button type="primary" @click="sendData(0)">发送给自己</el-button>
    <el-button type="primary" @click="sendData(1)">发送模板消息</el-button>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'

  export default {
    name: "templateMessage",
    data() {
      return {
        templateMsgs:[],
        templateValue:'' ,//模板消息类型
        forcePushList:[{id:0,name:'是',value:true},{id:1,name:'否',value:false}],
        forcePushValue: false ,//选择是否强制推送的
        forcePush:true,   //知否显示强制推送选项
        comment:'',   //消息用途中文
        source:'',//消息用途英文
        first:'',//输入内容
        keyword1:'',//
        keyword2:'',
        keyword3:'',
        keyword4:'',
        keyword5:'',
        remark:'',
        url:'',
        openIds:'',
        excludeOpenIds:''
      }
    },
    methods: {
      getTemplate(){
        let self =this;
        ApiDataFilter.request({
          apiPath:'manage.templates.loadTemplates',
          method:'get',
          successCallback(res){
           self.templateMsgs = res.msg.templateMsgs;
           self.forcePush = res.msg.showForcePush
          }
        })
      },
      handleCheckData(){
        if(this.template && this.comment && this.keyword1 && this.openIds && this.source) {
          this.$message.error('请将信息填写完成');
          return false
        }
        if(this.source.length > 32) {
          this.$message.error('英文消息用途过长');
          return false
        }
      },
      /*发送模板数据*/
      sendData(index){
        if( !this.forcePush && this.openIds.split("\n").length > 1000) {
          this.$message.error('发送人数过多');
          return
        }
        let self = this;
        let param = {
          templateId: this.templateValue,
          comment:this.comment,
          first:this.first,
          remark:this.remark,
          url:this.url,
          keyword1:this.keyword1,
          keyword2:this.keyword2,
          keyword3:this.keyword3,
          keyword4:this.keyword4,
          keyword5:this.keyword5,
          openIds:this.openIds,
          source:this.source,
          forcePush: this.forcePushValue,
          isMime: index === 0 ? true : false
        };
        index===1 ? Object.assign(param,{ excludeOpenIds:this.excludeOpenIds,}):'';
        ApiDataFilter.request({
          apiPath:'manage.templates.sendTemplate',
          method:'post',
          data:param,
          successCallback(res){
            self.$message.success(res.msg)
          }
        })
      }
    },
    created(){
      this.getTemplate()
    }


  }
</script>

<style scoped lang="less">
  @import "./templateMessage.less";
</style>
