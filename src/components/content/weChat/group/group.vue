<template>
  <div class="group-container">
    <h3>群内容管理</h3>
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
        <el-col :span="8">
          <h4>创建时间</h4>
          <el-date-picker
            v-model="createTime"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="8">
          <h4>发布时间</h4>
          <el-date-picker
            v-model="publishTime"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="8" class="buttons">
          <el-button type="primary" @click="groupSearch">搜索</el-button>
          <el-button type="primary" @click="clearSearch">清除查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="content-box">
      <el-row>
        <el-col :span="12">
          <div class="grid-content-left">
            <el-button type="primary" size="medium" @click="dialogVisible = true">发布</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-right">
            <el-button type="primary" size="medium" @click="dialogVisible = true">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="groupList"
        style="width: 100%">
        <el-table-column
          label="选择">
          <template slot-scope="scope">
              <el-checkbox :disabled="scope.row.publishStatus == 1 ? true : false " @change="(val)=>{checkboxChange(scope.row.esChatId,val)}"></el-checkbox>
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
              <p class="publishStatus">{{scope.row.publishStatus == 1 ? '已发布':scope.row.publishStatus == 0 ? '未修改':'已修改'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
                >发布</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="pageCount">
        </el-pagination>
      </div>
    </div>
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
            <el-input class="riseId-input" placeholder="请输入riseId" v-model="input10" clearable></el-input>
            <el-button type="primary" size="small" @click="">确 定</el-button>
          </el-col>
          <el-col :span="12">
            <h4><span>*</span>头像</h4>
            <img src="https://static.iqycamp.com/71527579350_-ze3vlyrx.pic_hd.jpg" alt="头像">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <h4><span>*</span>发布昵称</h4>
            <el-input placeholder="请输入昵称" v-model="input10" clearable></el-input>
          </el-col>
          <el-col :span="12">
            <h4>所属群组</h4>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>所属微信群</h4>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4>发布内容</h4>
            <Editor id="oneEditor"
                    ref="oneEditor"
                    @change="oneEditorChange"></Editor>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'
  import Editor from '../../../common/editor/editor'
  import moment from 'moment'
  export default {
    name: "group",
    components: {Editor},
    data() {
      return {
        groupList:[],
        dialogVisible:false,
        title:'新增',
        imageUrl:'',
        queryAccount: null,//搜索的昵称
        statusList:[{id:0,name:'未修改'},{id:1,name:'已发布'},{id:2,name:'已修改'}],
        statusId:null,//状态id
        communityList:[],//群组
        communityId:null,//群组选择的ID
        wechatGroupList:[],//微信群list,
        wechatGroupId:null,//微信群id
        createTime:[],//创建时间list
        createStartTime:null,//创建开始时间
        createEndTime:null,//创建结束时间
        publishTime:[],//发布时间list
        publishStartTime:null,//发布开始时间
        publishEndTime:null,//发布结束时间
        pageCount:'',//总共的页数
        checkbox:[],//checkbox发布选择
      }
    },
    methods:{
      getGroupList(){
        let self =this;
        ApiDataFilter.request({
          apiPath:'weChat.groupManage.groupList',
          successCallback(res){
            self.groupList = res.msg.content.content;
            self.communityList = res.msg.communityList;
            if(self.groupList.length > 0){
              self.groupList.forEach((item,index)=>{
                self.groupList[index].postTime = moment(item.postTime).format('YYYY-MM-DD HH:mm:ss')
              })
            }
            self.pageCount = res.msg.content.page.pageCount;
          }
        })
      },
      /*搜索接口*/
      groupSearch(){
        let self = this;
        let param = { queryAccount : this.queryAccount ? this.queryAccount:null,statusId:this.statusId,communityId:this.communityId,wechatGroupId:this.wechatGroupId,
          createStartTime:this.createTime.length > 0 ? this.createTime[0]:null,createEndTime:this.createTime.length > 0 ? this.createTime[1]:null,
          publishStartTime:this.publishTime.length > 0 ? this.publishTime[0]:null,publishEndTime:this.publishTime.length > 0 ? this.publishTime[1]:null,
        }
        ApiDataFilter.request({
          apiPath:'weChat.groupManage.groupSearch',
          method:'post',
          data:param,
          successCallback(res){

          }
        })
      },
      /*群组选择change事件*/
      communityIdChange(val){
        this.communityList.forEach((item,index)=>{
            if (item.id == val){
              this.wechatGroupList = item.wechatGroupList
            }

        })
      },
      /*微信清除查询全部*/
      Clear(index){
        index == 0 ? this.statusId = null : index == 1 ?  this.communityId= null : this.wechatGroupId = null;
      },
      /*清除搜索*/
      clearSearch(){
        this.queryAccount = null;
        this.statusId = null;
        this.communityId = null;
        this.wechatGroupId = null;
        this.createTime = [];
        this.publishTime = [];
      },
      /*得到当前页数*/
      currentChange(pageIndex){

      },
      /*选择框发生改变*/
      checkboxChange(id,val){
        if (val){
          this.checkbox.push(id)
        } else {
          this.checkbox.forEach((item,index)=>{
            if (item == id){
              this.checkbox.splice(index,1)
            }
          })
        }
        console.log(this.checkbox)
      },
      handleEdit(){

      },
      handleAvatarSuccess(){

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      oneEditorChange(val){

      }
    },
    created(){
      this.getGroupList()
    }
  }
</script>

<style scoped lang="less">
  @import "./group.less";
</style>
