<template>
   <div class="topic-container">
     <h3>话题管理</h3>
     <div class="topic-top">
       <el-row>
         <el-col :span="6">
           <h4>话题名称</h4>
           <el-input v-model="topicNameSearch" placeholder="请输入话题名称"></el-input>
         </el-col>
         <el-col :span="6">
           <h4>发布状态</h4>
           <el-select v-model="statusId" placeholder="请选择发布状态">
             <el-option v-for="item in statusList" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>群组</h4>
           <el-select v-model="communityId" placeholder="请选择群组" @change="handleSelectCommunity">
             <el-option v-for="item in communityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>微信群</h4>
           <el-select v-model="groupId" placeholder="请选择微信群">
             <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>
           </el-select>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="12">
           <h4>时间范围</h4>
           <el-date-picker
             v-model="dataTimeValue"
             type="daterange"
             :picker-options="pickerOptions"
             :default-time="defaultTime"
             value-format="timestamp"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期">
           </el-date-picker>
         </el-col>
         <el-col :span="12">
           <el-button type="primary" @click="handleSearch">搜索</el-button>
           <el-button type="primary" @click="handleClear">清空</el-button>
         </el-col>
       </el-row>
     </div>
     <div class="topic-content">
       <el-button type="primary" @click="handleAddNew">新增</el-button>
       <!--table表格-->
       <el-table
         :data="topicList"
         style="width: 100%">
         <el-table-column
           prop="name"
           label="话题名称">
         </el-table-column>
         <el-table-column
           prop="communityName"
           label="所属群组">
         </el-table-column>
         <el-table-column
           prop="description"
           label="话题详情">
           <template slot-scope="scope">
             <div class="description-box">
               <p>{{scope.row.description}}</p>
             </div>
           </template>
         </el-table-column>
         <el-table-column
           prop="addTimeString"
           label="话题日期">
         </el-table-column>
         <el-table-column
           prop="publish"
           label="话题状态">
           <template slot-scope="scope">
               <p>{{scope.row.publish ? '已发布':'未发布'}}</p>
           </template>
         </el-table-column>
         <el-table-column width="300" fixed="right" label="操作">
           <template slot-scope="scope">
             <el-button
               size="mini"
               @click="handleEdit(scope.$index, scope.row,1)">编辑
             </el-button>
             <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row,2)">详情
           </el-button>
             <el-button
               v-if="!scope.row.publish"
               size="mini"
               @click="handlePublish(scope.row)">发布
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

     <!--新增和编辑弹框-->
     <el-dialog
       :title="title"
       :visible.sync="dialogVisible"
        width="40%"
       :close-on-click-modal="false">
       <div class="popOut-box">
         <el-row v-if="!disabledFlag">
           <el-col :span="4"><p>话题名称 <span>*</span></p></el-col>
           <el-col :span="20"><el-input v-model="topicName" placeholder="请输入话题名称" :disabled="disabledFlag"></el-input></el-col>
         </el-row>
         <el-row>
           <el-col :span="4"><p>所属群组 <span>*</span></p></el-col>
           <el-col :span="20">
             <el-select v-model="popCommunityId" placeholder="请选择群组" :disabled="disabledFlag" @change="handleSelectPopCommunity">
             <el-option
               v-for="item in popCommunityList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
              </el-option>
            </el-select>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="4"><p>所属微信群</p></el-col>
           <el-col :span="20">
             <el-select v-model="popGroupId" :disabled="disabledFlag" placeholder="请选择微信群">
             <el-option
               v-for="item in popGroupList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
           </el-col>
         </el-row>
         <el-row>
           <el-col :span="4"><p>{{disabledFlag ? '今日话题':'话题详情'}} <span>*</span></p></el-col>
           <el-col :span="20">
             <el-input type="textarea" :rows="6" placeholder="请输入内容" :disabled="disabledFlag" v-model=" disabledFlag ? topicDetail:description"></el-input>
           </el-col>
         </el-row>
         <el-row v-if="!disabledFlag">
           <el-col :span="4"><p>操作 <span>*</span></p></el-col>
           <el-col :span="20">
             <el-radio :disabled="disabledFlag" v-model="publishRadio" label="2">上架</el-radio>
             <el-radio :disabled="disabledFlag" v-model="publishRadio" label="1">保存</el-radio>
           </el-col>
         </el-row>
       </div>
       <span slot="footer" class="dialog-footer">
         <el-button v-if="!disabledFlag" @click="dialogVisible = false">取 消</el-button>
         <el-button v-if="!disabledFlag" type="primary" @click="handleCheckData">确 定</el-button>
         <el-button v-if="disabledFlag" type="primary" @click="dialogVisible = false">确 定</el-button>
       </span>
     </el-dialog>

   </div>
</template>

