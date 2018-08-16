<template>
    <div class="community-list-container">
      <div class="community-list-top">
        <el-row>
          <el-col :span="12">
            <el-input v-model="searchName" placeholder="请输入内容社群名称"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">清除查询</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="community-list-content">
        <div class="button-box">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <!--table表格-->
        <el-table
          :data="groupList"
          style="width: 100%">
          <el-table-column
            prop="nickname"
            width="150"
            label="社群名称">
          </el-table-column>
          <el-table-column
            prop="labelCategory"
            label="微信群数量">
            <template slot-scope="scope">
              <p>{{findCategory(scope.row.labelCategory)}}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="communityName"
            label="微信群介绍">
          </el-table-column>
          <el-table-column
            prop="groupName"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="labelName"
            width="200"
            label="微信群">
          </el-table-column>
          <el-table-column width="300" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                @click="handleOnlook(scope.$index, scope.row)">删除
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
                <el-input type="textarea" v-model="groupName" placeholder="请输入群组描述"></el-input>
                <span class="size">备注：描述40字及以内</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"><p>群组状态</p></el-col>
              <el-col :span="20">
                <el-radio v-model="radio" label="1">上架</el-radio>
                <el-radio v-model="radio" label="2">保存</el-radio>
              </el-col>
            </el-row>
          </div>
          <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
              radio:'2'
            }
        },
        methods: {
          getCommunityList(){
            let  self = this;
            let param = {};
            apiDataFilter.request({
              apiPath:'community.communityList.list.weChat',
              data:param,
              successCallback(res){

              }
            })
          },
          /*新增*/
          handleAdd(){
            this.title = '添加群组';
            this.dialogVisible = true;
          },
          handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
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
