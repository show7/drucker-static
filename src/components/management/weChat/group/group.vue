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
          <h4>群组（清除查询全部）</h4>
          <el-select v-model="communityId" placeholder="请选择群组" :clearable="true" @change="communityIdChange" @clear="Clear(1)">
            <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <h4>微信群（清除查询全部）</h4>
          <el-select v-model="wechatGroupId" placeholder="请选择微信群" :clearable="true"  @clear="Clear(2)">
            <el-option v-for="item in wechatGroupList " :key="item.id" :label="item.groupName" :value="item.id"></el-option>
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
        <el-col :span="12">
          <div class="grid-content-left">
            <el-button type="primary" size="medium" @click="groupPublish(checkbox)">发布</el-button>
          </div>
        </el-col>
        <el-col :span="12">
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
          label="选择">
          <template slot-scope="scope">
              <el-checkbox  :disabled="scope.row.publishStatus == 1 ? true:false " @change="(val)=>{checkboxChange(scope.row.esChatId,val)}"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          width="150"
          label="用户昵称">
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
          prop="content"
          width="300"
          label="发表内容">
          <template slot-scope="scope">
            <div class="content-box">
              <p class="content">{{scope.row.content}}</p>
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
              <p class="publishStatus" :class="scope.row.publishStatus == 1 ? 'primary':''">{{scope.row.publishStatus == 1 ? '已发布':scope.row.publishStatus == 0 ? '未修改':'已修改'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnlook(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              v-if="scope.row.publishStatus != 1"
              size="mini"
              @click="groupPublish([scope.row.esChatId])">发布</el-button>
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
    <!--编辑和新增弹框-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="50%">
      <div class="popout-box">
        <el-row>
          <el-col :span="12">
            <h4><span>*</span>riseId</h4>
            <el-input class="riseId-input" placeholder="请输入riseId" v-model="riseId" :disabled="editorFlag" clearable @clear="riseIdClear"></el-input>
            <el-button type="primary" size="small" :disabled="editorFlag" @click="getAdd">确 定</el-button>
          </el-col>
          <el-col :span="12">
            <h4><span>*</span>头像</h4>
            <img :src="headimgurl" alt="头像">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4><span>*</span>发布昵称</h4>
            <el-input placeholder="请输入昵称" v-model="nickname" :disabled="true"></el-input>
          </el-col>
          <el-col :span="12">
            <h4><span>*</span>所属群组</h4>
            <el-select v-model="popOutCommunityId" placeholder="请选择" :disabled="editorFlag" @change="popOutCommunityChange">
              <el-option
                v-for="item in communityList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4><span>*</span>所属微信群</h4>
            <el-select v-model="popOutWechatGroupId" placeholder="请选择" :disabled="editorFlag">
              <el-option
                v-for="item in popOutWechatGroupList"
                :key="item.id"
                :label="item.groupName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>发布内容</h4>
            <el-input type="textarea" placeholder="请输入" :row="8" v-model="content" ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>上传图片</h4>
            <el-upload
              action="/pc/upload/file"
              list-type="picture-card"
              :limit="9"
               :on-exceed="onExceed"
              :file-list ="picGroupList"
              :on-success="sendPicSuccess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisiblePic">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4><span>*</span>操作</h4>
            <el-radio v-model="publish" label="1">上架</el-radio>
            <el-radio v-model="publish" label="0">保存</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkSaveData">确 定</el-button>
      </span>
    </el-dialog>
   <!--详情-->
    <el-dialog
      title="详情"
      :visible.sync="dialogVisibleDesc"
      :show-close="false"
      width="40%">
      <div class="desc-box">
        <el-row>
          <el-col :span="12">
            <h4>riseId</h4>
            <p>{{riseId}}</p>
          </el-col>
          <el-col :span="12">
            <h4>头像</h4>
            <img  class="head-imgurl" :src="headimgurl" alt="头像">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>发布昵称</h4>
            <p>{{nickname ? nickname:'无'}}</p>
          </el-col>
          <el-col :span="12">
            <h4>所属群组</h4>
            <p>{{communityName}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4>所属微信群</h4>
            <p>{{groupName}}</p>
          </el-col>
          <el-col :span="12">
            <h4>操作</h4>
            <p>{{publish == 1 ? '上架':'保存'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>发布内容</h4>
            <p>{{content ? content : '无内容'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>上传图片</h4>
            <img class="img-list" v-for="(item,index) in picGroup" :key="index" :src="item" alt='图片'>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="dialogVisibleDesc = false">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
import Editor from '../../../common/editor/editor'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'group',
  components: {Editor},
  data () {
    return {
      groupList: [],
      dialogVisible: false,
      dialogVisibleDesc: false, //查看详情弹框
      title: '新增',
      imageUrl: '',
      queryAccount: null, //搜索的昵称
      statusList: [{id: 0, name: '未修改'}, {id: 1, name: '已发布'}, {id: 2, name: '已修改'}],
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
      dialogImageUrl: '',
      dialogVisiblePic: false,
      imgList: [], //图片list
      picGroupList: [], //展示的pic
      publish: '1', //操作
      riseId: '', //riseId填写
      headimgurl: '', //头像
      nickname: '', //昵称
      popOutCommunityId: null, //弹框群组
      popOutWechatGroupList: [], //弹框的微信群list
      popOutWechatGroupId: null,
      postProfileId: '', //新增和编辑的id
      editorFlag: false,
      pageIndex: 1,
      picGroup: [], //图片列表
      esChatId: '', //编辑的id
      content: '', //文本内容
      defaultTime: ['00:00:00', '23:59:59'], //设置时间段 日期截止时间
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  methods: {
    getGroupList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'weChat.groupManage.groupList',
        successCallback (res) {
          self.groupList = res.msg.content.content;
          self.communityList = res.msg.communityList;
          if (self.groupList.length > 0) {
            self.groupList.forEach((item, index) => {
              self.groupList[index].postTime = moment(item.postTime).format('YYYY-MM-DD HH:mm:ss');
            })
          }
          self.pageCount = res.msg.content.page.pageCount;
        }
      })
    },
    /*点击搜索*/
    handleSearch () {
      this.pageIndex = 1;
      this.groupSearch()
    },
    /*搜索接口*/
    groupSearch () {
      let self = this;
      let param = { queryAccount: this.queryAccount ? this.queryAccount : null,
        status: this.statusId,
        communityId: this.communityId,
        wechatGroupId: this.wechatGroupId,
        createStartTime: this.createTime != null ? this.createTime[0] : null,
        createEndTime: this.createTime != null ? this.createTime[1] : null,
        publishStartTime: this.publishTime != null ? this.publishTime[0] : null,
        publishEndTime: this.publishTime != null ? this.publishTime[1] : null,
        page: {pageSize: 10, page: this.pageIndex}
      };
      this.groupList = [];
      ApiDataFilter.request({
        apiPath: 'weChat.groupManage.groupSearch',
        method: 'post',
        data: param,
        successCallback (res) {
          self.groupList = res.msg.content;
          if (self.groupList.length > 0) {
            self.groupList.forEach((item, index) => {
              self.groupList[index].postTime = moment(item.postTime).format('YYYY-MM-DD HH:mm:ss');
            })
          }
          self.pageCount = res.msg.page.pageCount;
        }
      })
    },
    /*新增状态下查询*/
    getAdd () {
      if (!this.riseId) {
        this.$message.error('请填写riseId')
        return
      }
      let self = this;
      ApiDataFilter.request({
        apiPath: 'weChat.groupManage.getMember',
        pathParams: [this.riseId],
        successCallback (res) {
          self.headimgurl = res.msg.headimgurl;
          self.nickname = res.msg.nickname;
          self.postProfileId = res.msg.id;
        }
      })
    },
    /*新增和编辑接口*/
    handleGroupSave () {
      let self = this;
      let param = { picGroup: this.imgList, publish: this.publish, postProfileId: this.postProfileId, groupId: this.popOutWechatGroupId, content: this.content};
      this.esChatId ? Object.assign(param, {esChatId: this.esChatId}) : '';
      ApiDataFilter.request({
        apiPath: 'weChat.groupManage.groupSave',
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success(self.publish == 1 ? '上架成功' : '保存成功');
          self.dialogVisible = false;
          self.groupSearch();
        }
      })
    },
    /*验证填写的数据*/
    checkSaveData () {
      if (!this.postProfileId || !this.popOutWechatGroupId) {
        this.$message.error('请完善信息')
        return
      }
      if (!this.content && (this.imgList.length == 0 || this.imgList == null)) {
        this.$message.error('内容和图片至少填写一项')
        return
      }
      this.handleGroupSave();
    },
    /*群组选择change事件*/
    communityIdChange (val) {
      this.communityList.forEach((item, index) => {
        if (item.id == val) {
          this.wechatGroupList = item.wechatGroupList
        }
      })
      this.wechatGroupId = null;
    },
    /*弹框群组选择change事件*/
    popOutCommunityChange (val) {
      this.communityList.forEach((item, index) => {
        if (item.id == val) {
          this.popOutWechatGroupList = item.wechatGroupList
        }
      })
    },
    /*清除部分查询条件*/
    Clear (index) {
      if (index == 0) {
        this.statusId = null
      } else if (index == 1) {
        this.communityId = null;
        this.wechatGroupId = null;
        this.wechatGroupList = [];
      } else {
        this.wechatGroupId = null;
      }
    },
    /*清除搜索条件*/
    clearSearch () {
      this.queryAccount = null;
      this.statusId = null;
      this.communityId = null;
      this.wechatGroupId = null;
      this.createTime = null;
      this.publishTime = null;
      this.wechatGroupList = [];
      this.groupSearch();
    },
    /*得到当前页数*/
    currentChange (pageIndex) {
      this.pageIndex = pageIndex;
      this.groupSearch();
    },
    /*选择框发生改变*/
    checkboxChange (id, val) {
      if (val) {
        this.checkbox.push(id)
      } else {
        this.checkbox.forEach((item, index) => {
          if (item == id) {
            this.checkbox.splice(index, 1)
          }
        })
      }
    },
    /*发布*/
    groupPublish (checkbox) {
      if (checkbox.length == 0) {
        this.$message.error('请先选择需要发布的选项');
        return
      }
      let self = this;
      ApiDataFilter.request({
        apiPath: 'weChat.groupManage.groupPublish',
        method: 'post',
        data: {esIds: checkbox},
        successCallback (res) {
          self.$message.success('发布成功');
          self.groupSearch();
          self.checkbox = [];
        }
      })
    },
    /*新增弹框*/
    newAdd () {
      this.editorFlag = false;
      this.riseId = null;
      this.nickname = null;
      this.headimgurl = null;
      this.esChatId = null;
      this.popOutCommunityId = null;
      this.popOutWechatGroupId = null;
      this.postProfileId = null;
      this.publish = '1';
      this.dialogVisible = true;
      this.content = '';
      this.picGroupList = [];
      this.imgList = [];
      this.popOutWechatGroupList = [];
    },
    /*编辑弹框*/
    handleEdit (index, row) {
      this.title = '编辑';
      this.nickname = row.nickname;
      this.esChatId = row.esChatId;
      this.editorFlag = true;
      this.riseId = row.riseId;
      this.headimgurl = row.avatar;
      this.postProfileId = row.profileId;
      this.popOutCommunityChange(row.communityId);
      this.popOutCommunityId = row.communityId;
      this.popOutWechatGroupId = row.groupId;
      this.publish = row.publish.toString();
      this.dialogVisible = true;
      this.content = row.content;
      this.imgList = row.picGroup;
      let picGroup = [];
      if (row.picGroup != null && row.picGroup.length > 0) {
        row.picGroup.forEach((item, index) => {
          picGroup.push({id: index, url: item})
        });
      }
      this.picGroupList = picGroup
    },
    /*查看详情*/
    handleOnlook (index, row) {
      this.riseId = row.riseId;
      this.nickname = row.nickname;
      this.headimgurl = row.avatar;
      this.communityName = row.communityName;
      this.groupName = row.groupName;
      this.publish = row.publish.toString();
      this.dialogVisibleDesc = true;
      this.content = row.content
      this.picGroup = row.picGroup;
    },
    /*上传图片*/
    sendPicSuccess (res, file, fileList) {
      this.imgList = this.handleAddReducePic(fileList);
    },
    /*图片数据列表形式*/
    handleAddReducePic (fileList) {
      let imgList = [];
      if (fileList.length > 0) {
        fileList.forEach((item, index) => {
          if ('response' in item) {
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
    oneEditorChange (val) {
      this.content = val;
    },
    /*删除图片*/
    handleRemove (file, fileList) {
      this.imgList = this.handleAddReducePic(fileList);
    },
    /*图片预览*/
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisiblePic = true;
    },
    /*超出图片上传限时*/
    onExceed () {
      this.$message.error('图片最多上传九张')
    },
    /*清除弹框的riseId*/
    riseIdClear () {
      this.headimgurl = null;
      this.nickname = null;
      this.popOutCommunityId = null;
      this.popOutWechatGroupId = null;
    },
    /*去除标签*/
    removeHtmlTags (str) {
      let newStr = _.trim(str)
      // 去除 html 标签
      newStr = newStr.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '')
      newStr = newStr.replace(/<\/?[^>]*>/g, '')
      // 去除实体字符
      newStr = newStr.replace(/&[^;]+;/g, '')
      return newStr
    }
  },
  created () {
    this.getGroupList()
  }
}
</script>

<style scoped lang="less">
  @import "./group.less";
</style>
