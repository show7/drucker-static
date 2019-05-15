<template>
  <div class="assist-standard-container">
    <h3>助教测评标准</h3>
    <div class="assist-standard-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            昵称或学号或RiseId：
            <el-input v-model="riseId" placeholder="请输入昵称或学号或RiseId"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="getAssistList">清空</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="assist-standard-content">
      <!--table表格-->
      <el-table
        :data="assistList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="助教级别">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改评测标准
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
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="60%">
      <div class="pop-out">
        <h4>课程内容：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">升降级倒计时天数：
              <el-input v-model="detailData.countDown" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">课程学习（累积）:
              <el-input v-model="detailData.learnedProblem" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">应用题完成比例：
              <el-input v-model="detailData.applicationRate" placeholder=""></el-input>
              %
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">求点评的回答数:
              <el-input v-model="detailData.requestReviewNumber" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">有效点评数：
              <el-input v-model="detailData.validReviewNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">有效点评率:
              <el-input v-model="detailData.validReviewRate" placeholder=""></el-input>
              %
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">优质回答数:
              <el-input v-model="detailData.highQualityAnswer" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <h4>线下工作坊：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">主持人次数:
              <el-input v-model="detailData.hostNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">主持人评分:
              <el-input v-model="detailData.hostScore" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">串讲人次数:
              <el-input v-model="detailData.mainPointNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">串讲人评分:
              <el-input v-model="detailData.mainPointScore" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <h4>线上活动：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">线上答题演习:
              <el-input v-model="detailData.onlineAnswer" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">吊打演习:
              <el-input v-model="detailData.swing" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">线上答疑或吊打:
              <el-input v-model="detailData.onlineOrSwingNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">线上活动反馈分数:
              <el-input v-model="detailData.onlineScore" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <h4>训练营：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">训练营次数:
              <el-input v-model="detailData.campNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">大教练次数:
              <el-input v-model="detailData.asstNumber" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">反馈评分:
              <el-input v-model="detailData.campScore" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <h4>企业培训：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">每月作业:
              <el-input v-model="detailData.monthlyWork" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">培养新人:
              <el-input v-model="detailData.fosterNew" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">企业培训次数:
              <el-input v-model="detailData.companyTrainNumber" placeholder=""></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">企业培训评分:
              <el-input v-model="detailData.companyTrainScore" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
        <h4>升级认证 ：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">是否需要升级认证:
              <el-input v-model="detailData.needVerified" placeholder=""></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "assistStandard",
    data() {
      return {
        pageIndex: 1,
        assistList: [],
        pageCount: null,
        riseId: '',
        dialogVisible: false,
        detailData: {
          countDown: '',
          learnedProblem: '',
          applicationRate: '',
          requestReviewNumber: '',
          validReviewNumber: '',
          validReviewRate: '',
          highQualityAnswer: '',
          hostNumber: '',
          hostScore: '',
          mainPointNumber: '',
          mainPointScore: '',
          swing: '',
          onlineAnswer: '',
          onlineOrSwingNumber: '',
          onlineScore: '',
          campNumber: '',
          asstNumber: '',
          campScore: '',
          monthlyWork: '',
          fosterNew: '',
          companyTrainScore: '',
          companyTrainNumber: '',
          needVerified: ''
        }
      }
    },
    methods: {
      getAssistList() {
        let param = {page: this.pageIndex};
        this.riseId = '';
        apiDataFilter.request({
          apiPath: 'course.assist.assistStandard',
          data: param,
          successCallback: (res) => {
            this.assistList = res.msg.data;
            this.pageCount = res.msg.page.pageCount;
          }
        })
      },
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.detailData = row;
      },
      /*搜索*/
      searchAssistList() {
        let param = {riseId: this.riseId};
        apiDataFilter.request({
          apiPath: 'course.assist.search',
          data: param,
          successCallback: (res) => {
            this.assistList = res.msg;
            this.pageCount = 1;
            this.pageIndex = 1;
          }
        })
      },
      update() {
        let param = this.detailData;
        apiDataFilter.request({
          apiPath: 'course.assist.update',
          data: param,
          method: 'post',
          successCallback: (res) => {
            this.dialogVisible = false;
            this.$message.success('更新完成');
            if (this.riseId) {
              this.search()
            } else {
              this.getAssistList();
            }
          }
        })
      },
      currentChange(val) {
        this.pageIndex = val;
        this.getAssistList();
      },
      search() {
        this.pageIndex = 1;
        this.searchAssistList();
      }
    },
    created() {
      this.getAssistList()
    }
  }
</script>

<style scoped lang='less'>
  @import "assistStandard.less";
</style>
