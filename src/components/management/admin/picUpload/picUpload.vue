

<template>
   <div class="pic-upload-container">
     <h3>图片上传</h3>
     <div class="pic-upload-top">
       <el-upload
         action="/pc/upload/file"
         list-type="picture-card"
         :limit="1"
         :on-exceed="onExceed"
         :file-list="picList"
         :before-upload="handleBeforeUpload"
         :on-success="sendPicSuccess"
         :on-preview="handlePictureCardPreview"
         :on-remove="handleRemove">
         <i class="el-icon-plus"></i>
       </el-upload>
       <el-dialog :visible.sync="dialogVisible">
         <img width="100%" :src="dialogImageUrl" alt="">
       </el-dialog>
     </div>

     <el-dialog
       title="提示"
       :visible.sync="dialogVisiblePop"
       :close-on-click-modal = 'false'
       :show-close="false"
       width="30%">
       <div class="pop-box">
         <p>{{picUrl}}</p>
       </div>
       <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfor">确 定</el-button>
        </span>
     </el-dialog>
   </div>
</template>

<script>
  export default {
    name: "picUpload",
      data(){
      return{
        dialogVisible:false,
        dialogImageUrl:'',
        picList:[],
        dialogVisiblePop:false,
        picUrl:''
      }
    },
    methods:{
      onExceed(){
        this.$message.error(`图片最多上传1张`)
      },
      sendPicSuccess(res, file, fileList){
        console.log(res, file, fileList)
        this.dialogVisiblePop = true;
        this.picUrl = res.msg;
      },
      handlePictureCardPreview(file){

      },
      handleRemove(file, fileList){

      },
      handleBeforeUpload(file){
        /*this.picList = []*/
      },
      handleConfor(){
        this.dialogVisiblePop = false;
        this.picList = []
      }

    }
  }
</script>

<style scoped lang='less'>
  @import "picUpload.less";
</style>
