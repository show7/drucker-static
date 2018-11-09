<template>
  <div class="guessing-container">
    <h3>竞猜管理</h3>
<!--    <div class="guessing-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            活动状态：
            <el-select v-model="statusId" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">

          </div>
        </el-col>
      </el-row>
    </div>-->
    <div class="guessing-content">
      <div class="new-add">
        <el-button type="primary" @click="handleAdd">新增竞猜</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="activityList"
        style="width: 100%">
        <el-table-column
          prop="activityName"
          width="300"
          label="竞猜题目">
        </el-table-column>
        <el-table-column
          prop="choiceA"
          label="答案A">
        </el-table-column>
        <el-table-column
          prop="choiceB"
          label="答案B">
        </el-table-column>
        <el-table-column
          prop="rewardA.amount"
          label="A方竞猜金额">
        </el-table-column>
        <el-table-column
          prop="rewardA.joinNum"
          label="A方竞猜人数">
        </el-table-column>
        <el-table-column
          prop="rewardB.amount"
          label="B方竞猜金额">
        </el-table-column>
        <el-table-column
          prop="rewardB.joinNum"
          label="B方竞猜人数">
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="竞猜结束时间">
        </el-table-column>
        <el-table-column
          prop="status"
          label="活动状态">
        </el-table-column>
        <el-table-column
          prop="result"
          label="竞猜结果">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="scope.row.statusId == 2"
              @click="handleEndActivity(scope.$index, scope.row)">开奖
            </el-button>
            <el-button
              size="mini"
              v-if="scope.row.statusId == null"
              @click="handlePublish(scope.$index, scope.row)">发布
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
    <!--新增活动-->
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
       width="60%">
      <div class="pop-out">
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
             <div class="title"><span>*</span>竞猜题目：</div> <el-input maxlength="30" v-model="activity.question" placeholder="请输入题目"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row v-for="(item,index) in activity.answerList" :key="index">
          <el-col :span="24">
            <div class="grid-content">
              <div class="title"> <span>*</span>答案{{index+1}}：</div><el-input v-model="item.name" placeholder="请输入答案"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <div class="title"><span>*</span>竞猜结束时间：</div>
              <el-date-picker
                v-model="activity.activityEndTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择竞猜结束时间">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              <div class="title">正确答案：</div>
              <el-select v-model="activity.activityResultIndex" placeholder="请选择答案">
                <el-option
                  v-for="item in activity.answerList"
                  :key="item.id"
                  :label="item.activityResultName"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleCheckData">确 定</el-button>
      </span>
    </el-dialog>
     <!--开奖弹框-->
    <el-dialog
      title="开奖"
      :visible.sync="dialogVisiblePublish"
      :show-close="false"
      :close-on-click-modal="false"
      width="30%">
      <div class="pop-out-end">
        <div class="number">总参与人数：{{joinNum}}人</div>
        <div class="question">竞猜题目：{{activityName}}</div>
        <div class="select">
          <el-select v-model="choicesId" placeholder="请选择">
            <el-option
              v-for="item in choices"
              :key="item.choiceId"
              :label="item.choiceStr"
              :value="item.choiceId">
            </el-option>
          </el-select>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblePublish = false">取 消</el-button>
          <el-button type="primary" @click="handleCheckPubish">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import apiDataFilter from "../../../../../libraries/apiDataFilter";

  export default {
    name: "guessing",
    data(){
      return{
        statusList:[{id:0,name:'全部'},{id:1,name:'进行中'},{id:2,name:'已开奖'}],
        statusId:0,
        pageIndex:1,
        activityList:[],
        dialogVisible:false,
        dialogVisiblePublish:false,
        pageCount:null,
        choices:[],//开奖list
        choicesId:null,//开奖选项ID
        activityName:'',//活动问题
        joinNum:'',//总人数
        activityId:'',
        activity:{
          question:'',
          answerList:[{id:0,name:'',activityResultName:'答案1'},{id:1,name:'',activityResultName:'答案2'}],
          activityResultIndex:null,
          activityEndTime:'',
        }
      }
    },
    methods:{
      /*得到list*/
      getActivityList(){
        let param = {statusId: this.statusId,page:this.pageIndex};
        apiDataFilter.request({
          apiPath:'weChat.activity.activityList',
          data:param,
          successCallback:(res)=>{
            this.activityList= res.msg.guessActivityVOs;
            this.pageCount = res.msg.page.pageCount
          }
        })
      },
      /*提交新增接口*/
      activitySubmit(){
        let param =this.activity;
        apiDataFilter.request({
          apiPath:'weChat.activity.activitySubmit',
          data:param,
          method:'post',
          successCallback:(res)=>{
            this.$message.success('提交成功');
            this.getActivityList();
            this.dialogVisible =false;
          }
        })
      },
      /*检测添加数据*/
      handleCheckData(){
        if (!this.activity.question) {
          this.$message.error('请填写问题')
          return
        }if (!this.activity.activityEndTime){
          this.$message.error('请选择结束时间');
          return
        }
        if (!this.checkAnswerList()){
          this.$message.error('请填写完整选项')
          return
        }
        this.activitySubmit()
      },
      /*检测选项*/
      checkAnswerList(){
        let list = []
        list = this.activity.answerList.filter((item)=>{
          return !item.name
        })
        if (list.length == 0){
          return true
        } else {
          return false
        }
      },
      /*开奖接口*/
      handleCheckPubish(){
        if (!this.choicesId){
          this.$message.error('请选择选项');
          return;
        }
        apiDataFilter.request({
          apiPath:'weChat.activity.packet',
          data:{choiceId:this.choicesId,activityId:this.activityId},
          method:'post',
          successCallback:(res)=>{
            this.$message.success('开奖成功');
            this.dialogVisiblePublish = false;
            this.getActivityList();
          }
        })
      },
      /*发布*/
      handlePublish(index,row){
        this.$confirm('确定发布, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            apiDataFilter.request({
              apiPath:'weChat.activity.publish',
              method:'post',
              data:{activityId:row.activityId},
              successCallback:(res)=>{
                this.$message.success('发布成功');
                this.getActivityList();
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      /*开奖*/
      handleEndActivity(index,row){
        this.dialogVisiblePublish = true;
        this.choicesId = row.rightChoiceId;
        this.choices= row.choices;
        this.joinNum = row.joinNum;
        this.activityName = row.activityName;
        this.activityId = row.activityId;
      },
      handleAdd(){
        this.dialogVisible =true;
        this.activity={
            question:'',
            answerList:[{id:0,name:'',activityResultName:'答案1'},{id:1,name:'',activityResultName:'答案2'}],
            activityResultIndex:null,
            activityEndTime:'',
        }
      },
      currentChange(val){
        this.pageIndex = val;
        this.getActivityList()
      }
    },
    created(){
      this.getActivityList();
    }
  }
</script>

<style scoped lang='less'>
  @import "guessing.less";
</style>
