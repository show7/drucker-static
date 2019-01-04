<template>
  <div class="article-send-container">
      <h3>文章定向发送</h3>
    <div class="article-send-top">
      <el-row>
        <el-col :span="6">
          <div class="grid-content">
            公众号：
            <WeChat @getServiceId="handleGet"></WeChat>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            类型：
            <el-select v-model="type" placeholder="请选择">
              <el-option v-for="item in typeList"
                         :key="item.type"
                         :label="item.label"
                         :value="item.type">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6" v-if="type==TYPEFLAG.TEXTPIC">
          <div class="grid-content">
            标题：<el-input v-model="title" placeholder="请输入标题"></el-input>
          </div>
        </el-col>
        <el-col :span="6" v-if="type==TYPEFLAG.TEXTPIC">
          <div class="grid-content">
           摘要：<el-input v-model="digest" placeholder="请输入摘要"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="type==TYPEFLAG.TEXTPIC">
        <el-col :span="6">
          <div class="grid-content">
            作者：<el-input v-model="author" placeholder="请输入作者"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-input
              :rows="2"
              placeholder="请输入内容"
              v-model="remark">
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action='langUrl+"&serviceId="+serviceId'
              :limit="1"
              :show-file-list="false"
              :auto-upload="false"
              :on-success="handleSuccess"
              :before-upload="handleExceed">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-input
              v-if="type==TYPEFLAG.TEXT"
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="remark">
            </el-input>
            <el-upload
              v-if="type==TYPEFLAG.PIC"
              class="avatar-uploader"
              ref="upload"
              :action='langUrl+"&serviceId="+serviceId'
              :limit="1"
              :show-file-list="false"
              :auto-upload="false"
              :on-success="handleSuccess"
              :before-upload="handleExceed">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
           <p> 输入openIds，换行隔开</p>
            <el-input
              type="textarea"
              :rows="8"
              placeholder="请输入内容"
              v-model="openIds">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="handleSubmit('self')">发送给自己</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">群发</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import weChat from '../../../common/weChat/weChat'
  import apiDataFilter from "../../../../libraries/apiDataFilter";
  export default {
    name: "articleSend",
    components: {WeChat: weChat},
    data(){
      return{
        serviceId:null,
        typeList:[{type:'1',label:'文字'},{type:'2',label:'图片'},{type:'3',label:'图文'}],
        type:'1',
        openIds:'',
        imageUrl:'',
        remark:'',
        langUrl: '/wx/file/upload/image/?tmp=0&remark=',
        TYPEFLAG:{
          TEXT:1,
          PIC:2,
          TEXTPIC:3,
        }
      }
    },
    methods:{
      handleGet(id) {
        this.serviceId = id;
      },
      handleExceed() {
        this.$message.error(`图片最多上传1张`)
      },
      handleSuccess(res, file, fileList){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleSubmit(flag,param){
        let api = flag=='self' ? 'admin.articleSend.message':'admin.articleSend.preview';
        apiDataFilter.request({
          apiPath:api,
          data:param,
          successCallback:()=>{

          }
        })
      },
      submit(flag){
        let param = {messagetype:this.type,serviceId:this.serviceId};
        flag=='self' ? '':Object.assign(param,{openids:this.openids.split('\n')})
        if (this.type == 1){

        }else if (this.type == 2){
          this.$refs.upload.submit();
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "articleSend.less";
</style>
