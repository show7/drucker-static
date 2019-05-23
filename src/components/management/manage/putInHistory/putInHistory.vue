<template>
  <div class="put-in-history-component">
    <el-card shadow="hover">
      <el-row :gutter="20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
          <el-breadcrumb-item>投放管理</el-breadcrumb-item>
          <el-breadcrumb-item>投放历史</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <br />
    <br />
    <el-card shadow="hover">
      <el-form :model="historyForm"
               :inline="true"
               status-icon
               :rules="historyRules"
               ref="historyForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="投放课程"
                          prop="memberLabelId">
              <el-select v-model="historyForm.memberLabelId"
                         placeholder="请选择">
                <el-option v-for="item in memberLabels"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投放时间"
                          prop="publishTime">
              <el-date-picker v-model="historyForm.publishTime"
                              type="daterange"
                              value-format="timestamp"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公众号搜索"
                          prop="kolAccountName">
              <el-input v-model="historyForm.kolAccountName"
                        placeholder="请输入公众号名字"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-button type="primary"
                         @click="submitQuery('historyForm')">查询</el-button>
              <el-button type="primary"
                         plain
                         @click="addCode()">新增渠道二维码</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData"
                align="center"
                style="width: 100%">
        <el-table-column label="投放课程"
                         align="center"
                         fixed
                         width="170">
          <template slot-scope="scope">
            <span>{{ scope.row.memberLabelIdStr }}</span>
          </template>
        </el-table-column>
        <el-table-column label="投放公众号"
                         align="center"
                         width="100">
          <template slot-scope="scope">
            <el-popover trigger="hover"
                        placement="top">
              <p>投放公众号: {{ `${scope.row.kolAccountTypeStr}类：${scope.row.kolAccountName}` }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag class="channel-source"
                        size="medium">{{ scope.row.kolAccountName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="渠道码"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            <el-popover trigger="hover"
                        placement="top">
              <p>渠道码: {{ scope.row.channelSource }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag class="channel-source"
                        size="medium">{{ scope.row.channelSource }}</el-tag>
              </div>
            </el-popover>

          </template>
        </el-table-column>
        <el-table-column label="投放时间"
                         align="center"
                         width="180">
          <template slot-scope="scope">
            <div>预计:<br><i class="el-icon-time"></i><span class="green-tip">{{ scope.row.publishTime }}</span> </div>
            <div>首次到客:<br><i class="el-icon-time"></i> <span class="green-tip">{{ scope.row.firstComeTime }}</span></div>
            <div>最新到客:<br><i class="el-icon-time"></i> <span class="green-tip">{{ scope.row.lastComeTime }}</span></div>
          </template>
        </el-table-column>
        <el-table-column label="到客情况"
                         align="center"
                         width="180">
          <template slot-scope="scope">
            <div>预计: {{ scope.row.predictAmount }}</div>
            <div>实际人数: {{ scope.row.comeMembers }}</div>
          </template>
        </el-table-column>
        <el-table-column label="流量分布"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <el-link style="color:#7DBE00;cursor:pointer"
                     @click="viewTeacherList(scope.row.flowTeachers,scope.row.kolAccountTypeStr)">查看班主任列表<i class="el-icon-view el-icon--right"></i> </el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         fixed="right"
                         width="100">
          <template slot-scope="scope">
            <el-button size="mini"
                       :disabled="!scope.row.isEdit"
                       @click="handleEdit(scope.row)">编辑</el-button>
            <br>
            <br>
            <el-button size="mini"
                       type="primary"
                       @click="analysisChannel(scope.row)">分析</el-button>
            <br>
            <br>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.row.channelLabelId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <br>
      <!-- 分页 -->
      <el-pagination v-show="!!tableData&&tableData.length"
                     @current-change="loadCurrentChange"
                     :hide-on-single-page="pageInfo.total&&pageInfo.total===1"
                     :current-page.sync="pageInfo.page"
                     :page-size="20"
                     layout="prev, pager, next, jumper"
                     :total="pageInfo.total">
      </el-pagination>
    </el-card>
    <!-- 查看班主任 -->
    <el-dialog :title="`${kolAccountTypeStr}投放流量分布`"
               :visible.sync="viewTeacher"
               width="50%"
               :before-close="viewTeacher">
      <el-table :data="flowTeachers">
        <el-table-column property="teacherName"
                         label="班主任"
                         width="180"></el-table-column>
        <el-table-column property="comeTimeRange"
                         label="到客周期"
                         width="350"></el-table-column>
        <el-table-column property="comeCount"
                         label="公众号到客"></el-table-column>
      </el-table>
    </el-dialog>
    <!-- 渠道分析 -->
    <el-dialog :title="`公众号：${kolAccountTypeStr}渠道分析`"
               :visible.sync="viewSourceAnalysis"
               width="30%"
               center>
      <el-input type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="channelAnalysis">
      </el-input>
      <span slot="footer"
            class="dialog-footer">

        <el-button type="primary"
                   @click="setChannelAnalysis">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增渠道二维码module -->
    <el-dialog :title="editStatus ? '新增投放二维码':'编辑渠道二维码'"
               :visible.sync="outerVisible">
      <el-dialog width="50%"
                 title="生成二维码成功"
                 :visible.sync="innerVisible"
                 append-to-body>
        <el-card class="box-card add-sucess-info-wrap">
          <el-row>
            <span class="info-title">公众号类型：</span>
            <el-tag type="success">{{addSuccessInfo.kolAccountTypeStr}}</el-tag>
          </el-row>
          <el-row>
            <span class="info-title">投放公众号：</span>
            <el-tag type="success">{{addSuccessInfo.kolAccountName}}</el-tag>
          </el-row>
          <el-row>
            <span class="info-title">投放课程：</span>
            <el-tag type="success">{{addSuccessInfo.memberLabelIdStr}}</el-tag>
          </el-row>
          <el-row>
            <span class="info-title">投放文案：</span>
            <el-tag type="success">{{addSuccessInfo.advertTypeStr}}</el-tag>
          </el-row>
          <el-row>
            <span class="info-title">渠道码：</span>
            <el-tag type="success">{{addSuccessInfo.source}}</el-tag>
          </el-row>

          <el-row>
            <span class="info-title">投放二维码：</span><img style="width: 100px; height: 100px"
                 :src="addSuccessInfo.flowQrCode"
                 :fit="'cover'" />
          </el-row>
        </el-card>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="viewingHistory">查看投放历史</el-button>
          <el-button type="primary"
                     @click="createContinue">继续创建</el-button>
        </div>
      </el-dialog>
      <el-form :model="addCodeForm"
               :inline="false"
               status-icon
               style="width:70%;margin:auto"
               label-width="120px"
               :rules="addCodeRules"
               ref="addCodeForm">
        <el-form-item label="投放课程"
                      prop="memberLabelId">
          <el-select v-model="addCodeForm.memberLabelId"
                     class="input-width"
                     :disabled="!editStatus"
                     placeholder="请选择">
            <el-option v-for="item in memberLabels"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公众号类型"
                      prop="kolAccountType">
          <el-select v-model="addCodeForm.kolAccountType"
                     class="input-width"
                     placeholder="请选择">
            <el-option v-for="item in kolAccountTypes"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投放公众号"
                      prop="kolAccountName">
          <el-input class="input-width"
                    v-model="addCodeForm.kolAccountName"></el-input>
        </el-form-item>
        <el-form-item label="投放文案"
                      prop="advertType">
          <el-select v-model="addCodeForm.advertType"
                     class="input-width"
                     placeholder="请选择">
            <el-option v-for="item in advertTypes"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获客观公众号"
                      prop="weChatServiceId">
          <el-select v-model="addCodeForm.weChatServiceId"
                     class="input-width"
                     placeholder="请选择">
            <el-option v-for="item in weChatServiceTypes"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="计划投放时间"
                      prop="publishTime">
          <el-date-picker v-model="addCodeForm.publishTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          style="width: 100%; max-width:250px"
                          type="datetime"
                          placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="预估人数"
                      prop="predictAmount">
          <el-input class="input-width"
                    v-model="addCodeForm.predictAmount"></el-input>
        </el-form-item>
        <el-form-item style="display:none"
                      prop="channelLabelId"></el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitGenerate('addCodeForm')">{{editStatus? "生成二维码":"重新生成"}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter';
export default {
  name: 'put-in-history',
  data () {
    return {
      historyForm: {
        memberLabelId: '',
        publishTime: [],
        kolAccountName: ''
      },
      historyRules: {
        memberLabelId: { required: true, message: '请选择投放课程', trigger: 'change' },
        publishTime: { required: true, message: '请选择投放时间', trigger: 'change' },
        kolAccountName: { required: true, message: '请输入公众号', trigger: 'change' }
      },
      addCodeForm: {
        channelLabelId: '',
        memberLabelId: '',//投放课程
        kolAccountType: '',//公众号类型
        kolAccountName: '',//投放公众号
        advertType: '',//投放文案
        weChatServiceId: '',
        publishTime: '',
        predictAmount: ''

      },
      addCodeRules: {
        memberLabelId: { required: true, message: '请选择投放课程', trigger: 'change' },
        kolAccountType: { required: true, message: '请选择公众号类型', trigger: 'change' },
        kolAccountName: { required: true, message: '请输入投放公众号', trigger: 'change' },
        advertType: { required: true, message: '请选择投放文案', trigger: 'change' },
        weChatServiceId: { required: true, message: '请选择获客公众号', trigger: 'change' },
        publishTime: { required: true, message: '请选择投放时间', trigger: 'change' },
        predictAmount: { required: true, message: '请输入预估人数', trigger: 'change' }
      },
      editStatus: true,
      outerVisible: false,
      innerVisible: false,
      viewTeacher: false,
      viewSourceAnalysis: false,
      addSuccessInfo: {
        kolAccountTypeStr: '',
        kolAccountName: '',
        memberLabelIdStr: '',
        advertTypeStr: '',
        source: '',
        weChatServiceId: '',
        flowQrCode: ''
      },
      advertTypes: [], //文案类型
      kolAccountTypes: [], //sh
      memberLabels: [], //课程类型
      weChatServiceTypes: [],
      pageInfo: {
        page: '',
        pageSize: '',
        total: ''
      },
      tableData: [
        // {
        //   memberLabelIdStr: '个人发展战略（免费）',
        //   kolAccountTypeStr: '职场类（书单)',
        //   channelLabelId: 1,
        //   channelSource: 12,
        //   publishTime: '2019-3-23 00:00',
        //   firstComeTime: '2019-3-23 00:00',
        //   lastComeTime: '2019-3-23 00:00',
        //   predictAmount: 789,
        //   paidCount: 500,
        //   isEdit: true,
        //   weChatComeCount: 999,
        //   memberLabelId: 1,//投放课程
        //   kolAccountType: 2,//公众号类型
        //   kolAccountName: '职场类（书单)',//投放公众号
        //   advertType: '职场类',//投放文案
        //   weChatServiceId: 6,

        //   flowTeachers: [
        //     { teacherName: '爸爸', comeTimeRange: '2019-5-25 12:00～2019-5-26 13：00', comeCount: 219 },
        //     { teacherName: '周跃强', comeTimeRange: '2019-5-25 12:00～2019-5-26 13：00', comeCount: 219 },
        //     { teacherName: '你爸爸', comeTimeRange: '2019-5-25 12:00～2019-5-26 13：00', comeCount: 219 },
        //   ]
        // }
      ],
      flowTeachers: {},
      kolAccountTypeStr: '',
      channelAnalysis: '',
      id: ''
    }

  },
  mounted () {
    // this.loadCurrentChange()
    ApiDataFilter.request({
      apiPath: 'manage.putInHistory.loadSelectInfo',
      method: 'get',
      successCallback: res => {
        const { weChatServiceTypes, memberLabels, kolAccountTypes, advertTypes } = res.msg
        this.weChatServiceTypes = weChatServiceTypes
        this.memberLabels = memberLabels
        this.kolAccountTypes = kolAccountTypes
        this.advertTypes = advertTypes
        console.log(res)
      }
    });
  },
  methods: {
    submitQuery (formName) {
      this.loadCurrentChange()
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        console.log('formName')
        this.loadCurrentChange()
      })
    },
    submitGenerate (formName) {// 生成二维码
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        const {
          channelLabelId = '',
          memberLabelId,
          kolAccountType,
          kolAccountName,
          advertType,
          weChatServiceId,
          publishTime,
          predictAmount
        } = this.addCodeForm
        const data = {
          channelLabelId,
          memberLabelId,
          kolAccountType,
          kolAccountName,
          advertType,
          weChatServiceId,
          publishTime,
          predictAmount
        }
        ApiDataFilter.request({
          apiPath: 'manage.putInHistory.saveGenerate',
          method: 'post',
          data,
          successCallback: res => {
            this.addSuccessInfo = res.msg
            this.innerVisible = true
            this.loadCurrentChange()
          }
        })
      });

    },
    viewingHistory () {
      this.outerVisible = false
      this.innerVisible = false
      this.$refs['addCodeForm'].resetFields()
    },
    viewTeacherList (flowTeachers, kolAccountTypeStr) {
      this.flowTeachers = flowTeachers
      this.kolAccountTypeStr = kolAccountTypeStr
      this.viewTeacher = true
    },
    analysisChannel (row) {
      const { kolAccountTypeStr, channelAnalysis = '', channelLabelId: id } = row
      this.id = id
      this.channelAnalysis = channelAnalysis
      this.viewSourceAnalysis = true
      this.kolAccountTypeStr = kolAccountTypeStr
    },
    createContinue () {
      this.innerVisible = false
      this.$refs['addCodeForm'].resetFields()
    },
    addCode () { //新增渠道二维码
      console.log('add')
      !this.editStatus && this.$refs['addCodeForm'].resetFields()
      this.outerVisible = true
      this.editStatus = true
    },
    handleEdit (row) { //编辑渠道二维码
      const {
        advertType,
        channelLabelId = '',
        kolAccountName,
        kolAccountType,
        memberLabelId,
        predictAmount,
        publishTime,
        weChatServiceId } = row
      this.addCodeForm = {
        advertType,
        channelLabelId,
        kolAccountName,
        kolAccountType,
        memberLabelId,
        predictAmount,
        publishTime,
        weChatServiceId
      }
      this.outerVisible = true
      this.editStatus = false
    },
    setChannelAnalysis () {
      const { id, channelAnalysis } = this
      if (!channelAnalysis) return this.$message({
        message: '分析内容不能为空',
        type: 'warning'
      });

      const data = {
        id, channelAnalysis
      }
      ApiDataFilter.request({
        apiPath: 'manage.putInHistory.channelAnalysis',
        method: 'post',
        data,
        successCallback: res => {
          console.log(res)
          this.loadCurrentChange()
          this.$message({
            message: '提交成功',
            type: 'success'
          });
          this.viewSourceAnalysis = false
        }
      })
    },
    loadCurrentChange (page) {//加载分页
      console.log(page, 'ppppp')
      const { kolAccountName, publishTime, memberLabelId } = this.historyForm
      const [publishTimeStart, publishTimeEnd] = publishTime
      const data = {
        page: page || this.pageInfo.page,
        publishTimeStart,
        publishTimeEnd,
        kolAccountName,
        memberLabelId
      }
      console.log(data)
      ApiDataFilter.request({
        apiPath: 'manage.putInHistory.loadPageList',
        method: 'get',
        data,
        successCallback: res => {
          console.log(res)
          const { list, page } = res.msg
          this.pageInfo = page
          this.tableData = list
        }
      })
    },
    handleDelete (channelLabelId) {//删除
      this.$confirm('此操作将永久删除本条记录, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { channelLabelId }
        ApiDataFilter.request({
          apiPath: 'manage.putInHistory.delete',
          method: 'post',
          data,
          successCallback: res => {
            this.$message({
              type: 'success',
              message: '您已成功成功删除'
            });
            this.loadCurrentChange()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style lang="less">
@import "./putInHistory.less";
</style>