<script>
  import apiDataFilter from "../../../../../libraries/apiDataFilter";
  import lodash from 'lodash'
  import moment from 'moment'

    export default {
        name: "topic",
        data() {
            return {
              title:'新增',
              dialogVisible:false,
              topicName:'',//话题名称  编辑和新增
              topicNameSearch:'',//搜索框的值  话题名称
              communityList:[],//群组list
              communityId:0,//群组id
              groupList:[{id:0,name:'全部'}],//群list
              groupId:0,
              pageIndex:1,
              statusId:0,
              statusList: [{ id: 0, name: '全部' }, { id: 1, name: '未发布' }, { id: 2, name: '已发布' } ],
              dataTimeValue: null, //发布时间list
              defaultTime: [ '00:00:00', '23:59:59' ], //设置时间段 日期截止时间
              pickerOptions: {
                disabledDate: (time) => {
                  return time.getTime() > Date.now() - 8.64e6
                }
              },
              pageCount:null,//总页数
              topicList:[],//话题列表
              popCommunityList:[],//群组list
              popCommunityId:null,//群组id
              popGroupList:[],//群list
              popGroupId:null,
              topicDetail:'',//话题详情
              publishRadio:'1',
              disabledFlag:false,
              selectId:null, //需要编辑的id
              description:'',//话题详情
            }
        },
        methods: {
          /*获取群组、微信群、*/
          getGroup(){
            let self = this;
            apiDataFilter.request({
              apiPath:'weChat.common.group',
              successCallback(res){
                let result = lodash.cloneDeep(res.msg.communityList) || [];
                result.unshift({id:0,name:'全部',groupList:[]});
                self.communityList = result;
                self.popCommunityList = res.msg.communityList;
                self.isCommunityOwner = res.msg.isCommunityOwner;
                if (!self.isCommunityOwner ) {
                  let groupList = lodash.cloneDeep(res.msg.groupList);
                  groupList.unshift({id:0,name:'全部'});
                  self.groupList = groupList;
                  self.popGroupList = lodash.cloneDeep(res.msg.groupList)
                }
              }
            })
          },
          /*获取list*/
          getTopicList(){
            let self =this;
            let param = {page:this.pageIndex, topicName:this.topicNameSearch,
              publish:this.statusId,communityId:this.communityId,wechatGroupId:this.groupId,
              labelStartTime: this.dataTimeValue != null ? this.dataTimeValue[0]:null,
              labelEndTime:this.dataTimeValue != null ? this.dataTimeValue[1]:null,
            };
            apiDataFilter.request({
              apiPath:'weChat.topic.topicList',
              data:param,
              successCallback(res){
                let contentList = res.msg.content || [];
                contentList.forEach((item,index)=>{
                  contentList[index]['addTimeString']= moment(item.addTime).format('YYYY-MM-DD');
                });
                self.topicList = contentList;
                let page = res.msg.page;
                self.pageCount = page.pageCount;
              }
            })
          },
          /*发布*/
          handlePublish(row){
            let self = this;
            let param = {topicId:row.id};
            apiDataFilter.request({
              apiPath:'weChat.topic.publish',
              data:param,
              successCallback(){
                self.$message.success('发布成功');
                self.getTopicList();
              }
            })
          },
          /*新增编辑接口*/
          handleSend(){
            let self = this;
            let param = {communityId:this.popCommunityId,groupId:this.popGroupId,name:this.topicName,
              description:this.description,publish:this.publishRadio == 1 ? false:true
            };
            this.selectId ? Object.assign(param,{id:this.selectId}):'';
            apiDataFilter.request({
              apiPath:'weChat.topic.modify',
              method:'post',
              data:param,
              successCallback(){
                self.dialogVisible = false;
                self.$message.success('提交成功');
                self.getTopicList();
              }
            })
          },
          /*校验必填项提交*/
          handleCheckData(){
            if (!this.topicName || !this.popCommunityId || !this.description){
              this.$message.error('请填写必填项目');
            } else {
              this.handleSend();
            }
          },
          /*群组选择*/
          handleSelectCommunity(val){
            this.communityList.forEach((item,index)=>{
              if (val === item.id){
                let groupList = lodash.cloneDeep(item.groupList);
                groupList.unshift({id:0,name:'全部'});
                this.groupList = groupList;
                this.groupId = 0;
                this.pageIndex = 1;
              }
            })
          },
          /*选择弹框群组*/
          handleSelectPopCommunity(val){
            this.popCommunityList.forEach((item,index)=>{
              if (val === item.id){
                let groupList = lodash.cloneDeep(item.groupList);
                this.popGroupList = groupList;
                this.popGroupId = null;
              }
            })
          },
          /*得到当前页数*/
          currentChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.getTopicList();
          },
          /*新增*/
          handleAddNew(){
            this.dialogVisible = true;
            this.topicName = '';
            this.title='新增';
            this.popCommunityId = null;
            this.popGroupId = null;
            this.popGroupList = [];
            this.topicDetail = '';
            this.publishRadio = '1';
            this.disabledFlag = false;
            this.selectId = null;
            this.description = null
          },
          // 编辑
          handleEdit(index,row,flag){
            this.dialogVisible = true;
            this.topicName = row.name;
            this.title=flag === 1 ? '编辑' : '详情';
            this.popCommunityId = row.communityId;
            this.popCommunityList.forEach((item,index)=> {
              if (row.communityId === item.id) {
                let groupList = lodash.cloneDeep(item.groupList);
                this.popGroupList = groupList;
              }
            });
            this.popGroupId = row.groupId;
            this.topicDetail = row.content;
            this.publishRadio = row.publish ? '2':'1';
            this.disabledFlag = flag === 1 ? false : true;
            this.selectId = row.id;
            this.description = row.description
          },
          /*搜索*/
          handleSearch(){
            this.pageIndex = 1;
            this.getTopicList();
          },
          /*清空*/
          handleClear(){
            this.topicNameSearch = '';
            this.statusId = 0;
            this.communityId = 0;
            this.groupId = 0;
            this.pageIndex = 1;
            this.dataTimeValue = null;
            this.handleSelectCommunity(0);
            this.getTopicList();
          }
        },
        created() {
          this.getGroup();
          this.getTopicList();
        }
    }
</script>

<style scoped lang='less'>
    @import "topic.less";
</style>
