<template>
     <div class="lives-container">
       <h3>直播内容编辑</h3>
       <div class="lives-top">
         <el-button type="primary" @click="addItem">新增</el-button>
       </div>
       <div class="lives-content">
         <el-table
           :data="showLivesList"
           style="width: 100%">
           <el-table-column
             prop="name"
             label="名称">
           </el-table-column>
           <el-table-column
             prop="speaker"
             label="主讲人">
           </el-table-column>
           <el-table-column
             prop="startTimeString"
             label="开始时间">
           </el-table-column>
           <el-table-column
             prop="endTimeString"
             label="结束时间">
           </el-table-column>
           <el-table-column
           prop="sequence"
           label="优先次序（值越大越靠前）">
           </el-table-column>
           <el-table-column width="200" fixed="right" label="操作">
             <template slot-scope="scope">
               <el-button
                 size="mini"
                 @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
               <el-button
                 size="mini"
                 @click="livesDelete(scope.$index, scope.row)">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
         <div class="pagination">
           <el-pagination
             background
             layout="prev, pager, next"
             :current-page="pageIndex"
             @current-change="currentChange"
             :page-count="Math.ceil(livesList.length/10)">
           </el-pagination>
         </div>
         <el-dialog
           :title="title"
           :visible.sync="dialogVisible"
           :close-on-click-modal="false"
           :show-close="false"
           width="60%">
           <div class="layout-box">
             <el-row>
               <el-col :span="12">
                 <h4>直播名称</h4>
                 <el-input
                   placeholder="请输入直播名称"
                   v-model="itemData.name"
                   clearable>
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <h4>主讲人名称</h4>
                 <el-input
                   placeholder="请输入主讲人名称"
                   v-model="itemData.speaker"
                   clearable>
                 </el-input>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <h4>主讲人描述（直播详情页面）</h4>
                 <el-input
                   type="textarea"
                   :rows="4"
                   placeholder="请输入主讲人描述"
                   v-model="itemData.speakerDesc">
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <h4>主讲人简介（列表页面）</h4>
                 <el-input
                   type="textarea"
                   :rows="4"
                   placeholder="请输入主讲人简介"
                   v-model="itemData.speakerIntro">
                 </el-input>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <h4>直播简介</h4>
                 <el-input
                   type="textarea"
                   :rows="4"
                   placeholder="请输入直播简介"
                   v-model="itemData.liveDesc">
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <h4>开始和结束时间</h4>
                 <el-date-picker
                   v-model="dateList"
                   type="datetimerange"
                   value-format="timestamp"
                   range-separator="至"
                   start-placeholder="开始日期"
                   end-placeholder="结束日期">
                 </el-date-picker>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <h4>缩略图链接</h4>
                 <el-input
                   placeholder="请输入缩略图链接"
                   v-model="itemData.thumbnail"
                   clearable>
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <h4>大展示图，详情页面banner链接</h4>
                 <el-input
                   placeholder="请输入大展示图链接"
                   v-model="itemData.banner"
                   clearable>
                 </el-input>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <h4>链接地址</h4>
                 <el-input
                   placeholder="请输入链接地址"
                   v-model="itemData.linkUrl"
                   clearable>
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <el-checkbox v-model="itemData.permission">是否仅会员可见</el-checkbox>
               </el-col>
             </el-row>
             <el-row>
               <el-col :span="12">
                 <h4>排序</h4>
                 <el-input
                   type="number"
                   placeholder="请输入排序"
                   v-model="itemData.sequence"
                   clearable>
                 </el-input>
               </el-col>
               <el-col :span="12">
                 <h4>密码</h4>
                 <el-input
                   placeholder="请输入密码"
                   v-model="itemData.password"
                   clearable>
                 </el-input>
               </el-col>
             </el-row>
           </div>
           <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="send">确 定</el-button>
           </span>
         </el-dialog>
       </div>
     </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
