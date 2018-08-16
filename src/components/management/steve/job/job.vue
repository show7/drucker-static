<template>
  <div class="job">
    <h3>数据查询</h3>
    <!-- 功能选项 -->
    <div class="content-box">
      <el-row>
        <el-col :span="5" class="grid-content-left">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-right">
            <el-button type="primary" size="medium" @click="addJob">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!--table表格-->
      <el-table
        :data="jobList"
        style="width: 100%">
        <el-table-column
          prop="name"
          width="150"
          label="任务名">
        </el-table-column>
        <el-table-column
          prop="nickname"
          width="150"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="cronExpression"
          label="cron表达式">
        </el-table-column>
        <el-table-column
          prop="nextActionTime"
          label="下次执行时间">
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnLook(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleOnDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--编辑和新增弹框-->
    <el-dialog
      :title="title"
      :visible.sync="showData.dialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="50%">
      <div class="popout-box">
        <el-row>
          <el-col :span="12">
            <h4><span>*</span>任务名</h4>
            <el-input placeholder="请输入任务名" v-model="showData.name" :disabled="!!showData.id"></el-input>
          </el-col>
          <el-col :span="12">
            <h4><span>*</span>Cron表达式</h4>
            <el-input placeholder="请输入Cron表达式" v-model="showData.cronExpression" :disabled="!!showData.id"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <h4><span>*</span>邮件地址</h4>
          <el-input type="textarea" placeholder="请输入邮件列表,用英文逗号分隔" :row="4" v-model="showData.emailAddresses"
                    :disabled="!!showData.id"
          ></el-input>
          <h4><span>*</span>接收人</h4>
          <el-input type="input" placeholder="请输入接收人姓名" :row="4" v-model="showData.owner"
                    :disabled="!!showData.id"
          ></el-input>
        </el-row>
        <el-row>
          <el-col :span="24">
            <h4><span>*</span>查询SQL</h4>
            <el-input type="textarea" placeholder="请输入" :row="4" v-model="showData.jobSql"
                      :disabled="!!showData.id"></el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelData">取 消</el-button>
          <el-button type="primary" @click="saveData">确 定</el-button>
          <el-button type="primary" @click="actionTask">执 行</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'job',
  data () {
    return {
      title: '查看', // 弹窗标题
      jobList: [], // 任务列表
      showData: { dialogVisible: false } // 弹窗信息
    }
  },
  methods: {
    /* 搜索 */
    handleSearch () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'steve.job.list',
        method: 'get',
        successCallback (res) {
          self.jobList = res.msg;
        }
      })
    },
    /* 打开添加弹窗 */
    addJob () {
      this.showData = { dialogVisible: true };
      this.title = '新增';
    },
    /* 查看任务 */
    handleOnLook (index, itemData) {
      this.showData = Object.assign({ dialogVisible: true }, itemData);
      this.title = '查看';
    },
    /* 删除任务 */
    handleOnDelete (index, itemData) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'steve.job.delete',
        pathParams: [ itemData.id ],
        method: 'post',
        successCallback (res) {
          self.handleSearch();
        }
      })
    },
    /* 保存数据 */
    saveData () {
      if (this.showData.id) {
        this.showData = { dialogVisible: false }
      } else {
        // 新增
        let self = this;
        ApiDataFilter.request({
          apiPath: 'steve.job.add',
          method: 'post',
          data: this.showData,
          successCallback (res) {
            self.showData = { dialogVisible: false }
            self.handleSearch();
          }
        })
      }
    },
    /* 执行任务 */
    actionTask () {
      if (this.showData.id) {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'steve.job.action',
          pathParams: [ self.showData.id ],
          method: 'post',
          successCallback (res) {
            self.handleSearch();
          }
        })
      } else {
        alert('请先创建任务');
      }
    },
    /* 清除数据 */
    cancelData () {
      this.showData = { dialogVisible: false }
    }

  },
  created () {
    this.handleSearch();
  }
}
</script>

<style scoped lang="less">
  @import "./job.less";
</style>
