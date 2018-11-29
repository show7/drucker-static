<template>
  <div class="class-adviser-container">
    <h3>班主任管理</h3>
    <div class="class-adviser-content">
      <!--table表格-->
      <el-table
        :data="projectList"
        style="width: 100%">
        <el-table-column
          prop="memberTypeName"
          width="300"
          label="项目课程">
        </el-table-column>
        <el-table-column
          prop="rotateCount"
          label="班主任数量">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道">
        </el-table-column>
        <el-table-column
          prop="result"
          label="班主任列表">
          <template slot-scope="scope">
            <p class="adviser-list" @click="handleGetAdviser(scope.row)">查看班主任</p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="班主任列表" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
      <el-table :data="adviserList">
        <el-table-column property="nickName" label="昵称" width="150"></el-table-column>
        <el-table-column property="avatar" label="头像" width="200">
          <template slot-scope="scope">
            <img class="avatar-pic" :src="scope.row.avatar" alt="">
          </template>
        </el-table-column>
        <el-table-column property="startTime" label="开始服役时间"></el-table-column>
        <el-table-column property="endTime" label="退役时间"></el-table-column>
        <el-table-column property="sequence" label="排序"></el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdited(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        width="40%"
        title="编辑"
        :close-on-click-modal="false"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="adviser-detail">
          <el-row>
            <el-col :span="6">
              <div class="grid-content">
                昵称：
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content">
                <el-input v-model="nickName" :disabled="disabled" placeholder="请输入昵称"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="6">
            <div class="grid-content">
              头像：
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content">
              <img class="avatar-pic" :src="avatarUrl" alt="">
            </div>
          </el-col>
        </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content">
                顺序：
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content">
                <el-input type="number" v-model="sequence" placeholder="请输入顺序"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div class="grid-content">
                服务时间：
              </div>
            </el-col>
            <el-col :span="18">
              <div class="grid-content">
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  :disabled="disabled"
                  placeholder="选择开始日期">
                </el-date-picker>
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="选择结束日期">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>

  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "classAdviser",
    data() {
      return {
        projectList:[],
        adviserList:[],
        dialogTableVisible:false,
        innerVisible:false,
        nickName:'',
        avatarUrl:'',
        sequence:'',
        endTime:'',
        startTime:'',
        disabled:false,
        rotateId:'',
        adviserData:{
          status:'',
          memberTypeId:'',
          channel:''
        }
      }
    },
    methods:{
      handleGetAdviser(row){
        this.dialogTableVisible = true;
        this.adviserData.status = row.status;
        this.adviserData.memberTypeId = row.memberTypeId;
        this.adviserData.channel = row.channel;
        this.getClassAdviser(row);
      },
      /*加载项目*/
      getClassMember(){
        apiDataFilter.request({
          apiPath:'manage.classAdviser.rotates',
          successCallback:(res)=>{
             this.projectList = res.msg;
          }
        })
      },
      /*加载班主任*/
      getClassAdviser(row){
        let param = {status:row.status,memberTypeId:row.memberTypeId,channel:row.channel};
        apiDataFilter.request({
          apiPath:'manage.classAdviser.targetRotates',
          data:param,
          method:'post',
          successCallback:(res)=>{
             this.adviserList = res.msg;
          }
        })
      },
      /*编辑*/
      handleEdited(index,row){
        this.innerVisible = true;
        this.nickName = row.nickName;
        this.avatarUrl = row.avatar;
        this.startTime = row.startTime;
        this.endTime = row.endTime;
        this.sequence = row.sequence;
        this.disabled  =true;
        this.rotateId = row.rotateId;
      },
      /*提交*/
      submit(){
        if (!this.sequence || !this.endTime ){
           this.$message.error('请完善信息');
           return
        }
        let param = {sequence:this.sequence,expireDate:this.endTime,rotateId: this.rotateId};
        apiDataFilter.request({
          apiPath:'manage.classAdviser.update',
          data:param,
          method:'post',
          successCallback:(res)=>{
            this.$message.success('提交成功');
            this.innerVisible = false;
            this.getClassAdviser(this.adviserData);
          }
        })
      }
    },
    created(){
      this.getClassMember();
    }
  }
</script>

<style scoped lang='less'>
  @import "classAdviser.less";
</style>
