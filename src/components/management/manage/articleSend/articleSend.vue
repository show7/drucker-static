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
            标题：<el-input v-model="material.title" placeholder="请输入标题"></el-input>
          </div>
        </el-col>
        <el-col :span="6" v-if="type==TYPEFLAG.TEXTPIC">
          <div class="grid-content">
           摘要：<el-input v-model="material.digest" placeholder="请输入摘要"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="type==TYPEFLAG.TEXTPIC">
        <el-col :span="6">
          <div class="grid-content">
            作者：<el-input v-model="material.author" placeholder="请输入作者"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            正文：<el-input type="textarea" :rows="2" placeholder="请输入正文" v-model="material.content"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <el-upload
              class="avatar-uploader"
              ref="uploadMaterial"
              :action='langUrl+"&serviceId="+serviceId'
              :limit="1"
              :show-file-list="false"
              :on-success="handleMaterialSuccess"
              :on-exceed="handleExceed">
              <img v-if="material.imageUrl" :src="material.imageUrl" class="avatar">
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
              :on-success="handleSuccess"
              :on-exceed="handleExceed">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="openIds-content">
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
          <el-button type="primary" @click="submit('self')">发送给自己</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="submit('all')">群发</el-button>
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
        typeList:[{type:'1',label:'文字'},{type:'2',label:'图片'},{type:'4',label:'图文'}],
        type:'1',
        openIds:'',
        imageUrl:'',
        remark:'',
        mediaId:'', //上传图片返回的素材id
        langUrl: '/wx/file/upload/image/?tmp=0&remark=',
        TYPEFLAG:{
          TEXT:1,
          PIC:2,
          TEXTPIC:4,
        },
        material:{
          title:'',
          digest:'',
          author:'',
          content:'',
          imageUrl:'',
          thumbMediaId:'',
          serviceId:''
        }
      }
    },
    methods:{
      handleGet(id) {
        this.serviceId = id;
      },
      handleExceed(file) {
        this.$message.error(`图片最多上传1张`)
      },
      handleSuccess(res, file, fileList){
        this.imageUrl = URL.createObjectURL(file.raw);
        this.mediaId = res.msg;
      },
      handleMaterialSuccess(res, file, fileList){
        this.material.imageUrl = URL.createObjectURL(file.raw);
        this.material.thumbMediaId = res.msg;
      },
      handleSubmit(flag,param){
        let api = flag=='self' ? 'admin.articleSend.message':'admin.articleSend.preview';
        apiDataFilter.request({
          apiPath:api,
          data:param,
          method:'post',
          successCallback:(res)=>{
             this.$message.success('提交成功');
          }
        })
      },
      submitArticle(flag,param){
         this.material.serviceId = this.serviceId;
         apiDataFilter.request({
           apiPath:'admin.articleSend.material',
           data:this.material,
           method:'post',
           successCallback:(res)=>{
             Object.assign(param,{message:res.msg})
             this.handleSubmit(flag,param);
           }
         })
      },
      submit(flag) {
        let param = {messagetype: this.type, serviceId: this.serviceId};
        if (flag != 'self'){
           if (!this.openIds){
             this.$message.error('请填写openids');
             return
           }else {
             Object.assign(param, {openids: this.openIds.split('\n')})
           }
        }
        if (!this.checkData()) {
          if (this.type == this.TYPEFLAG.TEXT) {
            Object.assign(param, {message: this.remark});
            this.handleSubmit(flag, param)
          } else if (this.type == this.TYPEFLAG.PIC) {
            Object.assign(param, {message: this.mediaId});
            this.handleSubmit(flag, param)
          } else if (this.type == this.TYPEFLAG.TEXTPIC) {
            this.submitArticle(flag, param);
          }
        }
      },
      /*检验数据*/
      checkData(){
        if (this.type == this.TYPEFLAG.TEXT){
           return !this.remark
        }else if (this.type == this.TYPEFLAG.PIC){
           return !this.mediaId
        }else if (this.type == this.TYPEFLAG.TEXTPIC) {
          if (!this.material.title){
            this.$message.error('请填写标题');
            return true
          }else if (!this.material.content) {
            this.$message.error('请填写正文');
            return true
          }else if (!this.material.thumbMediaId) {
            this.$message.error('请填选择图片素材');
            return true
          }else {
            return false
          }
        }
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "articleSend.less";
</style>
