<template>
  <div class="rich-text-container">
    <h3>文章上传</h3>
    <div class="add-box">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!--table表格-->
    <div class="rich-text-content">
      <el-table
        :data="resultList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="uuid"
          label="uuid">
        </el-table-column>
        <el-table-column
          prop="title"
          label="title">
        </el-table-column>

        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      :close-on-click-modal = 'false'
      :show-close="false"
      width="80%">
      <div class="pop-box">
          <div class="title-name">
            <h4>文章标题</h4>
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
          </div>
        <div class="content">
          <Editor id="oneEditor"
                  ref="oneEditor"
                  :value="editorValue"
                  @change="oneEditorChange"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleCheckData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";
  import _ from 'lodash'
  import Editor from '../../../common/editor/editor'
  export default {
    name: "richText",
    components: {Editor},
    data(){
      return{
        resultList:[],
        dialogVisible:false,
        titleName:'新增',
        title:'',
        editorValue:'',
        uuid:null,
        pageIndex:1,
        pageCount:null
      }
    },
    methods:{
      /*加载数据*/
      getList(){
        let param = {page:this.pageIndex}
        apiDataFilter.request({
          apiPath:'admin.richText.all',
          data:param,
          successCallback:(res)=>{
            let result = res.msg;
            this.resultList = result.list;
            this.pageCount = result.page.pageCount
          }
        })
      },
      /*提交修改*/
      submitValue(){
        let param = {title:this.title, content: this.editorValue, uuid:this.uuid ? this.uuid:null,}
        apiDataFilter.request({
          apiPath:'admin.richText.save',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('提交成功');
            this.getList();
            this.dialogVisible = false;
            this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {

              }
            });
          }
        })
      },
      /*编辑*/
      handleEdit(index,row){
        this.dialogVisible = true;
        this.titleName = '编辑';
        this.uuid = row.uuid;
        this.loadDetail();

      },
      /*记载详情*/
      loadDetail(){
        apiDataFilter.request({
          apiPath:'admin.richText.load',
          pathParams:[this.uuid],
          successCallback:(res)=>{
            let result = res.msg;
            this.title = result.title;
            this.editorValue = result.content;
          }
        })
      },
      /*新增*/
      handleAdd(){
        this.dialogVisible = true;
        this.titleName = '新增';
        this.title = '';
        this.uuid = null;
        this.editorValue = '';
      },
      /*文本编辑*/
      oneEditorChange(val){
        this.editorValue = val
      },
      handleCheckData(){
        if (!this.title || !this.editorValue) {
          this.$message.error('请完善数据信息');
          return
        }else {
           this.submitValue();
        }
      },
      /*得到当前页数*/
      currentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getList();
      },
    },
    created(){
      this.getList();
    }
  }
</script>

<style scoped lang='less'>
  @import "richText.less";
</style>
