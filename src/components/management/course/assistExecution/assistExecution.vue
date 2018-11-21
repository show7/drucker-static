<template>
  <div class="assist-execution-container">
    <h3>助教完成情况</h3>
    <div class="assist-execution-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            昵称或学号或RiseId：
            <el-input v-model="riseId" placeholder="请输入昵称或学号或RiseId"></el-input>
            <el-button type="primary" @click="search">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-upload
              class="upload-demo"
              action="/pc/operation/assist/execution/file/update"
              :limit="1"
              :on-success="sendSuccess"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :file-list="fileList">
              <el-button size="small" type="primary">上传EXCEL</el-button>
            </el-upload>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="assist-execution-content">
      <!--table表格-->
      <el-table
        :data="executionList"
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
        <el-table-column
          prop="startDate"
          label="审核开始日期">
        </el-table-column>
        <el-table-column
          prop="countDown"
          label="倒计时天数">
        </el-table-column>
        <el-table-column
          prop="remainDay"
          label="剩余天数">
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleLookDetail(scope.$index, scope.row)">查看详情
            </el-button>
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
        <h4>小课内容：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">新增点评数： <el-input :disabled="disabled" v-model="detailData.reviewNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">新增求点评的回答数: <el-input :disabled="disabled" v-model="detailData.requestReviewNumber" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">新增有效的点评数： <el-input :disabled="disabled" v-model="detailData.validReviewNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">新增优质回答数: <el-input :disabled="disabled" v-model="detailData.highQualityAnswer" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <h4>线下工作坊：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">主持人次数:  <el-input :disabled="disabled" v-model="detailData.hostNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">主持人评分: <el-input :disabled="disabled" v-model="detailData.hostScore" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">串讲人次数:   <el-input :disabled="disabled" v-model="detailData.mainPointNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">串讲人评分: <el-input :disabled="disabled" v-model="detailData.mainPointScore" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <h4>线上活动：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">线上答题演习:  <el-input :disabled="disabled" v-model="detailData.onlineAnswer" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">吊打演习: <el-input :disabled="disabled" v-model="detailData.swing" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">线上答疑或吊打:   <el-input :disabled="disabled" v-model="detailData.onlineOrSwingNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">线上活动反馈分数: <el-input :disabled="disabled" v-model="detailData.onlineScore" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <h4>训练营：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">训练营次数:  <el-input :disabled="disabled" v-model="detailData.campNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">大教练次数: <el-input :disabled="disabled" v-model="detailData.asstNumber" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">反馈评分:   <el-input :disabled="disabled" v-model="detailData.campScore" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <h4>企业培训：</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">每月作业:  <el-input :disabled="disabled" v-model="detailData.monthlyWork" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">培养新人: <el-input :disabled="disabled" v-model="detailData.fosterNew" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">企业培训次数:   <el-input :disabled="disabled" v-model="detailData.companyTrainNumber" placeholder=""></el-input></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">企业培训评分:   <el-input :disabled="disabled" v-model="detailData.companyTrainScore" placeholder=""></el-input></div>
          </el-col>
        </el-row>
        <h4>升级认证(Y-已认证 N-未认证)</h4>
        <el-row>
          <el-col :span="12">
            <div class="grid-content">认证结果:  <el-input :disabled="disabled" v-model="detailData.upGrade" placeholder=""></el-input></div>
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
    name: "assistExecution",
    data(){
      return{
        riseId:'',
        fileList:[],
        pageIndex:1,
        pageCount:null,
        executionList:[],
        dialogVisible:false,
        disabled:false,
        detailData:{
          reviewNumber:'',
          requestReviewNumber:'',
          validReviewNumber:'',
          validReviewRate:'',
          highQualityAnswer:'',
          hostNumber:'',
          hostScore:'',
          mainPointNumber:'',
          mainPointScore:'',
          swing:'',
          onlineAnswer:'',
          onlineOrSwingNumber:'',
          onlineScore:'',
          campNumber:'',
          asstNumber:'',
          campScore:'',
          monthlyWork:'',
          fosterNew:'',
          companyTrainScore:'',
          companyTrainNumber:'',
          upGrade:''
        }
      }
    },
    methods:{
      getLoadExecution(){
        let param = {page:this.pageIndex};
        apiDataFilter.request({
          apiPath:'course.execution.load',
          data:param,
          successCallback:(res)=>{
            this.executionList = res.msg.data;
            this.pageCount = res.msg.page.pageCount;
          }
        })
      },
      search(){
        let param = {riseId:this.riseId};
        apiDataFilter.request({
          apiPath:'course.execution.search',
          data:param,
          successCallback:(res)=>{
            this.executionList = res.msg;
            this.pageIndex = 1
          }
        })
      },
      sendSuccess(res, file){
        this.fileList = [];
      },
      beforeUpload (file) {
        let typeName = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        const isXLS = typeName === 'xls';
        if (!isXLS) {
          this.$message.error('只能上传.xls格式!');
        }
        return isXLS;
      },
      currentChange(val){
        this.pageIndex = val;
      },
      handleEdit(index,row){
        this.detailData = row;
        this.disabled = false;
        this.dialogVisible = true;
      },
      update(){
        if ( !this.disabled){
          let param = this.detailData;
          apiDataFilter.request({
            apiPath:'course.execution.update',
            data:param,
            method:'post',
            successCallback:(res)=>{
              this.dialogVisible=false;
              this.$message.success('更新完成')
              if (this.riseId){
                this.search()
              } else {
                this.getLoadExecution()
              }
            }
          })
        } else {
          this.dialogVisible = false;
        }

      },
      handleLookDetail(index,row){
        this.detailData = row;
        this.dialogVisible = true;
        this.disabled = true;
      }
    },
    created(){
      this.getLoadExecution();
    }
  }
</script>

<style scoped lang='less'>
  @import "assistExecution.less";
</style>
