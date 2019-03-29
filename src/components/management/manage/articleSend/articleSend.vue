<template>
  <div class="article-send-container">
    <h3>文章定向发送</h3>
    <div class="article-send-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            公众号：
            <WeChat @getServiceId="handleGet"></WeChat>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            类型：
            <el-select v-model="type"
                       placeholder="请选择"
                       @change="handleChooseType">
              <el-option v-for="item in typeList"
                         :key="item.type"
                         :label="item.label"
                         :value="item.type">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="type==TYPEFLAG.TEXTPIC">
        <el-table
                ref="materialTable"
                :data="materialList"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
          <el-table-column
                  type="index"
                  width="100">
          </el-table-column>
          <el-table-column
                  property="title"
                  label="标题"
                  width="350">
          </el-table-column>
          <el-table-column
                  property="thumbUrl"
                  label="头图"
                  width="350">
              <template slot-scope="scope">
                  <img class="thumb-pic" :src="scope.row.thumbUrl" alt="">
              </template>
          </el-table-column>
          <el-table-column
                  label="操作"
                  width="200">
              <template slot-scope="scope">
                  <a :href="scope.row.url" target="_blank">查看原文</a>
              </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--分页-->
      <div class="pagination">
          <el-pagination v-if="type==TYPEFLAG.TEXTPIC"
                  background
                  layout="prev, pager, next"
                  :current-page="pageIndex"
                  @current-change="currentChange"
                  :page-count="pageCount">
          </el-pagination>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <el-input v-if="type==TYPEFLAG.TEXT"
                      type="textarea"
                      :rows="8"
                      placeholder="请输入内容"
                      v-model="remark">
            </el-input>
            <el-upload v-if="type==TYPEFLAG.PIC"
                       class="avatar-uploader"
                       ref="upload"
                       :action='langUrl+"&serviceId="+serviceId'
                       :limit="1"
                       :show-file-list="false"
                       :on-success="handleSuccess"
                       :on-exceed="handleExceed">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="openIds-content">
            <p>输入openIds，换行隔开</p>
            <el-input type="textarea"
                      :rows="8"
                      placeholder="请输入内容"
                      v-model="openIds">
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-button type="primary"
                     @click="submit('self')">发送给自己</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary"
                     @click="submit('all')">群发</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import weChat from '../../../common/weChat/weChat'
import apiDataFilter from '../../../../libraries/apiDataFilter';
export default {
  name: 'articleSend',
  components: { WeChat: weChat },
  data () {
    return {
      serviceId: null,
      typeList: [{ type: '1', label: '文字' }, { type: '2', label: '图片' }, { type: '4', label: '图文' }],
      type: '1',
      openIds: '',
      imageUrl: '',
      remark: '',
      mediaId: '', //上传图片返回的素材id
      langUrl: '/wx/file/upload/image/?tmp=0&remark=',
      TYPEFLAG: {
        TEXT: 1,
        PIC: 2,
        TEXTPIC: 4
      },
      canSend: true,
      materialList: [],
      pageIndex: 1,
      pageCount: null,
    }
  },
  methods: {
    getList(){
      let param = { page: this.pageIndex, serviceId: this.serviceId, type: 'news' };
      apiDataFilter.request({
        apiPath: "admin.articleSend.material",
        data: param,
        successCallback: (res) => {
          let result = res.msg;
          this.materialList = result.newsMaterialsVO.item
          this.pageCount = result.page.pageCount
        }
      })
    },
    currentChange(val){
      this.pageIndex = val;
      this.getList()
    },
    handleChooseType(val){
      if (val == this.TYPEFLAG.TEXTPIC) {
        this.pageIndex = 1
        this.getList()
      }
    },
    handleCurrentChange(val) {
      this.mediaId = val.mediaId;
    },
    handleGet (id) {
      if (this.type === 'news') {
        this.pageIndex = 1
        this.getList()
      }
      this.serviceId = id;
    },
    handleExceed (file) {
      this.$message.error(`图片最多上传1张`)
    },
    handleSuccess (res, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.mediaId = res.msg;
    },
    handleSubmit (flag, param) {
      if (!this.canSend) return this.$message.success('请等待群发完成后再次操作');
      this.canSend = false
      let api = flag == 'self' ? 'admin.articleSend.message' : 'admin.articleSend.preview';
      apiDataFilter.request({
        apiPath: api,
        data: param,
        method: 'post',
        successCallback: (res) => {
          this.canSend = true
          this.$message.success('提交成功');
        }
      })
    },
    submit (flag) {
      let param = { messagetype: this.type, serviceId: this.serviceId };
      if (flag != 'self') {
        if (!this.openIds) {
          this.$message.error('请填写openids');
          return
        } else {
          Object.assign(param, { openids: this.openIds.split('\n') })
        }
      }
      if (!this.checkData()) {
        if (this.type == this.TYPEFLAG.TEXT) {
          Object.assign(param, { message: this.remark });
        } else if (this.type == this.TYPEFLAG.PIC) {
          Object.assign(param, { message: this.mediaId });
        } else if (this.type == this.TYPEFLAG.TEXTPIC) {
          Object.assign(param, { message: this.mediaId });
        }
        this.handleSubmit(flag, param)
      }
    },
    /*检验数据*/
    checkData () {
      if (this.type == this.TYPEFLAG.TEXT) {
        if(!this.remark){
          this.$message.error('请先输入消息')
          return !this.remark
        }
      } else if (this.type == this.TYPEFLAG.PIC) {
        if(!this.mediaId){
          this.$message.error('请先上传图片')
          return !this.mediaId
        }
      } else if (this.type == this.TYPEFLAG.TEXTPIC) {
        if(!this.mediaId){
          this.$message.error('请先选取素材')
          return !this.mediaId
        }
      }
      return false
    }
  }
}
</script>

<style scoped lang='less'>
@import "articleSend.less";
</style>
