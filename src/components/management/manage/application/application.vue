<template>
  <div class="application">
    <h3>申请审批</h3>
    <div class="application-top">
      <el-button type="primary" @click="threeDialogVisible = true">发送审核结果</el-button>
    </div>
    <div class="application-content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100"
          label="序号">
          序号
        </el-table-column>
        <el-table-column
          prop="nickname"
          width="150"
          label="	昵称">
        </el-table-column>
        <el-table-column
          prop="project"
          width="200"
          label="项目类型">
        </el-table-column>
        <el-table-column
          prop="interviewTime"
          width="150"
          label="合适的面试时间">
        </el-table-column>
        <el-table-column
          prop="workYear"
          width="150"
          label="首次工作时间">
        </el-table-column>
        <el-table-column
          prop="industry"
          width="150"
          label="当前职位">
        </el-table-column>
        <el-table-column
          prop="level"
          width="150"
          label="职位层级">
        </el-table-column>
        <el-table-column
          prop="college"
          width="150"
          label="院校名称">
        </el-table-column>
        <el-table-column
          prop="submitTime"
          width="170"
          label="问卷提交时间">
        </el-table-column>
        <el-table-column
          prop="applySource"
          width="150"
          label="申请方式">
        </el-table-column>
        <el-table-column
          prop="interviewerName"
          width="150"
          label="	面试人">
        </el-table-column>
        <el-table-column
          prop="isInterviewed"
          width="100"
          label="是否已经面试	">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"> 审核
            </el-button>
            <el-button
              size="mini"
              @click="handleAllocation(scope.$index, scope.row)"> 分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="getPageIndex"
          :page-count="pageData.pageCount">
        </el-pagination>
      </div>
    </div>
    <!--弹框-->
    <div class="application-layout">
      <el-dialog
        :visible.sync="dialogVisible"
        width="60%"
        :show-close="false">
        <div class="layout-box">
          <h3>申请者信息：</h3>
          <ul>
            <li><span>昵称：</span>{{rowData.nickname}}</li>
            <li><span>OpenId：</span>{{rowData.openid}}</li>
            <li><span>当前会员状态：</span>{{rowData.memberType}}</li>
            <li><span>付费状态：</span>{{rowData.finalPayStatus}}</li>
            <li><span>申请时会员类型：</span>{{rowData.originMemberTypeName}}</li>
            <li><span>是否助教：</span>{{rowData.isAsst}}</li>
            <li><span>最近审核结果：</span>{{rowData.verifiedResult}}</li>
            <li><span>是否黑名单用户：</span>{{rowData.isBlack}}</li>
            <li><span>最终付费状态：</span>{{rowData.finalPayStatus}}</li>
            <li><span>优惠券金额：</span>{{rowData.coupons}}</li>
            <li><span>面试官：</span>{{rowData.interviewerName}}</li>
          </ul>
          <h3 v-if="rowData.questionList">问卷信息：</h3>
          <ul v-if="rowData.questionList">
            <li v-for="(item, index) in rowData.questionList" :key="item.id"><span>{{item.question}}</span>
              <p>{{item.answer}}</p></li>
          </ul>
          <h3>评价：</h3>
          <div class="estimate">
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetSource" placeholder="请选择申请来源">
                  <el-option
                    v-for="item in applySource"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-time-picker
                  v-model="interviewTime"
                  placeholder="面试时间">
                </el-time-picker>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetChannel" placeholder="请选择关注渠道">
                  <el-option
                    v-for="item in focusChannels"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <div class="focus-channel-name" v-if=" targetChannel == '其他，请详述'">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入关注渠道"
                    v-model="focusChannelName">
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetTouchDuration" placeholder="请选择接触圈外时长">
                  <el-option
                    v-for="item in touchDurations"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input
                  v-if=" targetTouchDuration == '其他，请详述'"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入触圈外时长"
                  v-model="touchDurationName">
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetApplyEvent" placeholder="请选择触发申请商学院事件">
                  <el-option
                    v-for="item in applyEvents"
                    :key="item.id"
                    :label="item.value"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input
                  v-if=" targetApplyEvent == '其他，请详述'"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入申请商学院事件"
                  v-model="applyEventName">
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入学员提问"
                  v-model="question">
                </el-input>
              </el-col>
              <el-col :span="12">
                <el-select v-model="targetLearningWill" placeholder="请选择接学员学习意愿评估结果">
                  <el-option
                    v-for="item in [{id: 1, value: '是'},{id: 2, value: '否'}]"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetPotentialScore" placeholder="请选择发展潜力评估结果">
                  <el-option
                    v-for="item in potentialScores"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select v-model="targetAward" placeholder="请选择是否申请申请奖学金">
                  <el-option
                    v-for="item in [{id: 1, value: '是'},{id: 2, value: '否'}]"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-select v-model="targetAdmit" placeholder="选择是否录取">
                  <el-option
                    v-for="item in [{id: 0, value: '是'},{id: 1, value: '否'}]"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="面试备注"
                  v-model="remark">
                </el-input>
              </el-col>
            </el-row>
            <el-row v-if="showCouponChoose">
              <el-col :span="12">
                <el-select v-model="coupon" placeholder="选择优惠券">
                  <el-option
                    v-for="item in [ 0,100,200,300,400,500,600,800,1740,3480]"
                    :key="item"
                    :label="item===0 ? '无': item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                  <el-button type="primary"  @click="sendData(1)">确 定</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-dialog
          width="30%"
          title="提示"
          :show-close="false"
          :visible.sync="innerVisible"
          append-to-body>
          <p>是否拒绝,将进行退款操作</p>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary"   @click="sendData(2)">确 定</el-button>
            <el-button @click="innerVisible = false">取 消</el-button>
          </div>

        </el-dialog>
        <span v-if="!showCouponChoose" slot="footer" class="dialog-footer">
          <el-button type="primary" :disabled="rowData.isBlack === '是'" @click="handleCheck">通 过</el-button>
          <el-button type="danger"   @click="rejectCheck">拒 绝</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="another-layout">
      <el-dialog
        title="选择面试官："
        :show-close="false"
        :visible.sync="anotherDialogVisible"
        width="30%">
        <div class="another-layout-content">
          <el-select v-model="profileId" placeholder="请选择面试官">
            <el-option
              v-for="item in interviewerList"
              :key="item.profileId"
              :label="item.label"
              :value="item.profileId">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="anotherDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="sendAssignInterviewer">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="three-layout">
      <el-dialog
        title="提示"
        :show-close="false"
        :visible.sync="threeDialogVisible"
         width="30%">
        <span>是否发送之前审批的记录</span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="threeDialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="sendCheckedApplication">确 定</el-button>
         </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'application',
  data () {
    return {
      tableData: [],
      pageData: {}, //分页的数据
      dialogVisible: false,
      anotherDialogVisible: false,
      rowData: {},
      applySource: [{id: 1, value: '电话面试'}, {id: 2, value: '问卷申请'}], //申请来源
      targetSource: '',
      interviewTime: '', //面试时间
      question: '', //学员提问
      targetChannel: '', //关注渠道
      targetTouchDuration: '', //接触圈外时长
      targetApplyEvent: '', //申请商学院事件
      targetLearningWill: '', //学习意愿评估结果
      targetPotentialScore: '', //发展潜力评估结果
      targetAward: '', //奖学金
      targetAdmit: '', //是否录取
      remark: '', //面试备注
      coupon: 0, //优惠券
      focusChannelName: '', //自定义关注渠道
      touchDurationName: '', //自定义接触圈外时长
      applyEventName: '', //自定义事件
      showCouponChoose: false,
      focusChannels: [
        {id: 1, value: '圈圈的书'},
        {id: 2, value: '好友推荐'},
        {id: 3, value: '朋友圈'},
        {id: 4, value: '奴隶社会'},
        {id: 5, value: '分答&在行'},
        {id: 6, value: '知乎'},
        {id: 7, value: '领英'},
        {id: 8, value: '其他，请详述'},
        {id: 9, value: '不记得了'}
      ],
      touchDurations: [
        {id: 1, value: '不到一周'},
        {id: 2, value: '不到一个月（超过一周）'},
        {id: 3, value: '1-6个月'},
        {id: 4, value: '6个月以上'},
        {id: 5, value: '其他，请详述'},
        {id: 6, value: '不记得了'}
      ],
      applyEvents: [
        {id: 1, value: '朋友推荐'},
        {id: 2, value: '领导推荐'},
        {id: 3, value: '招募文章'},
        {id: 4, value: '圈圈直播'},
        {id: 5, value: '其他，请详述'},
        {id: 6, value: '不记得了'}
      ],
      potentialScores: [
        {id: 1, value: '1分'},
        {id: 2, value: '2分'},
        {id: 3, value: '3分'},
        {id: 4, value: '4分'},
        {id: 5, value: '5分'}
      ],
      pageIndex: 1,
      innerVisible: false,
      interviewerList: [],
      profileId: '', //面试官profileId
      threeDialogVisible: false
    }
  },
  methods: {
    getList (pageIndex) {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.application.applicationList',
        data: {page: pageIndex},
        successCallback (res) {
          self.tableData = res.msg.data;
          self.pageData = res.msg.page;
        }
      })
    },
    /*获取面试官*/
    getInterviewerList () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.application.interviewerList',
        successCallback (res) {
          let interviewerList = res.msg;
          if (interviewerList.length > 0) {
            interviewerList.map((item, index) => {
              interviewerList[index]['label'] = `${item.asstType} ${item.asstName}  已分配${item.assignCount}人`
            })
          }
          self.interviewerList = interviewerList;
        }
      })
    },
    /*分配面试官*/
    sendAssignInterviewer () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'manage.application.assignInterviewer',
        method: 'post',
        data: {applyId: self.rowData.id, profileId: self.profileId},
        successCallback (res) {
          self.$message.success('分配成功');
          self.anotherDialogVisible = false;
          self.profileId = '';
          self.getList();
        }
      })
    },
    /*发送审核结果*/
    sendCheckedApplication () {
      let self = this;
      let now = new Date()
      let year = now.getFullYear()
      let month = (now.getMonth() + 1 < 10) ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)
      let day = (now.getDate() < 10) ? ('0' + now.getDate()) : now.getDate()
      let dateStr = year + '-' + month + '-' + day
      ApiDataFilter.request({
        apiPath: 'manage.application.sendCheckedApplication',
        pathParams: [dateStr],
        successCallback (res) {
          self.$message.success('发送成功');
          self.threeDialogVisible = false;
        }
      })
    },
    /*拒绝通过数据验证*/
    rejectCheck () {
      if (!this.targetSource || !this.remark) {
        this.$message.info('请选择申请来源');
        return
      }
      this.innerVisible = true
    },
    /*获得页数*/
    getPageIndex (val) {
      this.getPageIndex = val;
      this.getList(val);
    },
    /*弹框分配*/
    handleAllocation ($index, row) {
      this.rowData = row;
      this.anotherDialogVisible = true;
      this.getInterviewerList();
    },
    /*点击弹框*/
    handleEdit ($index, row) {
      this.dialogVisible = true;
      this.showCouponChoose = false;
      this.targetSource = '';
      this.interviewTime = '';
      this.question = '';
      this.targetChannel = '';
      this.targetTouchDuratio = '';
      this.targetApplyEvent = '';
      this.targetLearningWill = '';
      this.targetPotentialScore = '';
      this.targetAward = '';
      this.targetAdmit = '';
      this.remark = '';
      this.coupon = '';
      this.focusChannelName = '';
      this.touchDurationName = '';
      this.applyEventName = '';
      this.rowData = row;
    },
    /*检验填写字段*/
    handleCheck () {
      if (!this.targetSource) {
        this.$message.info('请选择申请来源');
        return
      }
      if (this.targetSource == 2) {
        if (!this.remark) {
          this.$message.info('请输入面试备注');
          return
        }
      } else if (!this.interviewTime || !this.question || !this.targetChannel || !this.targetTouchDuration ||
          !this.targetApplyEvent || !this.targetLearningWill || !this.targetPotentialScore ||
          !this.targetAward || !this.remark) {
        this.$message.info('请将信息填写完成');
        return
      }
      this.showCouponChoose = true
    },
    /*确认通过发送数据*/
    sendData (flag) {
      let apiPath = '';
      let data = {};
      let self = this;
      let param = {applyId: this.rowData.applyId,
        profileId: this.rowData.profileId,
        interviewTime: this.interviewTime,
        question: this.question,
        type: this.targetSource,
        focusChannelName: this.focusChannelName,
        touchDurationName: this.touchDurationName,
        applyEventName: this.applyEventName,
        applyReason: this.applyReason,
        remark: this.remark,
        focusChannel: this.targetChannel,
        touchDuration: this.targetTouchDuration,
        applyEvent: this.targetApplyEvent,
        learningWill: this.targetLearningWill,
        potentialScore: this.targetPotentialScore,
        applyAward: this.targetAward,
        admit: this.targetAdmit
      }
      if (flag == 1) {
        this.handleCheck();
        apiPath = 'manage.application.approveBusinessApplication'
        data = {id: this.rowData.id, coupon: this.coupon, interviewDto: param}
      } else {
        apiPath = 'manage.application.rejectBusinessApplication';
        data = {id: this.rowData.id, interviewDto: param}
      }
      ApiDataFilter.request({
        apiPath: apiPath,
        method: 'post',
        data: data,
        successCallback (res) {
          self.dialogVisible = false;
          self.innerVisible = false;
          self.getList(self.pageIndex);
          self.$message.success('处理成功');
        }
      })
    }
  },
  created () {
    this.getList(this.pageIndex)
  }
}
</script>

<style scoped lang="less">
  @import "application.less";
</style>
