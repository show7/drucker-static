<template>
  <div class="group-list-container">
    <div class="group-list-top">
      <el-row>
        <el-col :span="8">
          <el-select v-model="infoId" placeholder="请选择社群" :disabled="disabledFlag">
            <el-option
              v-for="item in infoList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="groupNameSearch" placeholder="请输入微信群名称" :disabled="disabledFlag"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" @click="handleClear">清空</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="group-list-content">
      <div class="add-box">
        <el-button type="primary" @click="handleAdd">添加微信群</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="groupList"
        style="width: 100%">
        <el-table-column
          prop="groupName"
          label="群名">
        </el-table-column>
        <el-table-column
          prop="ownerNickname"
          label="群主">
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="所属社群">
        </el-table-column>
        <el-table-column
          prop="groupMemberCount"
          label="群成员数">
        </el-table-column>
        <el-table-column
          prop="ownerCode"
          width="200"
          label="群主二维码">
          <template slot-scope="scope">
            <div class="pic-code">
              <img v-if="scope.row.ownerCode" :src="scope.row.ownerCode" alt="二维码">
            </div>
          </template>
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              v-if="scope.row.communityId !==null"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">解绑
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
      <!--新增弹框-->
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="40%">
        <div class="popout-box">
          <el-select
            v-model="searchValue"
            filterable
            multiple
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            @focus="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in searchList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="handleConfor">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑弹框-->
      <el-dialog
         title="添加群主"
        :visible.sync="dialogVisibleEd"
        :close-on-click-modal="false"
        :show-close="false"
        width="40%">
        <div class="popout-box">
          <el-row>
            <el-col :span="4"><p>上传群主二维码<span>*</span></p></el-col>
            <el-col :span="20">
              <el-upload
                class="avatar-uploader-box"
                action="/pc/upload/file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><p>群主<span>*</span></p></el-col>
            <el-col :span="20">
              <el-input v-model="ownerNickname" placeholder="请输入群主名称"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><p>选择板块<span>*</span></p></el-col>
            <el-col :span="20">
              <el-select v-model="popInfoId" placeholder="请选择社群">
                <el-option
                  v-for="item in popInfoList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleEd = false">取 消</el-button>
          <el-button type="primary" @click="handleEditPop">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../../../../libraries/apiDataFilter";
  import lodash from 'lodash'
    export default {
        name: "groupList",
        props:['communityId','groupNameS'],
        data() {
            return {
              title:'新增',
              dialogVisible:false,//弹框
              dialogVisibleEd:false,
              groupList:[],//列表
              pageCount:null,//总页数
              pageIndex:1,//第一页
              infoList:[],//社群list
              popInfoList:[],//社群list
              infoId:0,//社群id
              groupNameSearch:'',//搜索群名
              searchValue:null,//搜索结果
              searchList:[],//搜索list
              loading: false,
              imageUrl:'',//图片二维码
              ownerNickname:'',//群主名称
              radio:'0',//状态
              popInfoId:null,//弹出框的板块id
              Id:null, //编辑的id
              disabledFlag:false,
            }
        },
      watch: {
        communityId: function (val, old) {
            this.infoId = val;
            this.pageIndex = 1;
            this.getGroupList();
             this.getInfoList();
        },
        groupNameS:function (val, old) {
          this.groupNameSearch = val;
          this.pageIndex = 1;
          this.getGroupList();
          this.getInfoList();
        }
      },
        methods: {
          /*得到list*/
          getGroupList(){
            let  self = this;
            let param = { page:this.pageIndex};
            this.groupNameSearch ? Object.assign(param,{groupName:this.groupNameSearch}):'';
            this.infoId != 0 ? Object.assign(param,{communityId:this.infoId}):'';
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.list',
              data:param,
              successCallback(res){
                self.groupList = res.msg.data || [];
                self.pageCount = res.msg.page.pageCount;
              }
            })
          },
          /*得到InfoList*/
          getInfoList(){
            let  self = this;
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.infoList',
              successCallback(res){
                let result = res.msg || [];
                result.unshift({id:0,name:'全部'});
                self.infoList = result;
                self.popInfoList = lodash.cloneDeep(self.infoList);
                self.popInfoList.splice(0,1)
              }
            })
          },
          /*搜索*/
          handleSearch(){
            this.$emit('groupDetail',this.infoId,this.groupNameSearch)
          },
          /*清除搜索*/
          handleClear(){
            this.pageIndex = 1;
            this.infoId = 0;
            this.groupNameSearch = '';
            this.$emit('groupDetail',0,'')
          },
         /*翻页*/
          currentChange(pageIndex){
            this.pageIndex = pageIndex;
            this.getGroupList()
          },
          /*新增按钮*/
          handleAdd(){
            this.dialogVisible =true;
            this.title = '添加微信群';
            this.searchValue = [];
          },
          remoteMethod(res){
            let self= this;
            let param =  res ? {groupName:res} : {};
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.validgroup',
              data:param,
              successCallback(res){
                self.searchList =res.msg;
              }
            })
          },
          /*确定添加*/
          handleConfor(){
            let param = null;
            let self =this;
              if(this.searchValue && this.searchValue.length > 0){
                param = {groupList:this.searchValue}
              }else {
                this.$message.error('请先选择');
                return
              }
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.addgroups',
              method:'post',
              data:param,
              successCallback(){
                self.dialogVisible =false;
                self.$message.success('添加成功');
                self.pageIndex = 1;
                self.infoId = 0;
                self.groupNameSearch = '';
                self.$emit('groupDetail',0,'');
                self.getGroupList();
              }
            })
          },
          /*图片上传成功*/
          handleAvatarSuccess(res, file) {
            this.imageUrl = res.msg
            /*   this.imageUrl = URL.createObjectURL(file.raw);*/
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG / png 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
          },
          /*编辑*/
          handleEdit(index,row){
            this.dialogVisibleEd = true;
            this.imageUrl = row.ownerCode;
            this.popInfoId = row.communityId;
            this.ownerNickname = row.ownerNickname;
            this.Id = row.id;
          },
          handleEditPop(){
            if (!this.imageUrl || !this.popInfoId || !this.ownerNickname) {
              this.$message.error('请完善信息');
            }else {
               this.completeSend()
            }
          },
          /*提交完善信息*/
          completeSend(){
            let self= this;
            let param = {id:this.Id,ownerNickname:this.ownerNickname,ownerCode:this.imageUrl,communityId:this.popInfoId};
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.revise',
              method:'post',
              data:param,
              successCallback(){
                self.dialogVisibleEd =false;
                self.$message.success('编辑成功');
                self.getGroupList();
              }
            })
          },
          /*删除*/
          handleDelete(index,row){
            let self = this;
            apiDataFilter.request({
              apiPath:'weChat.community.groupList.release',
              method:'post',
              data:{id:row.id},
              successCallback(){
                self.$message.success('解绑成功');
                self.getGroupList();
              }
            })
          }
        },
      created() {
        this.getGroupList();
        this.getInfoList();
      }
    }
</script>

<style scoped lang='less'>
    @import "groupList.less";
</style>
