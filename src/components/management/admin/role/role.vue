<template>
  <div class="role-container">
    <h3>身份管理</h3>

    <div class="content-box">
      <div class="add-box">
        <el-button type="primary" size="medium" @click="addUserRole">添加</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="userRoleList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nickname"
          width="150"
          label="用户昵称">
        </el-table-column>
        <el-table-column
          prop="roleName"
          width="150"
          label="身份">
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="姓名">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleConfDel(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal = 'false'
      :show-close="false"
      width="40%">
      <div class="pop-box">
        <el-row>
          <el-col :span="8">
            <el-input v-model="riseId" :disabled="disabled" placeholder="请输入riseId"></el-input>
          </el-col>
          <el-col :span="8">
            <div class="riseId-button">
              <el-button type="primary" :disabled="disabled" @click="getAdd"> 查找profileId</el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <el-input v-model="profileId" disabled></el-input>
          </el-col>
        </el-row>
         <div class="select-box">
           <el-select v-model="roleId" placeholder="请选择角色">
             <el-option
               v-for="item in positionList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </div>
      </div>
      <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: 'role',
    data() {
      return {
        userRoleList: [],
        dialogVisible: false,
        title: '新增',
        profileId: '',
        roleId: '',
        riseId:'',
        positionList:[],
        positionId:'',
        disabled:false,
      }
    },
    methods: {
      /*得到list*/
      getRoleList() {
        apiDataFilter.request({
          apiPath: 'admin.role.all',
          successCallback: (res) => {
            this.userRoleList = res.msg
          }
        })
      },
      getPosition(){
        apiDataFilter.request({
          apiPath:'admin.role.roles',
          successCallback:(res)=>{
            this.positionList = res.msg;
          }
        })
      },
      /*删除操作*/
      handleDel(row) {
        let param = {id:row.id};
        apiDataFilter.request({
          apiPath: 'admin.role.del',
          method: 'post',
          data: param,
          successCallback: (res) => {
            this.$message.success('删除成功');
            this.getRoleList();
          }
        })
      },
      /*新增*/
      addUserRole() {
        this.title = '新增';
        this.dialogVisible = true;
        this.disabled = false;
        this.profileId = '';
        this.roleId = '';
        this.riseId = ''
      },
      /*编辑*/
      handleOnEdit(index, row) {
        this.title = '编辑';
        this.dialogVisible = true;
        this.profileId = row.profileId;
        this.roleId = row.roleId;
        this.disabled = true;
        this.riseId = row.riseId
      },
      /*删除*/
      handleConfDel(index,row) {
        this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDel(row)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      getAdd() {
        if(!this.riseId) {
          this.$message.error('请填写riseId')
          return
        }
        apiDataFilter.request({
          apiPath: 'weChat.groupManage.getMember',
          pathParams: [this.riseId],
          successCallback:(res)=> {
             this.profileId = res.msg.id;
          }
        })
      },

      /*提交新增和编辑*/
      handleSubmit(){
        if (!this.profileId || !this.roleId){
          this.$message.error('请完善信息')
          return;
        }
        let param = {profileId:this.profileId,roleId:this.roleId}
        apiDataFilter.request({
          apiPath:'admin.role.modify',
          method:'post',
          data:param,
          successCallback:(res)=>{
            this.$message.success('提交成功');
            this.dialogVisible = false;
            this.getRoleList();
          }
        })
      }

    },
    created() {
      this.getRoleList();
      this.getPosition();
    }
  }
</script>

<style scoped lang="less">
  @import "./role.less";
</style>
