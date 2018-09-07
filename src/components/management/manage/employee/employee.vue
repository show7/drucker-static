<template>
  <div class="employee-container">
    <h3>人事管理</h3>
   <!-- <div class="employee-top">
       <h4>riseId</h4>
       <el-input v-model="riseId" placeholder="请输入riseId"></el-input>
    </div>-->
    <div class="employee-content">
      <div class="add-box">
        <el-button type="primary" @click="handleNewAdd">新增</el-button>
      </div>

      <el-table
        :data="tableList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="180">
          序号
        </el-table-column>
        <el-table-column
          prop="riseId"
          label="riseId">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column width="150" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDelect(scope.$index, scope.row)">删除</el-button>
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

      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
         width="30%">
        <div class="popout">
          <el-row>
            <el-col :span="4"><p>riseId</p></el-col>
            <el-col :span="20"> <el-input v-model="riseId" placeholder="请输入riseId"></el-input></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"><p>昵称或姓名</p></el-col>
            <el-col :span="20"> <el-input v-model="nickName" placeholder="请输入昵称或姓名"></el-input></el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import apiDataFilter from "../../../../libraries/apiDataFilter";

    export default {
        name: "employee",
        data() {
            return {
              tableList:[{riseId:'21e',nickName:'dha',department:'技术部',wechatId:'nidoas'}],
              pageIndex:1,
              pageCount:null,
              dialogVisible:false,
              nickName:'',
              riseId:'',
              id:''
            }
        },
        methods: {
          getList(){
            let param = {page:this.pageIndex};
            apiDataFilter.request({
              apiPath:"manage.employee.list",
              data:param,
              successCallback:(res)=>{
                let result = res.msg;
                this.tableList= result.content;
                this.pageCount = result.page.pageCount
              }
            })
          },
          delEmployee(){
            let param = {id:this.id};
            apiDataFilter.request({
              apiPath:'manage.employee.del',
              data:param,
              method:'post',
              successCallback:(res)=>{
                this.$message.success('删除成功');
                this.getList()
              }
            })
          },
          handleDelect(index,row){
            this.id = row.id;
            this.$confirm('此操作将删除员工, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.delEmployee()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          handleSubmit(){
            if (!this.nickName || !this.riseId) {
              this.$message.error('请填写完整信息');
              return
            }
            let  param = { riseId:this.riseId, nickName: this.nickName};
            apiDataFilter.request({
              apiPath:'manage.employee.add',
              method:'post',
              data:param,
              successCallback:(res)=>{
                 this.$message.success('提交成功');
                 this.dialogVisible =false;
                this.getList()
              }
            })
          },
          currentChange(val){
            this.pageIndex = val;
            this.getList();
          },
          handleNewAdd(){
           this.dialogVisible = true;
            this.riseId='';
            this.nickName = '';
          }
        },
        created() {
          this.getList()
        }
    }
</script>

<style scoped lang='less'>
    @import "employee.less";
</style>
