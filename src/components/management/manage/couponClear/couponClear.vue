<template>
    <div class="coupon-clear-container">
      <h3>消除优惠券</h3>
      <div class="coupon-clear-top">
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              用户riseId：<el-input v-model="riseId" placeholder="请输入riseId"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <el-button type="primary" @click="couponClearLoad">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="coupon-clear-content">
        <el-table
          :data="couponsList"
          style="width: 100%">
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="avatar" label="头像">
            <template slot-scope="scope">
              <div class="head-box">
                <img :src="scope.row.avatar" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDelete(scope.$index, scope.row)">消券
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "couponClear",
    data(){
      return{
        riseId:'',
        couponsList:[],
      }
    },
    methods:{
      handleDelete(index,row){
        this.$confirm('此操作将消除优惠券, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.couponDelete(row.id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消消除'
          });
        });
      },
      couponClearLoad(){
        let param = {riseId:this.riseId};
        apiDataFilter.request({
          apiPath:'manage.couponClear.load',
          data:param,
          successCallback:(res)=>{
            this.couponsList= res.msg.couponList;
            this.nickname = res.msg.nickname;
            this.avatar = res.msg.avatar;
            this.couponsList.forEach((item,index)=>{
               item.nickname = this.nickname;
               item.avatar = this.avatar
            })
          }
        })
      },
      couponDelete(id) {
        let param = {id: id};
        apiDataFilter.request({
          apiPath: 'manage.couponClear.delete',
          method: 'post',
          data: param,
          successCallback: (res) => {
            this.couponClearLoad();
            this.$message({
              type: 'success',
              message: '消除成功!'
            });
          }
        })
      }
    }
  }
</script>

<style scoped lang='less'>
    @import "couponClear.less";
</style>