import moment from 'moment'
export default {
  name: 'lives',
  data () {
    return {
      livesList: [], //总list
      showLivesList: [], //展示的list
      itemData: {
        name: '', //直播名称
        speaker: '', //主讲人名称
        speakerDesc: '', //主讲人描述
        speakerIntro: '', //主讲人简介
        liveDesc: '', // 直播简介
        thumbnail: '', //缩略图链接
        banner: '', //大展示图
        startTime: '', //开始时间
        endTime: '', //结束时间
        linkUrl: '', //链接地址
        permission: false, //是否会员可见
        sequence: '', //排序
        password: ''//密码
      },
      dateList: [],
      dialogVisible: false,
      title: '新增',
      id: '',
      way: 0,
      pageIndex:1,
    }
  },
  methods: {
    getLivesList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.lives.livesList',
        successCallback :(res)=> {
          self.livesList = res.msg || [];
          if (self.livesList.length > 0) {
            self.livesList.forEach((item, index) => {
              self.livesList[index].startTimeString = moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
              self.livesList[index].endTimeString = moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')
            })
          }
          self.currentChange(1);
        }
      })
    },
    /*处理数据页码*/
    currentChange (pageIndex) {
      let start = (pageIndex - 1) * 10;
      let end = pageIndex * 10;
      this.showLivesList = this.livesList.slice(start, end);
      this.pageIndex = pageIndex;
    },
    pageData(pageIndex){
      let start = (pageIndex - 1) * 10;
      let end = pageIndex * 10;
      this.showLivesList = this.livesList.slice(start, end)
    },
    /*发送*/
    send () {
      this.handleInsertUpdate(this.way)
    },
    /*新增和更新数据*/
    handleInsertUpdate (index) {
      let self = this;
      let param = {banner: this.itemData.banner,
        del: false,
        endTime: this.dateList[1],
        linkUrl: this.itemData.linkUrl,
        liveDesc: this.itemData.liveDesc,
        name: this.itemData.name,
        password: this.itemData.password,
        permission: this.itemData.permission,
        sequence: this.itemData.sequence,
        speaker: this.itemData.speaker,
        speakerDesc: this.itemData.speakerDesc,
        speakerIntro: this.itemData.speakerIntro,
        startTime: this.dateList[0],
        startTimeStr: null,
        thumbnail: this.itemData.thumbnail};
      index == 0 ? '' : Object.assign(param, {id: this.id})
      let apiPath = index == 0 ? 'manage.lives.livesInsert' : 'manage.lives.livesUpdate';
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功');
          self.dialogVisible = false;
          self.getLivesList();
        }
      })
    },
    /*删除*/
    livesDelete (index, row) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.lives.livesDelete',
        method: 'post',
        data: {id: row.id},
        successCallback (res) {
          self.$message.success('删除成功');
          self.getLivesList();
        }
      })
    },
    /*编辑*/
    handleEdit (index, row) {
      this.itemData.name = row.name;
      this.itemData.speaker = row.speaker;
      this.itemData.speakerDesc = row.speakerDesc;
      this.itemData.speakerIntro = row.speakerIntro;
      this.itemData.liveDesc = row.liveDesc;
      this.itemData.thumbnail = row.thumbnail;
      this.itemData.banner = row.banner;
      this.dateList[0] = row.startTime;
      this.dateList[1] = row.endTime;
      this.itemData.linkUrl = row.linkUrl;
      this.itemData.permission = row.permission;
      this.itemData.sequence = row.sequence;
      this.itemData.password = row.password;
      this.way = 1;
      this.id = row.id;
      this.dialogVisible = true;
      this.title = '编辑';
    },
    /*新增弹框*/
    addItem () {
      this.itemData.name = '';
      this.itemData.speaker = '';
      this.itemData.speakerDesc = '';
      this.itemData.speakerIntro = '';
      this.itemData.liveDesc = '';
      this.itemData.thumbnail = '';
      this.itemData.banner = '';
      this.dateList = [];
      this.itemData.linkUrl = '';
      this.itemData.permission = false;
      this.itemData.sequence = '';
      this.itemData.password = '';
      this.dialogVisible = true;
      this.way = 0;
      this.title = '新增';
    }
  },
  created () {
    this.getLivesList()
  }
}
</script>

<style scoped lang="less">
@import "lives.less";
</style>
