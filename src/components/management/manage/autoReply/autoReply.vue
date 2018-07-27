<template>
  <div class="auto-reply-container">
    <h3>服务号自动回复</h3>
    <div class="auto-reply-top">
      <el-button type="primary" @click="addItem">新增</el-button>
      <el-button type="primary" @click="handleCache">刷新缓存</el-button>
    </div>
    <div class="auto-reply-content">
      <el-table
        :data="replyList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="150"
          label="序号">
          序号
        </el-table-column>
        <el-table-column
          prop="message"
          label="回复内容">
          <template slot-scope="scope">
            <p class="message">{{scope.row.message}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="keyword"
          label="关键词">
        </el-table-column>
        <el-table-column
          prop="isDefault"
          label="是否默认">
          <template slot-scope="scope">
            <p>{{scope.row.isDefault ? '是':'否'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              @click="replyDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false"
        width="40%">
        <div class="popout-box">
          <h4>回复关键词，多个关键词用 ‘|’ 分隔</h4>
          <el-input placeholder="请输入关键词" v-model="itemData.keyword" clearable></el-input>
          <h4>详细内容</h4>
          <el-input type="textarea" :row="4" placeholder="请输入关键词" v-model="itemData.message" clearable></el-input>
          <el-checkbox v-model="itemData.exact">是否精准匹配</el-checkbox>
          <el-checkbox v-model="itemData.isDefault">是否默认回复</el-checkbox>
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
    name: "autoReply",
    data(){
      return{
        replyList:[], //总list
        itemData:{
          keyword:'', //回复关键词
          message:'',//详细内容
          exact:false,//是否精准匹配
          isDefault:false,//是否默认回复
        },
        dialogVisible: false,
        title:'新增',
        id:'',
        way:0
      }
    },
    methods:{
      getReplyList(){
        let self = this;
        ApiDataFilter.request({
          apiPath:'manage.reply.loadList',
          successCallback(res){
            self.replyList = res.msg;
          }
        })
      },
      /*发送*/
      send(){
        if(!this.itemData.exact || !this.itemData.isDefault || !this.itemData.keyword || !this.itemData.message){
          this.$message.error('请填写完整')
          return
        }
        this.handleInsertUpdate(this.way)
      },
      /*新增和更新数据*/
      handleInsertUpdate(index){
        let self =this;
        let param = {exact:this.itemData.exact,isDefault:this.itemData.isDefault,keyword:this.itemData.keyword,message:this.itemData.message,type:1 };
        index==0 ? '':Object.assign(param,{id:this.id})
        let apiPath =  index == 0 ? 'manage.reply.replyAdd':'manage.reply.replyUpdate';
        ApiDataFilter.request({
          apiPath:apiPath,
          method:'post',
          data: param,
          successCallback(res){
            self.$message.success('提交成功');
            self.dialogVisible = false;
            self.getReplyList();
          }
        })
      },
      /*删除*/
      replyDelete(index,row){
        let self = this;
        ApiDataFilter.request({
          apiPath:'manage.reply.replyDel',
          data:{id:row.id},
          successCallback(res){
            self.$message.success('删除成功');
            self.getReplyList();
          }
        })
      },
      /*编辑*/
      handleEdit(index,row){
        this.itemData.keyword = row.keyword;
        this.itemData.message = row.message;
        this.itemData.exact = row.exact;
        this.itemData.isDefault = row.isDefault;
        this.way = 1;
        this.id = row.id;
        this.dialogVisible = true;
        this.title = '编辑';
      },
      /*新增弹框*/
      addItem(){
        this.itemData.keyword = '';
        this.itemData.message = '';
        this.itemData.exact = false;
        this.itemData.isDefault = false;
        this.dialogVisible = true;
        this.way = 0;
        this.title = '新增';
      },
      handleCache(){
        let self =this;
        ApiDataFilter.request({
          apiPath:'manage.reply.cache',
          successCallback(res){
            self.$message.success('成功')
          }
        })
      }
    },
    created(){
      this.getReplyList()
    }
  }
</script>

<style scoped lang="less">
   @import "autoReply.less";
</style>
