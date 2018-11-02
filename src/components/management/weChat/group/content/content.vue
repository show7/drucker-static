<template>
  <div class="group-container">
    <h3>群内容管理</h3>
    <!--头部内容-->
    <div class="group-top">
      <el-row>
        <el-col :span="4">
          <h4>账户，用户昵称</h4>
          <el-input placeholder="请输入用户账户或用户昵称" v-model="queryAccount" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <h4>标题</h4>
          <el-input placeholder="请输入用户搜索标题" v-model="searchTitle" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <h4>内容</h4>
          <el-input placeholder="请输入用户搜索内容" v-model="searchContent" clearable></el-input>
        </el-col>
        <el-col :span="4">
          <h4>群组（清除查询全部）</h4>
          <el-autocomplete
            class="inline-input"
            :fetch-suggestions="querySearch"
            value-key="name"
            v-model="state1"
            placeholder="请输入群组名"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
        <el-col :span="4">
          <h4>栏目（清除查询全部）</h4>
          <el-select v-model="labelCategory" placeholder="请选择栏目" :clearable="true" @change="topicIdChange">
            <el-option v-for="item in categories" :key="item.labelCategory" :label="item.name" :value="item.labelCategory"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="second-line">
        <el-col :span="6">
          <h4>话题（清除查询分享）</h4>
          <el-select v-model="topicId" placeholder="请选择话题" :clearable="true" @change="topicIdChange">
            <el-option v-for="item in topicLabels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <h4>分享（清除查询话题）</h4>
          <el-select v-model="shareId" placeholder="请选择分享" :clearable="true" @change="shareIdChange">
            <el-option v-for="item in shareLabels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <h4>分类</h4>
          <el-select v-model="categoryId" placeholder="请选择">
            <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="buttons">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="clearSearch">清除查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-box">
      <el-row>
        <el-col :span="12">
          <div class="grid-content-lift">
            <el-button type="primary" @click="putDown" size="medium" >下架</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-right">
            <el-button type="danger" size="medium" @click="newAdd">添加群内容</el-button>
          </div>
        </el-col>
      </el-row>
      <!--table表格-->
      <el-table
        :data="groupList"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="群组">
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="微信群">
        </el-table-column>
        <el-table-column
          width="100"
          label="上传评论">
          <template slot-scope="scope">
      <!--      <el-upload
              class="upload-demo"
              action="/pc/wxmini/content/upload/file"
              :data="{contentId:scope.row.id}"
              :limit="1"
              :show-file-list="false"
              :file-list="fileList"
              :on-exceed="handleExceed"
              :on-success="handleUpSuccess"
              :before-upload="beforeUpload">
              <p class="uploader-file">上传评论</p>
              &lt;!&ndash;<el-button size="small" type="primary">点击上传</el-button>&ndash;&gt;
            </el-upload>-->
            <p class="uploader-file" @click="handleEditComment(scope.$index,scope.row)">上传评论</p>

          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          width="300"
          label="发表内容">
          <template slot-scope="scope">
            <div class="content-box">
              <p class="content">{{scope.row.displayContent}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="postTime"
          width="200"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="publishPerson"
          label="发布人">
        </el-table-column>

        <el-table-column
          prop="publishStatus"
          label="发布状态">
          <template slot-scope="scope">
            <p class="publishStatus" :class="scope.row.publishStatus == 1 ? 'primary':''">
              {{scope.row.publishStatus == 1 ? '已发布':scope.row.publishStatus == 0 ? '未修改':'已修改'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="350" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnlook(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              v-if="scope.row.publishStatus != 1"
              size="mini"
              @click="groupPublish([scope.row.esChatId])">发布
            </el-button>
            <el-button
              size="mini"
              @click="groupPriority(scope.row.labelCategory,scope.row.publishStatus,scope.row.esChatId,scope.row.priority)">{{scope.row.priority ? '取消推荐':'推荐'}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pageIndex"
          @current-change="currentChange"
          :page-count="pageCount">
        </el-pagination>
      </div>
    </div>
    <ContentDetail v-if="showDetail" @closeDialog="handleGet"
                   :categoryList="categoryList"
                   @reloadList="handleSave" :detail="detail" :editorFlag="editorFlag"/>
    <ContentInfo v-if="showInfo" @closeDialog="handleGet"  :detail="detail" />

    <!--上传评论-->
    <el-dialog
      title="评论"
      :visible.sync="dialogVisibleComment"
      :show-close="false"
      :close-on-click-modal="false"
       width="40%">
      <div class="pop-out-comment">
        <div class="comment-list">
          <el-table
            :data="commentList"
            @selection-change="handleSelectionChange"
            ref="multipleTable"
            style="width: 100%">
            <el-table-column
              prop="nickName"
              width="150"
              label="用户昵称">
            </el-table-column>
            <el-table-column
              prop="comment"
              width="300"
              label="发表内容">
              <template slot-scope="scope">
                <div class="content-box">
                  <p class="content">{{scope.row.comment}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="statusString"
              label="状态">
            </el-table-column>
            <el-table-column width="100" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleChangeStatus(scope.$index, scope.row)"> {{scope.row.status === 0 ? '发布':'隐藏'}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="input-comment">
          <el-row>
            <el-col :span="19">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入评论"
                v-model="commentValue">
              </el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="sendComment">提交评论</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisibleComment = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import moment from 'moment'
  import ContentDetail from './components/contentDetail/contentDetail'
  import ContentInfo from './components/contentInfo/contentInfo'
  import _ from 'lodash'
  import apiDataFilter from "../../../../../libraries/apiDataFilter";

  export default {
    name: 'group',
    components: { ContentDetail, ContentInfo },
    data() {
      return {
        topicLabels: [],//话题列表
        shareLabels: [],//分享列表
        topicId: null,
        shareId: null,
        topicName:null,
        shareName:null,
        groupList: [],
        dialogVisible: false, //编辑弹框
        dialogVisibleDesc: false, //查看详情弹框
        imageUrl: '',
        showDetail : false,  //展示修改弹窗
        showInfo : false,  //展示详情弹窗
        queryAccount: null, //搜索的昵称
        searchTitle: null, //搜索标题
        searchContent: null, // 搜索内容
        statusList: [ { id: 0, name: '未修改' }, { id: 1, name: '已发布' }, { id: 2, name: '已修改' } ],
        statusId: null, //状态id
        communityList: [], //群组
        communityId: null, //群组选择的ID
        communityName: '', //所属群组name
        groupName: '', //所属群名
        createTime: null, //创建时间list
        createStartTime: null, //创建开始时间
        createEndTime: null, //创建结束时间
        publishTime: null, //发布时间list
        publishStartTime: null, //发布开始时间
        publishEndTime: null, //发布结束时间
        pageCount: null, //总共的页数
        checkbox: [], //checkbox发布选择
        imgList: [], //图片list
        picGroupList: [], //展示的pic
        publish: '1', //操作
        editorFlag: false,
        pageIndex: 1,
        detail: {}, // 内容详情
        categoryList:[],//分类列表
        categoryId:null,
        multipleSelection:[],
        state1: '',
        fileList:[],
        dialogVisibleComment:false,
        commentValue:'',
        categories:[],//栏目
        labelCategory:null,//栏目id
        contentId:null,
        commentList:[],//评论列表
      }
    },
    methods: {
      getGroupList() {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'weChat.groupManage.groupList',
          successCallback(res) {
            self.groupList = res.msg.content.content;
            self.communityList = res.msg.communityList;
            if(self.groupList.length > 0) {
              self.groupList.forEach((item, index) => {
                self.groupList[ index ].postTime = moment(item.postTime).format('YYYY-MM-DD HH:mm:ss');
              })
            }
            self.pageCount = res.msg.content.page.pageCount;
          }
        })
      },
      /*点击搜索*/
      handleSearch() {
        this.pageIndex = 1;
        this.groupSearch()
      },
      /*搜索接口*/
      groupSearch() {
        let self = this;
        let param = {
          queryAccount: this.queryAccount ? this.queryAccount : null,
          status: this.statusId,
          communityId: this.communityId,
          wechatGroupId: this.wechatGroupId,
          createStartTime: this.createTime != null ? this.createTime[ 0 ] : null,
          createEndTime: this.createTime != null ? this.createTime[ 1 ] : null,
          publishStartTime: this.publishTime != null ? this.publishTime[ 0 ] : null,
          publishEndTime: this.publishTime != null ? this.publishTime[ 1 ] : null,
          searchTitle: this.searchTitle != null ? this.searchTitle : null,
          searchContent: this.searchContent ? this.searchContent : null,
          labelId: this.topicId ? this.topicId : this.shareId,
          labelCategory:this.categoryId ? this.categoryId:null,
          page: { pageSize: 10, page: this.pageIndex }
        };
        this.groupList = [];
        ApiDataFilter.request({
          apiPath: 'weChat.groupManage.groupSearch',
          method: 'post',
          data: param,
          successCallback(res) {
            self.groupList = res.msg.content;
            if(self.groupList.length > 0) {
              self.groupList.forEach((item, index) => {
                self.groupList[ index ].postTime = moment(item.postTime).format('YYYY-MM-DD HH:mm:ss');
              })
            }
            self.pageCount = res.msg.page.pageCount;
          }
        })
      },
      /*选择话题 */
      topicIdChange(val) {
        this.shareId = null;
      },
      shareIdChange(val) {
        this.topicId = null;
      },
      /*群组选择change事件*/
      communityIdChange(val) {
        this.communityList.forEach((item, index) => {
          if(item.id == val) {
            this.topicLabels = item.topicLabels;
            this.shareLabels = item.shareLabels;
            this.categories = item.categories;
          }
        })
        this.wechatGroupId = null;
        this.labelCategory = null
      },
      /*清除部分查询条件*/
      Clear(index) {
        if(index == 0) {
          this.statusId = null
        } else if(index == 1) {
          this.communityId = null;
          this.wechatGroupId = null;
          this.topicId = null;
          this.shareId = null;
          this.topicLabels = [];
          this.shareLabels = [];
        } else {
          this.wechatGroupId = null;
        }
      },
      /*清除搜索条件*/
      clearSearch() {
        this.queryAccount = null;
        this.statusId = null;
        this.communityId = null;
        this.wechatGroupId = null;
        this.createTime = null;
        this.publishTime = null;
        this.topicId = null;
        this.shareId = null;
        this.topicLabels = [];
        this.shareLabels = [];
        this.searchTitle = null;
        this.searchContent = null;
        this.categoryId = null;
        this.groupSearch();
      },
      /*得到当前页数*/
      currentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.groupSearch();
      },
      /*选择框发生改变*/
      checkboxChange(id, val) {
        if(val) {
          this.checkbox.push(id)
        } else {
          this.checkbox.forEach((item, index) => {
            if(item == id) {
              this.checkbox.splice(index, 1)
            }
          })
        }
      },
      /*发布*/
      groupPublish(checkbox) {
        if(checkbox.length == 0) {
          this.$message.error('请先选择需要发布的选项');
          return
        }
        let self = this;
        ApiDataFilter.request({
          apiPath: 'weChat.groupManage.groupPublish',
          method: 'post',
          data: { esIds: checkbox },
          successCallback(res) {
            self.$message.success('发布成功');
            self.groupSearch();
            self.checkbox = [];
          }
        })
      },
      /*新增弹框*/
      newAdd() {
        this.detail = {};
        this.dialogVisible = true;
        this.editorFlag = false;
        this.dialogVisibleDesc = false;
        this.showDetail = true;
        this.detail.communityList = this.communityList;
        this.detail.topicLabels = this.topicLabels;
      },
      /*编辑弹框*/
      handleEdit(index, row) {
        this.detail = row;
        this.communityIdChange(row.communityId);
        this.detail.headimgurl = row.avatar;
        this.detail.postProfileId = row.profileId;
        this.detail.popOutCommunityId = row.communityId;
        this.detail.popOutWechatGroupId = row.groupId;
        this.detail.esChatId = row.esChatId;
        this.detail.popOutShareId = row.shareId;
        this.detail.popOutTopicId = row.topicId;
        this.detail.publish = row.publish.toString();
        this.detail.communityList = this.communityList;
        this.detail.topicLabels = this.topicLabels;
        let picGroup = [];
        if(row.picGroup != null && row.picGroup.length > 0) {
          row.picGroup.forEach((item, index) => {
            picGroup.push({ id: index, url: item })
          });
        }
        this.detail.picGroupList = picGroup;
        this.detail.imgList = row.picGroup;
        this.editorFlag = true;
        this.dialogVisibleDesc = false;
        this.dialogVisible = true;
        this.showDetail =true;
        this.editorName = row.nickname;
      },
      /*查看详情*/
      handleOnlook(index, row) {
        this.detail = row
        this.detail.headimgurl = row.avatar;
        this.detail.postProfileId = row.profileId;
        this.detail.popOutCommunityId = row.communityId;
        this.detail.popOutWechatGroupId = row.groupId;
        this.detail.popOutShareId = row.shareId;
        this.detail.popOutTopicId = row.topicId;
        this.detail.publish = row.publish.toString();
        let picGroup = [];
        if(row.picGroup != null && row.picGroup.length > 0) {
          row.picGroup.forEach((item, index) => {
            picGroup.push({ id: index, url: item })
          });
        }
        this.detail.picGroupList = picGroup;
        this.detail.imgList = row.picGroup;
        this.detail.communityList = this.communityList;
        this.detail.groupName = row.groupName;
        this.detail.communityName = row.communityName;
        this.detail.topicLabels = this.topicLabels;
        this.dialogVisibleDesc = true;
        this.dialogVisible = false;
        this.editorFlag = false;
        this.showInfo =true;
      },
      handleGet(){
        this.dialogVisibleDesc = false;
        this.dialogVisible = false;
        this.editorFlag = false;
        this.showInfo = false;
        this.showDetail = false;
      },
      handleSave(){
        this.dialogVisibleDesc = false;
        this.dialogVisible = false;
        this.editorFlag = false;
        this.showInfo = false;
        this.showDetail = false;
      /*  this.pageIndex = 1;*/
        this.groupSearch();
      },
      /*推荐和取消推荐*/
      groupPriority(labelCategory, publishStatus, id, priority){
        if (labelCategory == 1){
          this.$message.info('话题观点暂不能推荐～')
          return;
        }
        if (publishStatus != 1){
          this.$message.info('发布之后才能推荐哦！')
          return;
        }
        let param = {esId:id,status:!priority};
        apiDataFilter.request({
          apiPath:'weChat.groupManage.recommend',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('操作成功');
            this.groupSearch();
          }
        })
      },
       /*获取分类*/
      getCategory(){
       apiDataFilter.request({
         apiPath:'weChat.groupManage.category',
         successCallback:(res)=>{
            this.categoryList = res.msg;
         }
       })
      },
      /*下架*/
      putDown(){
       let idList = [];
       let statusList = [];
        this.multipleSelection.forEach((item,index)=>{
          if (item.publishStatus != 1){
            statusList.push(item.esChatId)
          } else {
            idList.push(item.esChatId)
          }
        })
        if (statusList.length>0){
          this.$message.error('不能选择未发布的选项哦！');
          return;
        }
        apiDataFilter.request({
          apiPath:'weChat.groupManage.unPublish',
          method:'post',
          data:{esIds: idList},
          successCallback:()=>{
            this.$message.success('操作成功');
            this.getGroupList();
          }
        })
      },
      handleSelectionChange(val) {
       this.multipleSelection = val;
      },
      /*模糊查询*/
      querySearch(queryString, cb) {
        let communityList = this.communityList;
        let results = queryString ? communityList.filter(this.createFilter(queryString)) : communityList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      /*匹配*/
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.indexOf(queryString) != -1);
        };
      },
      /*选择*/
      handleSelect(result){
       this.communityIdChange(result.id);
       this.communityId = result.id
      },
      handleEditComment(index,row){
        this.contentId = row.id;
        this.commentValue = '';
        if ( this.contentId) {
          this.dialogVisibleComment = true;
          this.getCommentList();
        }else {
          this.$message.info('评论前必须要发布哦！')
        }
      },
      getCommentList(){
        let param = {contentId:this.contentId}
        apiDataFilter.request({
          apiPath:'weChat.groupManage.commentList',
          data:param,
          successCallback:(res)=>{
            this.commentList = res.msg;
          }
        })
      },
      /*确认改变状态*/
      handleChangeStatus(index,row){
        let text =  row.status == 0?  '是否继续发布?':'是否继续隐藏?';
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.conformChange(row.status,row.commentId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      /*改变评论状态*/
      conformChange(status,commentId){
        let apiPath =  status == 0 ? 'weChat.groupManage.show':'weChat.groupManage.hidden';
        let param = {commentId:commentId}
        apiDataFilter.request({
          apiPath:apiPath,
          data:param,
          successCallback:(res)=>{
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getCommentList()
          }
        })
      },
      /*提交评论*/
      sendComment(){
        if (!this.commentValue) {this.$message.error('请填写评论'); return};
        let param = {comment:this.commentValue, contentId: this.contentId}
        apiDataFilter.request({
          apiPath:'weChat.groupManage.comment',
          data:param,
          method:'post',
          successCallback:()=>{
            this.$message.success('提交成功');
            this.getCommentList();
          }
        })
      }
    },
    created() {
      this.getGroupList();
      this.getCategory();

    },
  }
</script>

<style scoped lang="less">
  @import "content.less";
</style>
