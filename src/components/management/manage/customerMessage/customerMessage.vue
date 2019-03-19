<template>
  <div class="customer-message-container">
    <h3>客服消息</h3>
    <div class="top">
      <div class="desc">
        <el-row>
          <el-col :span="12">
            <h4>选择消息模式</h4>
            <el-select v-model="type"
                       placeholder="请选择消息模式">
              <el-option v-for="item in messageModel"
                         :key="item.type"
                         :label="item.name"
                         :value="item.type">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <h4>选择微信公众号</h4>
            <el-select v-model="serviceId"
                       placeholder="请选择微信公众号">
              <el-option v-for="item in serviceList"
                         :key="item.serviceId"
                         :label="item.name"
                         :value="item.serviceId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p>消息用途（中文）</p>
            <el-input v-model="comment"
                      placeholder="请输入消息用途（中文）"></el-input>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="12">
          <p>发送人员的openId（换行隔开）</p>
          <el-input type="textarea"
                    :autosize="{ minRows: 4,maxRows: 6}"
                    placeholder="请输入发送人员的openId（换行隔开）"
                    v-model="openids">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
                v-show="type===1">
          <p>输入内容(如果会用到xxx这种指代用户昵称的内容请替换为{username})</p>
          <el-input type="textarea"
                    :autosize="{ minRows: 4,maxRows: 6}"
                    placeholder="请输入内容(如果会用到xxx这种指代用户昵称的内容请替换为{username})"
                    v-model="message">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
                v-show="type===2 && isUpImage">
          <p>上传你所需要推送的图片</p>
          <el-upload :action="actionUrl"
                     :multiple="false"
                     :limit="1"
                     list-type="picture-card"
                     :show-file-list="true"
                     :on-success="sendShortPicSuccess"
                     :on-preview="handlePictureCardPreview">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="dialogImageUrl"
                 alt="">
          </el-dialog>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary"
                     @click="handleCheck(true)">发送给自己</el-button>
          <el-button type="primary"
                     @click="handleCheck(false)">发送客服消息</el-button>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';

export default {
  name: 'customerMessage',
  data () {
    return {
      comment: '',
      message: '', //
      openids: '', //
      isMine: true,
      serviceId: 1,
      type: 1,
      dialogVisible: false,
      dialogImageUrl: '',
      isUpImage: true,
      shortUrl: '/wx/file/upload/image/?tmp=1',
      serviceList: [{ serviceId: 1, name: '圈外同学' }, { serviceId: 6, name: '圈外职场学园' }, { serviceId: 10, name: '又更新了' }],
      messageModel: [{ type: 1, name: '文字' }, { type: 2, name: '图片' }]
    }
  },
  computed: {
    actionUrl () {
      return `${this.shortUrl}&serviceId=${this.serviceId}`
    }
  },
  methods: {
    sendMsg () {
      let param = { message: this.message, comment: this.comment, openids: this.openids, isMine: this.isMine, serviceId: this.serviceId, type: this.type };
      apiDataFilter.request({
        apiPath: 'manage.customerMessage.send',
        method: 'post',
        data: param,
        successCallback: (res) => {
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        }
      })
    },
    handleCheck (flag) {
      if (flag) {
        if (!this.comment || !this.message) {
          this.$message.error('请完善信息');
        } else {
          this.isMine = true;
          this.sendMsg();
        }
      } else {
        if (!this.comment || !this.message || !this.openids) {
          this.$message.error('请完善信息');
        } else {
          this.isMine = false;
          this.conformSend();
        }
      }
    },
    conformSend () {
      this.$confirm('已经和开发人员确认客服消息内容无误？', '提示', {
        confirmButtonText: '已确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isMine = false;
        this.sendMsg();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    },
    sendShortPicSuccess (res, file, fileList) {
      //上传成功后
      console.log(res, file, fileList)
      this.$message.success('上传临时素材成功')
      this.dialogImageUrl = file.url;
      this.message = res.msg;
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  watch: {
    type: {
      handler () {

      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "customerMessage.less";
</style>
