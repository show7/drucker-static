<template>
  <div class="activities-container">
    <h3>线下活动编辑</h3>
    <div class="activities-top">
      <el-button type="primary" @click="addItem">新增</el-button>
    </div>
    <div class="activities-content">
      <el-table
        :data="showactivitiesList"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="holder"
          label="举办方">
        </el-table-column>
        <el-table-column
          prop="location"
          label="举办地点">
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
              @click="activitiesDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page="pageIndex"
          @current-change="currentChange"
          :page-count="Math.ceil(activitiesList.length/10)">
        </el-pagination>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="60%">
        <div class="popout-box">
          <el-row>
            <el-col :span="12">
              <h4>活动名称</h4>
              <el-input
                placeholder="请输入活动名称"
                v-model="itemData.name"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">
              <h4>活动举办人</h4>
              <el-input
                placeholder="请输入活动举办人"
                v-model="itemData.holder"
                clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <h4>活动举办地点</h4>
              <el-input
                placeholder="请输入活动举办地点"
                v-model="itemData.location"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">
              <h4>缩略图</h4>
              <el-input
                placeholder="请输入缩略图"
                v-model="itemData.thumbnail"
                clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
             <h4>1-准备中, 2-已关闭报名, 3-回顾</h4>
              <el-input
                placeholder="请输入状态"
                v-model="itemData.status"
                clearable>
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
              <h4>会员售卖链接</h4>
              <el-input
                placeholder="请输入会员售卖链接"
                v-model="itemData.vipSaleLinkUrl"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">
              <h4>普通用户售卖链接</h4>
              <el-input
                placeholder="请输入普通用户售卖链接"
                v-model="itemData.guestSaleLinkUrl"
                clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <h4>活动链接</h4>
              <el-input
                placeholder="请输入活动链接"
                v-model="itemData.linkUrl"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">
              <h4>次序</h4>
              <el-input
                placeholder="请输入活动链接"
                v-model="itemData.sequence"
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
  name: 'activities',
  data () {
    return {
      activitiesList: [], //总list
      showactivitiesList: [], //展示的list
      itemData: {
        name: '', //名称
        holder: '', //举办人名称
        location: '', //地址
        thumbnail: '', //缩略图链接
        startTime: '', //开始时间
        endTime: '', //结束时间
        status: '', //状态
        vipSaleLinkUrl: '', //会员售卖页链接
        guestSaleLinkUrl: '', //普通用户售卖链接
        linkUrl: '', //活动链接
        sequence: ''//排序
      },
      dateList: [],
      dialogVisible: false,
      title: '新增',
      id: '', //编辑时需要入参
      way: 0, //
      pageIndex:1
    }
  },
  methods: {
    getActivitiesList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.activities.activitiesList',
        successCallback (res) {
          self.activitiesList = res.msg || [];
          if (self.activitiesList.length > 0) {
            self.activitiesList.forEach((item, index) => {
              self.activitiesList[index].startTimeString = moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
              self.activitiesList[index].endTimeString = moment(item.endTime).format('YYYY-MM-DD HH:mm:ss')
            })
          }
          self.currentChange(1)
        }
      })
    },
    /*处理时间显示方式*/
    currentChange (pageIndex) {
      let start = (pageIndex - 1) * 10;
      let end = pageIndex * 10;
      this.showactivitiesList = this.activitiesList.slice(start, end);
      this.pageIndex =pageIndex
    },
    /*发送*/
    send () {
      if (this.dateList.length < 1 || !this.itemData.linkUrl || !this.itemData.status || !this.itemData.name || !this.itemData.vipSaleLinkUrl
        || !this.itemData.sequence || !this.itemData.guestSaleLinkUrl || !this.itemData.holder || !this.itemData.location || !this.itemData.thumbnail) {
        this.$message.error('请完善信息');
        return
      }
      this.handleInsertUpdate(this.way)
    },
    /*新增和更新数据*/
    handleInsertUpdate (index) {
      let self = this;
      let param = { del: false,
        endTime: this.dateList[1],
        linkUrl: this.itemData.linkUrl,
        name: this.itemData.name,
        sequence: this.itemData.sequence,
        status: this.itemData.status,
        thumbnail: this.itemData.thumbnail,
        vipSaleLinkUrl: this.itemData.vipSaleLinkUrl,
        guestSaleLinkUrl: this.itemData.guestSaleLinkUrl,
        holder: this.itemData.holder,
        location: this.itemData.location,
        startTime: this.dateList[0]};
      index === 0 ? '' : Object.assign(param, {id: this.id});
      let apiPath = index === 0 ? 'manage.activities.activitiesInsert' : 'manage.activities.activitiesUpdate';
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功');
          self.dialogVisible = false;
          self.getActivitiesList();
        }
      })
    },
    /*删除*/
    activitiesDelete (index, row) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.activities.activitiesDelete',
        method: 'post',
        data: {id: row.id},
        successCallback (res) {
          self.$message.success('删除成功');
          self.getActivitiesList();
        }
      })
    },
    /*编辑*/
    handleEdit (index, row) {
      this.itemData.name = row.name;
      this.itemData.holder = row.holder;
      this.itemData.location = row.location;
      this.itemData.thumbnail = row.thumbnail;
      this.dateList[0] = row.startTime;
      this.dateList[1] = row.endTime;
      this.itemData.linkUrl = row.linkUrl;
      this.itemData.status = row.status;
      this.itemData.sequence = row.sequence;
      this.itemData.vipSaleLinkUrl = row.vipSaleLinkUrl;
      this.itemData.guestSaleLinkUrl = row.guestSaleLinkUrl;
      this.way = 1;
      this.id = row.id;
      this.dialogVisible = true;
      this.title = '编辑';
    },
    /*新增弹框*/
    addItem () {
      this.itemData.name = '';
      this.itemData.holder = '';
      this.itemData.location = '';
      this.itemData.thumbnail = '';
      this.dateList = [];
      this.itemData.linkUrl = '';
      this.itemData.status = '';
      this.itemData.sequence = '';
      this.itemData.vipSaleLinkUrl = '';
      this.itemData.guestSaleLinkUrl = '';
      this.dialogVisible = true;
      this.way = 0;
      this.title = '新增';
    }
  },
  created () {
    this.getActivitiesList()
  }
}
</script>

<style scoped lang="less">
  @import "activities.less";
</style>
