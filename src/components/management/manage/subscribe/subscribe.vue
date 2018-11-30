<template>
  <div class="subscribe-container">
    <h3>服务号关注回复</h3>
    <div class="subscribe-content">
      <el-table
        :data="subscribeList"
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
          prop="del"
          label="是否失效">
          <template slot-scope="scope">
            <p>{{scope.row.del == 1 ? '是':'否'}}</p>
          </template>
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
       title="编辑"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="40%">
      <div class="popout-box">
        <h4>回复内容</h4>
        <el-input type="textarea" placeholder="请输入回复内容" v-model="message" clearable></el-input>

        <el-checkbox v-model="useing">使用中</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="send">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'subscribe',
  data () {
    return {
      subscribeList: [],
      dialogVisible: false,
      message: '',
      useing: false,
      id: ''
    }
  },
  methods: {
    getList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.subscribe.subscribeLoad',
        successCallback (res) {
          self.subscribeList = res.msg;
        }
      })
    },
    handleEdit (index, row) {
      this.dialogVisible = true;
      this.message = row.message;
      this.useing = row.del != 1,
      this.id = row.id
    },
    send () {
      let self = this;
      let param = {id: this.id, message: this.message, del: this.useing ? 0 : 1};
      ApiDataFilter.request({
        apiPath: 'manage.subscribe.subscribeUpdate',
        method: 'post',
        data: param,
        successCallback (res) {
           self.dialogVisible = false;
          self.subscribeList = [res.msg];
          self.$message.success('提交成功');
          self.getList()
        }
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang='less'>
@import "subscribe.less";
</style>
