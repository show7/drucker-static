<template>
  <div class="class-adviser-manage-container">
    <h3>班主任管理</h3>
    <div class="class-adviser-manage-content">
      <div class="add-box">
        <el-button type="success" @click="handleAdd">新增</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="adviserList"
          style="width: 100%">
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="avatar" label="头像">
            <template slot-scope="scope">
              <div class="pic-box">
                <img :src="scope.row.avatar" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="riseId" label="riseId"></el-table-column>
          <el-table-column prop="weixinId" label="weixinId"></el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      :title="title"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="pop-box">
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <span>riseId:</span>
              <el-input type="text" v-model="riseId" placeholder="请输入riseId"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <span>weixinId: </span>
              <el-input type="text" v-model="weixinId" placeholder="请输入weixinId"/>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              <el-button type="success" @click="loadUser">查询</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span>昵称：</span>{{info.nickname}}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span>头像：</span>
              <el-upload
                class="avatar-uploader"
                action="/pc/upload/file"
                :show-file-list="false"
                :on-success="handleScheduleSuccess"
                :before-upload="beforeScheduleUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheck">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "classAdviserManage",
    data() {
      return {
        adviserList:[],
        title:'',
        dialogVisible:false,
        riseId:'',
        weixinId: '',
        info:{},
        imageUrl:''
      }
    },
    methods:{
      /*拿到list*/
      getList(){
        apiDataFilter.request({
          apiPath:'manage.classAdviserManage.loadList',
          successCallback:(res)=>{
            this.adviserList = res.msg
          }
        })
      },
      /*新增*/
      handleAdd(){
        this.dialogVisible = true;
        this.riseId = '';
        this.info = ''
      },
      /*根据riseid拿信息*/
      loadUser(){
        if (!this.riseId){
          this.$message.error('请填写riseId');
          return;
        }
        let param = {
          riseId: this.riseId
        };
        apiDataFilter.request({
          apiPath:'manage.classAdviserManage.loadUser',
          data:param,
          successCallback:(res)=>{
            this.info = res.msg;
          }
        })
      },
      /*添加*/
      handleCheck(){
        if (this.info.nickname && this.riseId && this.imageUrl && this.weixinId){
          let param = {riseId:this.riseId,avatar:this.imageUrl};
          apiDataFilter.request({
            apiPath:'manage.classAdviserManage.add',
            method:'post',
            data:param,
            successCallback:(res)=>{
              this.$message.success('添加成功');
              this.dialogVisible =false;
              this.getList();
            }
          })
        }else {
          this.$message.error('请完善信息')
        }
      },
      handleScheduleSuccess(res, file){
        this.imageUrl = res.msg;
      },
      /*校验图片*/
      beforeScheduleUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    created(){
      this.getList();
    }

  }
</script>

<style scoped lang='less'>
  @import "classAdviserManage.less";
</style>
