<template>
   <div class="pic-source-container">
     <h3>微信图片素材</h3>
     <div class="pic-source-top">
       <el-row>
         <el-col :span="8">
           <div>
             <h4>图片说明</h4>
             <el-input v-model="remark" placeholder="请输入图片说明"></el-input>
           </div>
         </el-col>
         <el-col :span="8">
           <div class="select-option">
             <h4>选择微信公众号</h4>
             <el-select v-model="serviceId" placeholder="请选择微信公众号">
               <el-option
                 v-for="item in serviceList"
                 :key="item.serviceId"
                 :label="item.name"
                 :value="item.serviceId">
               </el-option>
             </el-select>
           </div>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="4">
           <div>
             <el-upload
               class="upload-demo"
               :action='shortUrl+remark+"&serviceId="+serviceId'
               :limit="1"
               :on-success="sendShortPicSuccess"
               :on-exceed="handleExceed"
               :file-list="shortFileList">
               <el-button size="small" type="primary">上传临时素材</el-button>
             </el-upload>
           </div>
         </el-col>
         <el-col :span="4">
           <div>
             <el-upload
               class="upload-demo"
               :action='langUrl+remark+"&serviceId="+serviceId'
               :limit="1"
               :on-success="sendLongPicSuccess"
               :on-exceed="handleExceed"
               :file-list="longFileList">
               <el-button size="small" type="primary">上传永久素材</el-button>
             </el-upload>
           </div>
         </el-col>
       </el-row>
     </div>
   </div>
</template>

<script>
  export default {
    name: "picSource",
    data(){
      return {
        remark:'',
        shortFileList:[],
        longFileList:[],
        shortUrl:'/wx/file/upload/image/?tmp=1&remark=',
        langUrl:'/wx/file/upload/image/?tmp=0&remark=',
        serviceId:1,
        serviceList:[{serviceId:1,name:'圈外同学'},{serviceId:6,name:'圈外同学招生办'}]
      }
    },
    methods:{
      handleExceed(){
        this.$message.error(`图片最多上传1张`)
      },
      sendShortPicSuccess(res, file, fileList){
      /*  console.log(res, file, fileList)*/
        this.shortFileList = []
        this.$message.success('上传临时素材成功')
       /* this.picUrl = res.msg;*/
      },
      sendLongPicSuccess(res, file, fileList){
        this.$message.success('上传永久素材成功')
        this.longFileList = []
      }

    }
  }
</script>

<style scoped lang='less'>
  @import "picSource.less";
</style>
