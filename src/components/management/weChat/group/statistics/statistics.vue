<template>
  <div class="statistics-container">
    <h3>社群数据</h3>
    <!--头部搜索展示-->
    <div class="statistics-top">
      <el-row>
        <el-col :span="8">
          <h4>请选择近期统计</h4>
          <el-select v-model="latesValue" placeholder="请选择近期统计" @change="handleSelectLates">
            <el-option v-for="item in latesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8" v-if="isCommunityOwner">
          <h4>社群</h4>
          <el-select v-model="communityId" placeholder="请选择社群" @change="handleSelectCommunity">
            <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <h4>微信群</h4>
          <el-select v-model="groupId" placeholder="请选择微信群" @change="handleSelectGroup">
            <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">日发言数</p>
            <p class="score">{{wordsNu.dailyChatCount}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">日活跃人数</p>
            <p class="score">{{wordsNu.dailyChatMember}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">话题讨论数</p>
            <p class="score">{{wordsNu.dailyTopicCount}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">讨论人数</p>
            <p class="score">{{wordsNu.dailyTopicMember}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-content">
      <div class="name-add-box">
        <el-row>
          <el-col :span="12"><p class="name">用户礼金值</p></el-col>
          <el-col :span="12" class="select">
            <el-select v-model="orderValue" placeholder="请选择排序" @change="handleSelectOrder">
            <el-option v-for="item in orderList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          </el-col>
        </el-row>
        <!--table表格-->
        <el-table
          :data="coinList"
          style="width: 100%">
          <el-table-column
            prop="sequence"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="用户昵称">
          </el-table-column>
          <el-table-column
            prop="coin"
            width="400"
            label="礼金值">
          </el-table-column>
          <el-table-column width="200" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            @current-change="currentChange"
            :page-count="pageCount">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false">
      <div class="popOut-box">
        <el-row v-for="(item,index) in detailList" :key="item.id">
          <el-col :span="8"><div class="data-score">{{item.dateString}}</div></el-col>
          <el-col :span="8"><div class="data-score">{{item.tradeName}}</div></el-col>
          <el-col :span="8"><div class="data-score">{{item.coin > 0 ? '+':''}} {{item.coin}} 礼金</div></el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../../libraries/apiDataFilter";
  import lodash from 'lodash'

  export default {
    name: "statistics",
    data() {
      return {
        dialogVisible:false,
        latesList:[{id:1,name:'今日'},{id:2,name:'最近七日'},{id:3,name:'最近30日'}],
        latesValue: 1,//近期统计选取值
        communityList:[],//社群list
        communityId:0,//社群id
        isCommunityOwner:false,//是否有社群选项标识
        groupList:[{id:0,name:'全部'}],//群list
        groupId:0,
        wordsNu:{
          dailyChatCount: 0,
          dailyChatMember: 0,
          dailyTopicCount: 0,
          dailyTopicMember: 0
        },
        orderValue:1,//排序值
        orderList:[{id:1,name:'正序'},{id:-1,name:'倒序'}],
        pageIndex:1,
        pageCount:null,//总页数
        page:1,//当前页
        coinList:[],
        detailList:[],//详情list
      }
    },
    methods: {
      /*获取社群、微信群、*/
      getGroup(){
        let self = this;
        apiDataFilter.request({
          apiPath:'weChat.common.group',
          successCallback(res){
            let result = res.msg.communityList || [];
            result.unshift({id:0,name:'全部',groupList:[]});
            self.communityList = result;
            self.isCommunityOwner = res.msg.isCommunityOwner;
            if (!self.isCommunityOwner ) {
              let groupList = lodash.cloneDeep(res.msg.groupList);
              groupList.unshift({id:0,name:'全部'});
              self.groupList = groupList;
            }
            self.getCoinList();
            self.getLatesList();
          }
        })
      },

      /*获取发言信息*/
      getLatesList(){
        let self = this;
        let param = {dateRange:this.latesValue,groupId:this.groupId};
        if (this.isCommunityOwner) {
          Object.assign(param,{communityId:this.communityId})
        }
        apiDataFilter.request({
          apiPath:'weChat.statistics.words',
          data:param,
          successCallback(res){
           self.wordsNu=res.msg;
          }
        })
      },

      /*获取list*/
      getCoinList(){
        let self = this;
        let param = {groupId:this.groupId,order:this.orderValue,page:this.pageIndex};
        if (this.isCommunityOwner){
           Object.assign(param,{communityId:this.communityId})
        }
        apiDataFilter.request({
          apiPath:'weChat.statistics.coinList',
          data:param,
          successCallback(res){
            let page = res.msg.page;
            let content = res.msg.content;
            self.pageCount = page.pageCount;
            self.coinList = content
          }
        })
      },
      /*获取详情*/
      handleDetail(index,row){
        let self =this;
        apiDataFilter.request({
          apiPath:'weChat.statistics.records',
          data:{profileId:row.profileId},
          successCallback(res){
            self.dialogVisible = true;
            self.detailList = res.msg;
          }
        })
      },
      /*社群选择*/
      handleSelectCommunity(val){
         this.communityList.forEach((item,index)=>{
           if (val === item.id){
             let groupList = lodash.cloneDeep(item.groupList);
             groupList.unshift({id:0,name:'全部'});
             this.groupList = groupList;
             this.groupId = 0;
             this.page = 1;
             this.getCoinList();
             this.getLatesList();
           }
         })
      },
      /*群选择*/
      handleSelectGroup(){
        this.page =1
        this.getCoinList();
        this.getLatesList();
      },
      /*日期范围选择*/
      handleSelectLates(){
        this.getLatesList();
      },
      /*排序选择*/
      handleSelectOrder(){
        this.page =1
        this.getCoinList();
      },
      /*得到当前页数*/
      currentChange(pageIndex) {
        this.page = pageIndex;
        this.getCoinList();
      },
    },
    created() {
     this.getGroup();
    }
  }
</script>

<style scoped lang='less'>
  @import "statistics.less";
</style>
