
<template>
   <div class="banner-container">
     <h3>首页 Banner 编辑</h3>
     <div class="banner-top">
       <el-button type="primary" @click="addBanner">新增BANNER</el-button>
     </div>
     <div class="banner-content">
       <el-table
         :data="bannerList"
         style="width: 100%">
         <el-table-column
           prop="sequence"
           width="150"
           label="所在顺序">
         </el-table-column>
         <el-table-column
           prop="imageUrl"
           label="banner">
           <template slot-scope="scope" >
               <img class="banner-pic"  :src="scope.row.imageUrl" alt="banner">
           </template>
         </el-table-column>
         <el-table-column
           prop="imageUrl"
           label="图片链接">
         </el-table-column>
         <el-table-column
           prop="linkUrl"
           label="内容点击链接">
         </el-table-column>
         <el-table-column width="200" fixed="right" label="操作">
           <template slot-scope="scope">
             <el-button
               size="mini"
               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
             <el-button
               size="mini"
               @click="handleBannerDelete(scope.$index, scope.row)">删除</el-button>
           </template>
         </el-table-column>
       </el-table>
     </div>
     <el-dialog
       :title="title"
       :show-close="false"
       :visible.sync="dialogVisible"
       width="30%">
       <div class="popout-box">
          <h4>图片链接</h4>
          <el-input placeholder="请输入图片链接" v-model="imageUrl" clearable></el-input>
         <h4>内容点击链接</h4>
         <el-input placeholder="请输入内容点击链接" v-model="linkUrl" clearable></el-input>
         <h4>所在顺序</h4>
         <el-input placeholder="请输入所在顺序" v-model="sequence" clearable></el-input>
       </div>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="checkData">确 定</el-button>
       </span>
     </el-dialog>
   </div>
</template>

<script>

import ApiDataFilter from '@/libraries/apiDataFilter'
export default {
  name: 'banner',
  data () {
    return {
      bannerList: [],
      dialogVisible: false,
      title: '新增一个首页 Banner', //弹框标题
      imageUrl: '', //图片链接
      linkUrl: '', //内容点击链接
      sequence: '', //所在顺序
      way: 0 //添加banner方式 0新增，1更新
    }
  },
  methods: {
    /*得到banner列表*/
    getBannerList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.home.bannersList',
        successCallback (res) {
          self.bannerList = res.msg
        }
      })
    },
    /*添加banner弹框*/
    addBanner () {
      this.dialogVisible = true;
      this.imageUrl = '';
      this.linkUrl = '';
      this.sequence = '';
      this.way = 0
    },
    /*检测是否填写数据*/
    checkData () {
      if (!this.imageUrl) {
        this.$message.error('请填写图片链接');
        return
      }
      if (!this.linkUrl) {
        this.$message.error('请输入内容点击链接');
        return
      }
      this.bannerInsert(this.way);
    },
    /*插入和修改一条banner*/
    bannerInsert (index) {
      let self = this;
      let param = {imageUrl: this.imageUrl, linkUrl: this.linkUrl, sequence: this.sequence};
      index == 0 ? '' : Object.assign(param, {id: this.id});
      let apiPath = index == 0 ? 'manage.home.bannerInsert' : 'manage.home.bannerUpdate';
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: param,
        successCallback (res) {
          self.dialogVisible = false;
          self.$message.success('上传成功');
          self.getBannerList();
        }
      })
    },
    /*编辑*/
    handleEdit (index, row) {
      this.imageUrl = row.imageUrl;
      this.linkUrl = row.linkUrl;
      this.sequence = row.sequence;
      this.id = row.id;
      this.way = 1;
      this.dialogVisible = true;
    },
    /*删除*/
    handleBannerDelete (index, row) {
      let id = row.id;
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.home.bannerDelete',
        method: 'post',
        data: {id: id},
        successCallback (res) {
          self.$message.success('删除成功');
          self.getBannerList();
        }
      })
    }
  },
  created () {
    this.getBannerList()
  }
}
</script>

<style scoped lang="less">
@import "banner.less";
</style>
