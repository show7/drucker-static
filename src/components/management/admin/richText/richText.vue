<template>
  <div class="rich-text-container">
    <h3>富文本上传</h3>
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
        <el-table-column
          prop="contentString"
          label="内容">
          <template slot-scope="scope">
            <div class="question-box">
              <p class="content">
                {{scope.row.contentString}}
              </p>
            </div>
          </template>
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

    <el-dialog
      :title="titleName"
      :visible.sync="dialogVisible"
      :close-on-click-modal = 'false'
      :show-close="false"
      width="40%">
      <div class="pop-box">
          <div class="title-name">
            <h4>文章标题</h4>
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
          </div>
        <div class="content">
          <Editor id="oneEditor"
                  ref="oneEditor"
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
        uuid:null
      }
    },
    methods:{
      getList(){
        apiDataFilter.request({
          apiPath:'admin.richText.all',
          successCallback:(res)=>{
            this.resultList = res.msg;
            this.resultList.forEach((item,index)=>{
              item.contentString= this.removeHtmlTags(item.content)
            })
          }
        })
      },
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
          }
        })
      },
      /*编辑*/
      handleEdit(index,row){
        this.dialogVisible = true;
        this.titleName = '编辑';
        this.title = row.title;
        this.uuid = row.uuid;
        setTimeout(() => { this.$refs.oneEditor.editor.setValue(row.content) }, 200);
      },
      /*新增*/
      handleAdd(){
        this.dialogVisible = true;
        this.titleName = '新增';
        this.title = '';
        this.uuid = null;
        setTimeout(() => { this.$refs.oneEditor.editor.setValue('') }, 200);
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
      removeHtmlTags (str) {
        let newStr = _.trim(str)
        // 去除 html 标签
        newStr = newStr.replace(/(&lt;)(&#47;)?[^(&gt;)]*(&gt;)/g, '')
        newStr = newStr.replace(/<\/?[^>]*>/g, '')
        // 去除实体字符
        newStr = newStr.replace(/&[^;]+;/g, '')
        return newStr
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
