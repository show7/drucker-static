<template>
  <div class="public-check">
    <h3>订阅号推荐处理后台</h3>
    <!--table表格-->
    <div class="public-check-content">
      <el-table
        :data="resultList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="weChatName"
          label="订阅号名字">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="上传订阅号头图">
          <template slot-scope="scope" >
            <img  v-if="scope.row.avatar"   class="wechatAvatar"  :src="scope.row.avatar" alt="avatar"
                 @click="dialogEdit(scope.$index, scope.row)">
            <i v-else class="el-icon-plus up-date-icon" @click="dialogEdit(scope.$index, scope.row)"></i>
          </template>
        </el-table-column>

        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dealRecommend(1, scope.row)">通过
            </el-button>
            <el-button
              size="mini"
              @click="dealRecommend(2, scope.row)">拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹框-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="pop-box">
        <el-row>
          <el-col :span="14"><p class="key">订阅号名字</p></el-col>
          <el-col :span="20">
            <el-input
              type="text"
              :disabled=true
              placeholder="订阅号名字"
              v-model='weChatName'>
            </el-input>
          </el-col>
        </el-row>
      </div>
      <el-upload
        class="avatar-uploader"
        action="/pc/upload/file"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess">
        <img v-if="avatar" :src="avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
             <el-button @click="dialogClose">取 消</el-button>
             <el-button type="primary" @click="dialogUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter';
  export default {
    name: 'publicCheck',
    data: function () {
      return {
        resultList: [],
        dialogVisible: false,
        title: '上传公众号头图',
        weChatName:'',
        avatar:'111',
        index:0
      };
    },
    created () {
      this.loadRecommend();
    },
    methods: {

      loadRecommend: function () {
        ApiDataFilter.request({
          apiPath: 'manage.publicCheck.load',
          method: 'get',
          successCallback: res => {
            this.resultList= res.msg.map((value,index) =>{
             return {weChatName:value}
            });
          }
        });
      },

      dealRecommend: function ( status,row) {
        let param = {weChatName: row.weChatName,avatar: row.avatar, status: status}
        ApiDataFilter.request({
          apiPath: 'manage.publicCheck.deal',
          method: 'post',
          data: param,
          successCallback: (res) => {
            this.$message.success('处理成功');
            this.loadRecommend();
          }
        })
      },

      /*编辑弹框*/
      dialogEdit(index, row) {
        this.dialogVisible = true;
        this.weChatName = row.weChatName;
        this.avatar=row.avatar;
        this.index=index;
      },

      /*关闭弹窗*/
      dialogClose() {
        this.dialogVisible = false;
      },


      /*确定修改*/
      dialogUpdate() {
        console.log(this.index);
        this.resultList[this.index].avatar=this.avatar;
        this.dialogVisible = false;
      },
      handleAvatarSuccess(res, file) {
        this.avatar=res.msg;
        this.imageUrl = res.msg;
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg')||(file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  };
</script>

<style scoped lang='less'>
  @import "publicCheck.less";
</style>

