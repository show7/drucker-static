<template>
    <div class="community-list-container">
      <div class="community-list-top">
        <el-row>
          <el-col :span="12">
            <el-input v-model="searchName" placeholder="请输入内容社群名称"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="primary" @click="handleClearSearch">清除查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="community-list-content">
        <div class="button-box">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!--table表格-->
        <el-table
          :data="communityList"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="社群名称">
          </el-table-column>
          <el-table-column
            prop="groupCount"
            label="微信群数量">
          </el-table-column>
          <el-table-column
            prop="description"
            width="400"
            label="微信群介绍">
            <template slot-scope="scope">
              <div class="content-box">
                <p class="description">{{scope.row.description}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="publish"
            label="状态">
            <template slot-scope="scope">
              <p class="publish">{{scope.row.publish ? '已发布':'未发布'}}</p>
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            label="微信群">
            <template slot-scope="scope">
              <p class="go-group-list" @click="checkGroupDetail(scope.row.id)">查看微信群</p>
            </template>
          </el-table-column>
          <el-table-column width="200" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                v-if="!scope.row.publish"
                size="mini"
                @click="handlePublish(scope.$index, scope.row)">发布
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
          <!--新增编辑弹框-->
        <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          :close-on-click-modal="false"
          :show-close="false"
           width="40%">
          <div class="popout-box">
            <el-row>
              <el-col :span="4"><p>群组版图</p></el-col>
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
                <span class="size">备注：图片尺寸100*100</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><p>群组名称</p></el-col>
              <el-col :span="20">
                <el-input v-model="groupName" placeholder="请输入群组名称"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><p>群组描述</p></el-col>
              <el-col :span="20">
                <el-input type="textarea" v-model="groupDesc" maxlength="40" placeholder="请输入群组描述"></el-input>
                <span class="size">备注：描述40字及以内 （剩余{{40 - groupDesc.length}}字）</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><p>群组状态</p></el-col>
              <el-col :span="20">
                <el-radio v-model="radio" label='1'>上架</el-radio>
                <el-radio v-model="radio" label='0'>保存</el-radio>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="handleConfor">确 定</el-button>
           </span>
        </el-dialog>
      </div>
    </div>
</template>

<script>
    import apiDataFilter from "../../../../../../libraries/apiDataFilter";

    export default {
        name: "communityList",

        data() {
            return {
              searchName:'',//社群搜索
              title:'添加群组',
              dialogVisible:false,
              dialogVisiblePic:false,
              imageUrl: '',
              radio:'0',
              communityList:[],//列表
              page:1,//页码
              pageCount:null,//总页码
              groupName:'',//群组名称
              groupDesc:'',//群组描述
              id:null,//编辑的条目id
            }
        },
        methods: {
          /*得到list*/
          getCommunityList(){
            let  self = this;
            let param = { page:this.page};
            this.searchName ? Object.assign(param,{communityName:this.searchName}):'';
            apiDataFilter.request({
              apiPath:'weChat.community.communityList.list',
              data:param,
              successCallback(res){
                 self.communityList = res.msg.data || [];
                 self.pageCount = res.msg.page.pageCount;
              }
            })
          },
          /*搜索按钮*/
          handleSearch(){
            this.page=1;
            this.getCommunityList();
          },
          /*清除搜索*/
          handleClearSearch(){
            this.page=1;
            this.searchName = '';
            this.getCommunityList();
          },
          /*得到当前页数*/
          currentChange(pageIndex) {
            this.page = pageIndex;
            this.getCommunityList();
          },
          /*新增按钮*/
          handleAdd(){
            this.title = '添加群组';
            this.dialogVisible = true;
            this.imageUrl = '';
            this.groupName = '';
            this.groupDesc= '';
            this.radio = '0';
            this.id= null;
          },
          handleEdit(index,row){
            this.title = '编辑群组';
            this.dialogVisible = true;
            this.imageUrl = row.image;
            this.groupName = row.name;
            this.groupDesc= row.description;
            this.radio = row.publish ? '1' :'0';
            this.id= row.id;
          },
          /*确定新增和编辑*/
          handleConfor(){
            if (!this.groupName || !this.groupDesc || !this.imageUrl) {
              this.$message.error('请把信息填写完整');
            }else {
              this.sendAddData();
            }
          },
          /*新增和编辑接口*/
          sendAddData(){
            let self = this;
            let param ={name:this.groupName,description:this.groupDesc,publish:parseInt(this.radio),image:this.imageUrl};
             this.id ? Object.assign(param,{id:this.id}):'';
             apiDataFilter.request({
              apiPath:'weChat.community.communityList.revise',
              method:'post',
              data:param,
              successCallback(){
                 self.dialogVisible =false;
                 self.getCommunityList();
              }
            })
          },
          /*发布*/
          handlePublish(index,row){
            let self = this;
            apiDataFilter.request({
              apiPath:'weChat.community.communityList.publish',
              method:'post',
              data:{id:row.id},
              successCallback(){
                self.$message.success('发布成功')
                self.getCommunityList();
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
          /*弹射父组件id*/
          checkGroupDetail(id){
           this.$emit('groupDetail',id)
          }
        },
      created() {
        this.getCommunityList()
      }
    }
</script>

<style scoped lang='less'>
    @import "./communityList.less";
</style>
