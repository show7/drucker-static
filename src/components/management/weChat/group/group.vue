<template>
  <div class="group-container">
    <h3>群内容管理</h3>
    <!--头部内容-->
    <div class="group-top">
      <el-row>
        <el-col :span="6">
          <h4>账户，用户昵称</h4>
          <el-input placeholder="请输入用户账户或用户昵称" v-model="queryAccount" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <h4>发表状态（清除查询全部）</h4>
          <el-select v-model="statusId" placeholder="请选择状态" :clearable="true" @clear="Clear(0)">
            <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <h4>内容</h4>
          <el-input placeholder="请输入用户搜索内容" v-model="searchContent" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <h4>群组（清除查询全部）</h4>
          <el-select v-model="communityId" placeholder="请选择群组" :clearable="true" @change="communityIdChange"
                     @clear="Clear(1)">
            <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="second-line">
        <el-col :span="6">
          <h4>微信群（清除查询全部）</h4>
          <el-select v-model="wechatGroupId" placeholder="请选择微信群" :clearable="true" @clear="Clear(2)">
            <el-option v-for="item in wechatGroupList " :key="item.id" :label="item.groupName"
                       :value="item.id"></el-option>
          </el-select>
        </el-col>
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
      </el-row>
      <el-row class="second-line">
        <el-col :span="9">
          <h4>创建时间</h4>
          <el-date-picker
            v-model="createTime"
            type="daterange"
            :default-time="defaultTime"
            :picker-options="pickerOptions"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="10">
          <h4>发布时间</h4>
          <el-date-picker
            v-model="publishTime"
            type="daterange"
            :picker-options="pickerOptions"
            :default-time="defaultTime"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" class="buttons">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="clearSearch">清除查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-box">
      <el-row>
        <el-col :span="24">
          <div class="grid-content-right">
            <el-button type="primary" size="medium" @click="newAdd">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!--table表格-->
      <el-table
        :data="groupList"
        style="width: 100%">
        <el-table-column
          prop="nickname"
          width="150"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="labelCategory"
          label="分类">
          <template slot-scope="scope">
            <p>{{findCategory(scope.row.labelCategory)}}</p>
          </template>
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
          prop="labelName"
          width="200"
          label="标签">
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
          width="150"
          label="发布人">
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="发布状态">
          <template slot-scope="scope">
            <p class="publishStatus" :class="scope.row.publishStatus == 1 ? 'primary':''">{{scope.row.publishStatus == 1
              ? '已发布':scope.row.publishStatus == 0 ? '未修改':'已修改'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
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
    <ContentDetail v-if="showDetail" @closeDialog="handleGet" @reloadList="handleSave" :detail="detail" :editorFlag="editorFlag"/>
    <ContentInfo v-if="showInfo" @closeDialog="handleGet"  :detail="detail" />
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import moment from 'moment'
  import ContentDetail from './components/contentDetail/contentDetail'
  import ContentInfo from './components/contentInfo/contentInfo'
  import _ from 'lodash'

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
        searchContent: null, // 搜索内容
        statusList: [ { id: 0, name: '未修改' }, { id: 1, name: '已发布' }, { id: 2, name: '已修改' } ],
        statusId: null, //状态id
        communityList: [], //群组
        communityId: null, //群组选择的ID
        communityName: '', //所属群组name
        wechatGroupList: [], //微信群list,
        wechatGroupId: null, //微信群id
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
        defaultTime: [ '00:00:00', '23:59:59' ], //设置时间段 日期截止时间
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e6
          }
        },
        detail: {}, // 内容详情
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
          searchContent: this.searchContent ? this.searchContent : null,
          labelId: this.topicId ? this.topicId : this.shareId,
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
            this.wechatGroupList = item.wechatGroupList;
            this.topicLabels = item.topicLabels;
            this.shareLabels = item.shareLabels;
          }
        })
        this.wechatGroupId = null;
      },
      /*清除部分查询条件*/
      Clear(index) {
        if(index == 0) {
          this.statusId = null
        } else if(index == 1) {
          this.communityId = null;
          this.wechatGroupId = null;
          this.wechatGroupList = [];
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
        this.wechatGroupList = [];
        this.topicId = null;
        this.shareId = null;
        this.topicLabels = [];
        this.shareLabels = [];
        this.searchContent = null;
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
      /*转译分类*/
      findCategory: function (categoryId) {
        if(categoryId){
          if(categoryId === 1){
            return '话题'
          }else if(categoryId === 2){
            return '分享'
          }else if(categoryId === 3){
            return '文章'
          }
        }else{
          return '无'
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
        this.detail.wechatGroupList = this.wechatGroupList;
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
        this.detail.wechatGroupList = this.wechatGroupList;
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
        this.detail.wechatGroupList = this.wechatGroupList;
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
        this.getGroupList();
      }
    },
    created() {
      this.getGroupList()
    },
  }
</script>

<style scoped lang="less">
  @import "./group.less";
</style>
