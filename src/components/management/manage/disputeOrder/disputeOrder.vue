<template>
  <div class="dispute-order-wrap">
    <el-card shadow="hover">

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>运营功能相关</el-breadcrumb-item>
        <el-breadcrumb-item>业务管理</el-breadcrumb-item>
        <el-breadcrumb-item>争议订单认领</el-breadcrumb-item>
      </el-breadcrumb>

    </el-card>
    <el-card shadow="hover">
      <el-form ref="queryForm"
               :inline="true"
               :rules="queryFormRules"
               :model="queryForm">
        <el-row>
          <el-col :lg="12">
            <el-form-item label="学员查询"
                          prop="type">
              <el-select v-model="queryForm.type"
                         placeholder="请选择学员查询条件">
                <el-option v-for="(item,i) in studentTypeList"
                           :key="i"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="userInfo">
              <el-input v-model="queryForm.userInfo"
                        clearable
                        placeholder="学员昵称/ID/学号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="购买项目"
                          prop="memberTypeId">
              <el-select v-model="queryForm.memberTypeId"
                         placeholder="请选择购买项目">
                <el-option v-for="(item,i) in projectList"
                           :key='i'
                           :label="item.label"
                           :value="item.value"></el-option>

              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="7">
            <el-form-item label="认领状态"
                          prop="status">
              <el-select v-model="queryForm.status"
                         placeholder="请选择认领状态">
                <el-option v-for="(item,i) in claimStatusList"
                           :key='i'
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="3">
            <el-button @click="queryFiltering('queryForm')"
                       type="primary">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card shadow="hover">
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="圈外ID">
          <template slot-scope="scope">
            <span>{{ scope.row.riseId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户微信昵称">
          <template slot-scope="scope">
            <el-popover trigger="hover"
                        placement="top">

              <p>用户微信昵称: {{ scope.row.nickname }}</p>
              <div slot="reference"
                   class="name-wrapper">
                <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="体验课班级"
                         prop="flowClassName">
        </el-table-column>
        <el-table-column label="体验课班主任"
                         prop="teacherInfo">
          <template slot-scope="scope">
            <div>{{ scope.row.flowTeacherName }}</div>
            <div>{{ scope.row.flowTeacherNickname }}</div>
          </template>
        </el-table-column>
        <el-table-column label="售卖链接班主任"
                         prop="saleTeacherNickname">
        </el-table-column>
        <el-table-column label="购买课程"
                         prop="businessMemberTypeName">
        </el-table-column>
        <el-table-column label="支付时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.paidTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实收金额"
                         prop="price">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <template slot-scope="scope">
            <div v-show="!scope.row.status && userRole && [1,2,3,4].includes(userRole)">
              <el-button size="mini"
                         @click="handleEdit(scope.row,scope.$index)">认领申请</el-button>
              <br>
            </div>
            <div v-show="scope.row.status === 1 && userRole && [1,2,3].includes(userRole)">
              <el-button size="mini"
                         @click="applyExamine( scope.row,scope.$index)"
                         type="warning">审核申请</el-button>
              <br>
            </div>
            <div v-show="scope.row.status === 1 ">
              <el-button size="mini"
                         type="info">待审核</el-button>
              <br>
            </div>
            <div v-show="scope.row.status === 2 ">
              <el-button size="mini"
                         type="success">审核通过</el-button>
              <br>
            </div>
            <div>
              <el-button size="mini"
                         type="danger"
                         v-show="!scope.row.status && userRole && [1,2,3].includes(userRole)"
                         @click="handleDelete( scope.row,scope.$index)">移除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="`认领${popupType? '申请':'审核'}`"
               :visible.sync="dialogFormVisible">
      <el-form :model="applyForm"
               :rules="applyFormRules"
               ref="applyForm"
               label-width="150px">
        <el-form-item label="用户微信昵称">
          <el-tag type="success">{{applyForm.nickname}}</el-tag>
        </el-form-item>
        <el-form-item label="体验课班级">
          <el-tag type="success">{{applyForm.flowClassName}}</el-tag>
        </el-form-item>
        <el-form-item label="购买课程">
          <el-tag type="success">{{applyForm.businessMemberTypeName}}</el-tag>
        </el-form-item>
        <el-form-item label="支付时间">
          <el-tag type="success">{{applyForm.paidTime}}</el-tag>
        </el-form-item>
        <el-form-item label="实际支付金额">
          <el-tag type="success">{{applyForm.price}}</el-tag>
        </el-form-item>
        <el-form-item label="认领班主任"
                      prop="teacher">
          <el-select v-model="applyForm.teacher"
                     :disabled="!popupType"
                     placeholder="请选择认领班主任">
            <el-option v-for="(item,i) in teacherList"
                       :key='i'
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认领理由"
                      prop="applyReason">
          <el-col :span="15">
            <el-tag type="success"
                    v-show="!popupType">{{applyForm.applyReason}}</el-tag>
            <el-input type="textarea"
                      :rows="2"
                      clearable
                      v-show="popupType"
                      placeholder="请输入认领理由"
                      v-model="applyForm.applyReason"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="proofPictures">

          <el-col :span="15">
            <img v-show="!popupType"
                 style="width:100%"
                 :src="applyForm.proofPictures">
            <el-upload class="upload-demo"
                       v-show="popupType"
                       action="/pc/upload/file"
                       list-type="picture"
                       :limit="1"
                       accept="image/*"
                       :multiple="false"
                       :on-success="upPicSuccess"
                       :on-remove="handleRemove"
                       :file-list="fileList">
              <el-button size="small"
                         v-show="!isShowUpDated"
                         type="primary">上传认领证明</el-button>
            </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">

        <div v-show="popupType">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="confirmClaim('applyForm')">确定认领</el-button>
        </div>
        <div v-show="!popupType">
          <el-button @click="rejectAndAdopt(2)">申请驳回</el-button>
          <el-button type="primary"
                     @click="rejectAndAdopt(1)">申请通过</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';
import { mapState, mapActions } from 'vuex'
import { Authentication } from '@/utils/util.js'
export default {
  name: 'disputeOrder',
  data () {
    return {
      queryForm: {
        type: '',
        userInfo: '',
        memberTypeId: 12,
        status: 0
      },
      queryFormRules: {
        type: { required: false, message: '请输入支付日期', trigger: 'change' },
        userInfo: { required: false, message: '请输入学员昵称/ID/学号', trigger: 'change' },
        memberTypeId: { required: false, message: '请输入购买项目', trigger: 'change' },
        status: { required: false, message: '请选择认领状态', trigger: 'change' }
      },
      studentTypeList: [{
        label: '学员昵称', value: 'nickname'
      }, {
        label: 'ID', value: 'riseId'
      }, {
        label: '学号', value: 'memberId'
      }],
      claimStatusList: [
        {
          label: '未认领',
          value: 0
        }, {
          label: '待审核',
          value: 1
        }, {
          label: '审核完成',
          value: 2
        }
      ],
      projectList: [],
      teacherList: [],
      tableData: [],
      applyForm: {
      },
      applyFormRules: {
        teacher: { required: true, message: '请选择班主任', trigger: 'change' },
        proofPictures: { required: true, message: '请上传认领图片证明' },
        applyReason: { required: true, message: '请输入认领理由', trigger: 'change' }
      },
      fileList: [],
      dialogFormVisible: false,
      popupType: 1,
      userRole: ''
    }
  },
  mounted () {
    // this.queryFiltering('queryForm')
    this.loadSelectInfo()
    this.setUserInfo()
    const { departmentId, positionId } = this.userInfo

    this.userRole = new Authentication(departmentId, positionId).init()
  },
  computed: {
    ...mapState(['userInfo']),
    isShowUpDated () {
      return this.fileList && this.fileList.length
    }
  },
  methods: {
    ...mapActions(['setUserInfo']),
    handleEdit (row) {
      this.fileList = []
      this.popupType = 1
      this.dialogFormVisible = true
      this.applyForm = { ...this.applyForm, ...row }
      this.$refs['applyForm'].resetFields();
    },
    queryFiltering (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        this.loadList()
      })
    },
    loadList () {
      const { type, userInfo, memberTypeId, status } = this.queryForm
      const params = {
        memberTypeId,
        status
      }
      apiDataFilter.request({
        apiPath: 'manage.salesOrder.loadScreeningList',
        data: type ? Object.assign(params, { [type]: userInfo }) : params,
        method: 'post',
        successCallback: (res) => {
          console.log(res)
          this.tableData = res.msg
        },
        errorCallback () {
          this.$refs['applyForm'].resetFields();
        }
      })
    },
    upPicSuccess (res, file, fileList) {
      this.fileList = fileList
      this.applyForm.proofPictures = res.msg
      console.log(res, file, fileList)
    },
    handleRemove () {
      this.fileList = []
      this.applyForm.proofPictures = ''
    },
    applyExamine (row) {
      this.popupType = 0
      this.dialogFormVisible = true
      this.applyForm = { ...this.applyForm, ...row }
      this.$refs['applyForm'].resetFields();
    },
    confirmClaim (formName) { //确定认领
      const { id: disputeId, proofPictures, applyReason, teacher } = this.applyForm
      const params = { disputeId, proofPictures, applyReason, teacher }
      this.$refs[formName].validate(valid => {
        if (!valid) return false
        apiDataFilter.request({
          apiPath: 'manage.salesOrder.confirmClaim',
          data: params,
          method: 'post',
          successCallback: (res) => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '确认认领成功!'
            });
            this.loadList()
            this.applyForm = {}
            this.$refs['applyForm'].resetFields();
            this.dialogFormVisible = false
          }
        })
      })
      console.log(formName)
    },
    loadSelectInfo () {
      apiDataFilter.request({
        apiPath: 'manage.salesOrder.loadSelectInfo',
        method: 'get',
        successCallback: (res) => {
          const { projectList, teacherList } = res.msg
          this.projectList = projectList
          this.teacherList = teacherList
        }
      })
    },
    async handleDelete (row) {
      const { id } = row
      await this.$confirm('此操作将删除该争议订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      apiDataFilter.request({
        apiPath: 'manage.salesOrder.delete',
        data: { id },
        method: 'post',
        successCallback: (res) => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadList()
        }
      })
    },
    rejectAndAdopt (status) {
      this.$refs['applyForm'].resetFields();
      console.log(this.applyForm)
      const { applicationId } = this.applyForm
      apiDataFilter.request({
        apiPath: 'manage.salesOrder.rejectAndAdopt',
        data: { applicationId, status },
        method: 'post',
        successCallback: (res) => {
          this.$message({
            type: 'success',
            message: status === 1 ? '提交通过申请' : '认领已经驳回'
          });
          this.dialogFormVisible = false
          this.loadList()
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "./disputeOrder.less";
</style>

