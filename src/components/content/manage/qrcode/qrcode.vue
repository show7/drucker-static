<template>
  <div class="qrcode">
    <h3>推广二维码</h3>
    <div class="qrcode-top">
      <el-row>
        <el-col :span="12">
          <h4>英文活动名和编号（格式例如：subscribe_push_1）</h4>
          <el-input v-model="scene" placeholder="请输入英文活动名和编号"></el-input>
        </el-col>
        <el-col :span="12">
          <h4>中文活动名称</h4>
          <el-input v-model="remark" placeholder="请输入中文活动名称"></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="qrcode-content">
        <div class="single" v-for="(item,index) in ruleList" :key="index">
          <el-row>
            <el-col :span="12">
              <div class="nickname-url">
                <p>预置变量：{nickname} 昵称,{url}跳转链接 例如：你好，{nickanme}即将跳转到: {url}</p>
                <el-input placeholder="请输入关注文案" v-model="ruleList[index].content" clearable></el-input>
                <el-input placeholder="请输入跳转链接" v-model="ruleList[index].link" clearable></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="nickname-url" v-if="index != 0">
                <p>3-核心能力，5-专项课，8-商业思维；例如：3,5</p>
                <el-input placeholder="请输入会员类型Id,用英文逗号隔开" v-model="ruleList[index].memberTypeIds" clearable></el-input>
              </div>
            </el-col>
          </el-row>
          <el-button v-if="index != 0" type="primary" icon="el-icon-delete" @click="handleDel">删除</el-button>
        </div>
    </div>
    <p>{{JSON.stringify(ruleList)}}</p>
    <el-row>
      <el-col :span="12"><el-button type="primary" @click="handleAdd">添加规则</el-button></el-col>
      <el-col :span="12"><el-button type="primary">点击生成</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "qrcode",
    data() {
      return {
        remark:'', //中文活动名称
        scene:'',  //英文活动名称
        ruleList:[{memberTypeIds: "", link: "", content: ""}]
      }
    },
    methods:{
        handleAdd(){
          let ruleItem = {memberTypeIds: "", link: "", content: ""}
          this.ruleList.push(ruleItem)
        },
      handleDel(index){
          this.ruleList.splice(index,1)
      }
    },
    created(){

    }
  }
</script>

<style scoped lang="less">
  @import "./qrcode.less";
</style>
