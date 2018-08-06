<template>
  <div class="articles-container">
    <h3>线下活动编辑</h3>
    <div class="articles-top">
      <el-button type="primary" @click="addItem">新增</el-button>
    </div>
    <div class="activities-content">
      <el-table
        :data="showArticlesList"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签">
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
          @current-change="currentChange"
          :total="articlesList.length">
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
              <h4>文章标题</h4>
              <el-input
                placeholder="请输入文章标题"
                v-model="itemData.title"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">
              <h4>文章描述</h4>
              <el-input
                type="textarea"
                placeholder="请输入文章描述"
                v-model="itemData.description"
                clearable>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <h4>标签集合,英文逗号,分隔</h4>
              <el-input
                placeholder="请输入标签"
                v-model="itemData.tag"
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
              <h4>文章链接</h4>
              <el-input
                placeholder="请输入文章链接"
                v-model="itemData.linkUrl"
                clearable>
              </el-input>
            </el-col>
            <el-col :span="12">

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
export default {
  name: 'articles',
  data () {
    return {
      articlesList: [], //总list
      showArticlesList: [], //展示的list
      itemData: {
        title: '', //名称
        description: '', //文章描述
        tag: '', //标签
        thumbnail: '', //缩略图链接
        linkUrl: ''//活动链接
      },
      dialogVisible: false,
      title: '新增',
      id: '',
      way: 0
    }
  },
  methods: {
    getArticlesList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.articles.articlesList',
        successCallback (res) {
          self.articlesList = res.msg;
          self.currentChange(1)
        }
      })
    },
    /*处理时间显示方式*/
    currentChange (pageIndex) {
      let start = (pageIndex - 1) * 10;
      let end = pageIndex * 10;
      this.showArticlesList = this.articlesList.slice(start, end)
    },
    /*发送*/
    send () {
      this.handleInsertUpdate(this.way)
    },
    /*新增和更新数据*/
    handleInsertUpdate (index) {
      let self = this;
      let param = {title: this.itemData.title, description: this.itemData.description, tag: this.itemData.tag, thumbnail: this.itemData.thumbnail, linkUrl: this.itemData.linkUrl };
      index == 0 ? '' : Object.assign(param, {id: this.id})
      let apiPath = index == 0 ? 'manage.articles.articlesInsert' : 'manage.articles.articlesUpdate';
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: param,
        successCallback (res) {
          self.$message.success('提交成功');
          self.dialogVisible = false;
          self.getArticlesList();
        }
      })
    },
    /*删除*/
    activitiesDelete (index, row) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.articles.articlesDelete',
        method: 'post',
        data: {id: row.id},
        successCallback (res) {
          self.$message.success('删除成功');
          self.getArticlesList();
        }
      })
    },
    /*编辑*/
    handleEdit (index, row) {
      this.itemData.title = row.title;
      this.itemData.description = row.description;
      this.itemData.tag = row.tag;
      this.itemData.thumbnail = row.thumbnail;
      this.itemData.linkUrl = row.linkUrl;
      this.way = 1;
      this.id = row.id;
      this.dialogVisible = true;
      this.title = '编辑';
    },
    /*新增弹框*/
    addItem () {
      this.itemData.title = '';
      this.itemData.description = '';
      this.itemData.tag = '';
      this.itemData.thumbnail = '';
      this.itemData.linkUrl = '';
      this.dialogVisible = true;
      this.way = 0;
      this.title = '新增';
    }
  },
  created () {
    this.getArticlesList()
  }
}
</script>

<style scoped lang="less">
  @import "articles.less";
</style>
