<template>
  <!--编辑和新增弹框-->
  <div class="content-detail-container">
    <el-dialog
      :visible.sync="show"
      title="内容详情"
      :close-on-click-modal="false"
      :show-close="false"
      :before-close="handleCancelEmit"
      width="60%">
      <div class="popout-box">
        <el-row>
          <el-col :span="8">
            <h4><span>*</span>riseId</h4>
            <el-input class="riseId-input" placeholder="请输入riseId" v-model="riseId" :disabled="editorFlag" clearable
                      @clear="riseIdClear"></el-input>
            <el-button type="primary" size="small" :disabled="editorFlag" @click="getAdd">确 定</el-button>
          </el-col>
          <el-col :span="8">
            <h4><span>*</span>发布昵称</h4>
            <el-input placeholder="请输入昵称" v-model="nickname" :disabled="true"></el-input>
          </el-col>
          <el-col :span="8">
            <h4><span>*</span>头像</h4>
            <img :src="headimgurl" alt="头像">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4><span>*</span>分类</h4>
            <el-select v-model="categoryId" placeholder="请选择">
              <el-option
                v-for="item in categoryList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12" v-if="categoryId === 3">
            <h4><span>*</span>作者</h4>
            <el-input placeholder="请输入作者" v-model="editorName"></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <h4><span>*</span>所属群组</h4>
            <el-select v-model="popOutCommunityId" placeholder="请选择" @change="popOutCommunityChange">
              <el-option
                v-for="item in communityList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row v-if="categoryId === 3">
          <el-col :span="12">
            <h4><span>*</span>标题</h4>
            <el-input placeholder="输入标题" v-model="title"></el-input>
          </el-col>
        </el-row>
        <el-row v-if="categoryId === 3">
          <el-col :span="20">
            <h4><span>*</span>摘要</h4>
            <el-input type="textarea" :row="3" placeholder="输入摘要" v-model="description"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="categoryId === 3" :span="24">
            <h4><span>*</span>上传头图</h4>
            <el-upload
              action="/pc/upload/file"
              list-type="picture-card"
              :limit="1"
              :on-exceed="onExceed2"
              :file-list="headPicList"
              :on-success="sendHeadPicSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleHeadRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="categoryId === 1">
            <h4><span>*</span>话题</h4>
            <el-select v-model="popOutTopicId" placeholder="请选择">
              <el-option
                v-for="item in topicLabels"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row v-if="categoryId === 3">
          <el-col :span="24">
            <h4>发布内容</h4>
            <!--富文本-->
            <Editor id="contentEditor"
                    ref="contentEditor"
                    :value="content"
                    :toolbar="toolbarArticle"
                    @change="oneEditorChange"></Editor>
          </el-col>
        </el-row>
        <el-row v-if="categoryId !== 3">
          <el-col :span="24">
            <h4>发布内容</h4>
            <!--富文本-->
            <Editor id="contentEditor"
                    ref="contentEditor"
                    :value="content"
                    :toolbar="toolbarNormal"
                    @change="oneEditorChange"></Editor>
          </el-col>
        </el-row>
        <el-row v-if="categoryId !== 3">
          <el-col :span="24">
            <h4>上传图片</h4>
            <el-upload
              action="/pc/upload/file"
              list-type="picture-card"
              :limit="9"
               multiple
              :on-exceed="onExceed"
              :file-list="picGroupList"
              :on-success="sendPicSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4><span>*</span>操作</h4>
            <el-radio v-model="publish" label="1">发布</el-radio>
            <el-radio v-model="publish" label="0">暂不发布</el-radio>
          </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisiblePic">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancelEmit">取 消</el-button>
      <el-button type="primary" @click="checkSaveData">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import Editor from '../../../../../../common/editor/editor'
  import moment from 'moment'
  import _ from 'lodash'
  export default {
    name: 'contentDetail',
    components: { Editor },
    data() {
      return {
        interval: null, //定时任务
        esChatId: null, //eschat id
        show: true, //对话框状态
        riseId: '', //圈外id
        nickname: '', //昵称
        content: '', //内容
        headimgurl: '', //头像
        postProfileId: 0, //提交人
        popOutCommunityId: null, //群组id
        popOutTopicId: null, //话题id
        publish : -1, //是否发布
        picGroupList : [], //图片列表
        communityList : [], //群组列表
        topicLabels : [], //话题列表
        imgList : [], //图片列表
        headPic: '', // 头图
        communityName: '', //所属群组name
        groupName: '', //所属群名
        topicName: '', //话题名
        headPicList: [], //头图
        title: '', //文章标题
        description: '', //描述
        editorName:'',//作者名称
        toolbarNormal: [ 'bold' ],
        toolbarArticle: [ 'bold', 'ol', 'ul', 'image', 'hr' ],
        categoryId : null,
        dialogVisiblePic: false,
        dialogImageUrl: '',
      }
    },
    props: ['editorFlag', 'detail','categoryList'],
    methods: {
      /*新增状态下查询*/
      getAdd() {
        if(!this.riseId) {
          this.$message.error('请填写riseId')
          return
        }
        let self = this;
        ApiDataFilter.request({
          apiPath: 'weChat.groupManage.getMember',
          pathParams: [this.riseId],
          successCallback(res) {
            self.headimgurl = res.msg.headimgurl;
            self.nickname = res.msg.nickname;
            self.postProfileId = res.msg.id;
          }
        })
      },

      /*新增和编辑接口*/
      handleContentSave() {
        let self = this;
        let labelId = -1;
        // 只有话题状态才传labelId
        if(this.categoryId === 1){
          if(this.popOutTopicId){
            labelId = this.popOutTopicId;
          }
        }
        // publish为空时，设置为0
        if(!this.publish){
          this.publish = 0;
        }
        let param = {
          labelId,
          picGroup: this.imgList,
          publish: this.publish,
          postProfileId: this.postProfileId,
          communityId: this.popOutCommunityId,
          content: this.content,
          labelCategory: this.categoryId,
          esChatId: this.esChatId ? this.esChatId : null,
        };
        // 文章
        if(this.categoryId === 3){
          param.headPic = this.headPic;
          param.description = this.description;
          param.title = this.title;
          param.editorName = this.editorName
        }
        ApiDataFilter.request({
          apiPath: 'weChat.groupManage.contentSave',
          method: 'post',
          data: param,
          successCallback(res) {
            self.$message.success(self.publish == 1 ? '上架成功' : '保存成功');
            self.dialogDetailVisible = false;
            self.handleSaveEmit();
            self.esChatId = res.msg
          }
        })
      },
      /*验证填写的数据*/
      checkSaveData() {
        if(!this.postProfileId || !this.popOutCommunityId) {
          this.$message.error('请完善信息')
          return
        }
        // 分享和话题必须上传内容或者图片
        if(this.categoryId === 1 || this.categoryId === 2){
          if(!this.content && (this.imgList.length == 0 || this.imgList == null)) {
            this.$message.error('内容和图片至少填写一项')
            return
          }

        }
        if(this.categoryId !=3){
          if (this.imgList && this.imgList.length > 0){
            let noList=[];
            noList = this.imgList.filter((item)=>{
              return item.indexOf('blob') != -1
            });
            console.log('noList',noList)
            if (noList.length > 0){
              this.$message.info('请等待图片上传完毕')
              return
            }
          }
        }
        // 话题必须选择某个话题
        if(!this.popOutTopicId && this.categoryId === 1) {
          this.$message.error('至少选一个话题');
          return
        }
        if(this.headPic == null  && this.categoryId === 3) {
          this.$message.error('请上传文章头图');
          return
        }
        if(!this.description && this.categoryId === 3) {
          this.$message.error('请输入文章摘要');
          return
        }

        if(this.description && this.categoryId === 3){
          if(this.description.split('\n').length>2){
            this.$message.error('摘要不能超过2行');
            return
          }
          if(this.description.length>36){
            this.$message.error('摘要不能超过36字');
            return
          }
        }
        if(!this.title && this.categoryId === 3) {
          this.$message.error('请输入文章标题');
          return
        }
        if(!this.publish || this.publish === -1) {
          this.$message.error('请输入发布状态');
          return
        }
        this.handleContentSave();
      },
      /*弹框群组选择change事件*/
      popOutCommunityChange(val) {
        this.communityList.forEach((item, index) => {
          if(item.id == val) {
            this.topicLabels = item.topicLabels;
          }
        })
        this.popOutTopicId = null;
      },
      /*上传图片*/
      sendPicSuccess(res, file, fileList) {
        console.log(res, file, fileList)
        this.imgList = this.handleAddReducePic(fileList);
      },
      /*上传图片*/
      sendHeadPicSuccess(res, file, fileList) {
        let headPicList = this.handleAddReducePic(fileList);
        this.headPic = headPicList[0]
      },
      /*图片数据列表形式*/
      handleAddReducePic(fileList) {
        let imgList = [];
        if(fileList.length > 0) {
          fileList.forEach((item, index) => {
            if('response' in item) {
              imgList.push(item.response.msg)
            } else {
              imgList.push(item.url)
            }
          })
        } else {
          imgList = []
        }
        return imgList
      },
      /*文本编辑器的取值*/
      oneEditorChange(val) {
        this.content = val;
      },
      /*删除图片*/
      handleRemove(file, fileList) {
        this.imgList = this.handleAddReducePic(fileList);
      },
      /*删除图片*/
      handleHeadRemove(file, fileList) {
        this.headPicList = this.handleAddReducePic(fileList);
      },
      /*图片预览*/
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisiblePic = true;
      },
      /*超出图片上传限时*/
      onExceed() {
        this.$message.error(`图片最多上传9张`)
      },
      /*超出图片上传限时*/
      onExceed2() {
        this.$message.error(`图片最多上传1张`)
      },
      /*清除弹框的riseId*/
      riseIdClear() {
        this.headimgurl = null;
        this.nickname = null;
      },
      handleCancelEmit(){
        this.show =false;
        this.$emit('closeDialog')
      },
      handleSaveEmit(){
        this.show =false;
        this.$emit('reloadList')
      },
      /*去除标签*/
      removeHtmlTags(str) {
        let newStr = _.trim(str)
        // 去除 html 标签
        newStr = newStr.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '')
        newStr = newStr.replace(/<\/?[^>]*>/g, '')
        // 去除实体字符
        newStr = newStr.replace(/&[^;]+;/g, '')
        return newStr
      }
    },
    computed: {
      findCategory: function () {
        if(this.categoryId){
          if(this.categoryId === 1){
            return '话题'
          }else if(this.categoryId === 2){
            return '分享'
          }else if(this.categoryId === 3){
            return '文章'
          }
        }else{
          return '无'
        }
      }
    },
    mounted(){
      this.categoryId = this.detail.labelCategory;
      this.headimgurl = this.detail.headimgurl;
      this.nickname = this.detail.nickname;
      this.riseId = this.detail.riseId;
      this.esChatId = this.detail.esChatId;
      this.postProfileId = this.detail.postProfileId;
      this.popOutCommunityId = this.detail.popOutCommunityId;
      this.popOutTopicId = this.detail.popOutTopicId;
      this.content = this.detail.content;
      this.publish = this.detail.publish;
      this.picGroupList = this.detail.picGroupList;
      this.communityList = this.detail.communityList;
      this.topicLabels = this.detail.topicLabels;
      this.title = this.detail.title;
      this.description = this.detail.description;
      this.headPic = this.detail.headPic;
      this.imgList = this.detail.imgList;
      this.editorName = this.detail.nickname;
      if(this.detail.headPic){
        this.headPicList.push({id:1, url:this.detail.headPic});
      }
    },
    beforeDestroy(){
      clearInterval(this.interval)
    }
  }


</script>

<style scoped lang="less">
  @import "contentDetail.less";
</style>
