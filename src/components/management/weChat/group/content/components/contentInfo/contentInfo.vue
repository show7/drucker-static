<template>
  <div class="content-info-container">
    <!--详情-->
    <el-dialog
      :visible.sync="show"
      title="详情"
      :show-close="false"
      :before-close="handleCancelEmit"
      width="60%">
      <div class="desc-box">
        <el-row>
          <el-col :span="8">
            <h4>riseId</h4>
            <p>{{riseId}}</p>
          </el-col>
          <el-col :span="8">
            <h4>发布昵称</h4>
            <p>{{nickname ? nickname:'无'}}</p>
          </el-col>
          <el-col :span="8">
            <h4>头像</h4>
            <img class="head-imgurl" :src="headimgurl" alt="头像">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>所属群组</h4>
            <p>{{communityName}}</p>
          </el-col>
          <el-col :span="12">
            <h4>所属微信群</h4>
            <p>{{groupName}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>分类</h4>
            <p>{{findCategory}}</p>
          </el-col>
          <el-col :span="12">
            <h4>话题</h4>
            <p>{{topicName ? topicName :'无'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>操作</h4>
            <p>{{publish == 1 ? '上架':'保存'}}</p>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <h4>标题</h4>
            <p>{{title ? title :'无'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>摘要</h4>
            <p>{{description ? description :'无'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>头图</h4>
            <img class="img-list" :src="detail.headPic" alt='图片'>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>发布内容</h4>
            <p v-html="content"></p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>上传图片</h4>
            <img class="img-list" v-for="(item,index) in imgList" :key="index" :src="item" alt='图片'>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="handleCancelEmit">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import moment from 'moment'
  import _ from 'lodash'
  export default {
    name: 'contentInfo',
    data() {
      return {
        show: true, //对话框状态
        riseId: '', //圈外id
        nickname: '', //昵称
        content: '', //内容
        headimgurl: '', //头像
        postProfileId: 0, //提交人
        popOutCommunityId: null, //群组id
        popOutWechatGroupId: null, //微信群id
        popOutTopicId: null, //话题id
        publish : -1, //是否发布
        picGroupList : [], //图片列表
        communityList : [], //社群列表
        wechatGroupList : [], //微信群列表
        topicLabels : [], //话题列表
        imgList : [], //图片列表
        headPic: '', // 头图
        communityName: '', //所属群组name
        groupName: '', //所属群名
        topicName: '', //话题名
        headPicList: [], //头图
        title: '', //文章标题
        description: '', //描述
        categoryId : null,
        dialogVisiblePic: false,
        dialogImageUrl: '',
        categoryList : [
          {
            "id":1,
            "name":"话题",
          },
          {
            "id":2,
            "name":"分享",
          },
          {
            "id":3,
            "name":"文章",
          }
        ]
      }
    },
    props: ['detail'],
    methods: {

      handleCancelEmit(){
        this.show =false;
        this.$emit('closeDialog')
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
      this.popOutWechatGroupId = this.detail.popOutWechatGroupId;
      this.topicId = this.detail.popOutTopicId;
      this.content = this.detail.content;
      this.publish = this.detail.publish;
      this.picGroupList = this.detail.picGroupList;
      this.communityList = this.detail.communityList;
      this.wechatGroupList = this.detail.wechatGroupList;
      this.topicLabels = this.detail.topicLabels;
      this.title = this.detail.title;
      this.description = this.detail.description;
      this.headPic = this.detail.headPic;
      this.groupName = this.detail.groupName;
      this.communityName = this.detail.communityName;
      this.imgList = this.detail.imgList;
      if(this.detail.headPic){
        this.headPicList.push({id:1, url:this.detail.headPic});
      }
    }
  }


</script>

<style scoped lang="less">
  @import "contentInfo.less";
</style>
