<template>
    <div class="refund-container">
      <h3>退款</h3>
      <div class="refund-top">
        <el-row>
          <el-col :span="4">
            <el-input v-model="userInfo" placeholder="请输入riseId或学号"></el-input>
          </el-col>
          <el-col :span="20">
            <el-button type="primary" @click="handleGetInfo">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="refund-content">
        <el-table
          :data="resultList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="avatar"
            label="头像">
            <template slot-scope="scope">
              <div class="head-pic">
                <img :src="scope.row.avatar" alt="头像">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="riseId"
            label="riseId">
          </el-table-column>
          <el-table-column
            prop="memberId"
            label="学号">
          </el-table-column>
          <el-table-column
            prop="memberTypeName"
            label="项目">
          </el-table-column>
          <el-table-column
            prop="paidFee"
            label="付费金额">
          </el-table-column>
          <el-table-column
            prop="refundFee"
            label="已退金额">
          </el-table-column>
          <el-table-column width="100" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleRefund(scope.$index, scope.row)">退款
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="退款"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        width="30%">
        <div class="pop-out">
          <el-row>
            <el-col :span="8">
                 <p>退款金额</p>
            </el-col>
            <el-col :span="16">
              <el-input v-model="fee" placeholder="请输入退款金额"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <p>是否保留会员</p>
            </el-col>
            <el-col :span="16">
              <el-select v-model="expired" placeholder="请选择">
                <el-option
                  v-for="item in expiredList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="handleConf">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "refund",
    data(){
      return{
        resultList:[],
        userInfo:'',
        dialogVisible:false,
        fee:'',
        expired:false,
        expiredList:[{value:true,name:'保留会员'},{value:false,name:'关闭会员'}],
        memberTypeName:''
      }
    },
    methods:{
       handleGetInfo(){
         if (!this.userInfo) {
           this.$message.error('请输入riseId或学号');
           return
         }
         let param = {userInfo:this.userInfo};
         apiDataFilter.request({
           apiPath:'advance.refund.load',
           data:param,
           successCallback:(res)=>{
             this.resultList = res.msg;
           }
         })
       },
      handleRefund(index,row){
         this.orderId = row.orderId;
         this.dialogVisible = true;
         this.expired = true;
         this.fee = '';
         this.memberTypeName = row.memberTypeName;
      },
      refund(){
        let param = {fee:this.fee, orderId:this.orderId, expired:this.expired} ;
        apiDataFilter.request({
          apiPath:'advance.refund.refund',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('退款成功');
            this.dialogVisible = false;
            if (this.userInfo) {
              this.handleGetInfo();
            }else {
              this.$message.info('没有riseId或学号不能刷新数据')
            }
          }
        })
      },
      handleConf() {
         if (!this.fee){
           this.$message.error('请填写退款金额');
           return
         }
        this.$confirm(`此操作将退款${this.memberTypeName}的「${this.fee}」元给用户, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.refund();
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

<style scoped lang='less'>
  @import "refund.less";
</style>
