<template>
  <div class="class-group-container">
    <h3>项目添加班主任</h3>
    <br>
    <el-card shadow="hover">
      <el-row :gutter="24">
        <el-col :span="18">
          <span>请选择筛选条件</span>
          <el-cascader :options="semester"
                       v-model="selectedOptions"
                       @change="loadQrCode">
          </el-cascader>
        </el-col>
        <el-col :span="6">
          <el-button type="success"
                     @click="loadTeachers"
                     plain>新增群二维码</el-button>
        </el-col>
      </el-row>
    </el-card>
    <br>
    <el-card shadow="hover">
      <div class="class-adviser-content">
        <!--table表格-->
        <el-table :data="qrCodeList"
                  style="width: 100%">
          <el-table-column prop="teacherName"
                           width="300"
                           label="班主任">
          </el-table-column>
          <el-table-column prop="qrCode"
                           label="二维码">
            <template slot-scope="scope">
              <img :src="scope.row.qrCode"
                   alt=""
                   class="group-weichat-code">
            </template>

          </el-table-column>
          <el-table-column prop="sequence"
                           label="顺序">
          </el-table-column>
          <el-table-column prop=""
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog title="新增群二维码"
               :visible.sync="outerVisible">
      <el-card shadow="hover">
        <el-form ref="addCodeFrom"
                 :model="addCodeInfo"
                 label-width="80px"
                 :rules="rules"
                 size="small">
          <el-form-item label="选择学期"
                        prop="semester">
            <el-cascader :options="semester"
                         v-model="addCodeInfo.semester"
                         @change="loadQrCode">
            </el-cascader>
          </el-form-item>
          <el-form-item label="班主任"
                        prop="teacher">
            <el-select v-model="addCodeInfo.profileId"
                       size="small"
                       placeholder="请选择您心仪的班主任">
              <el-option v-for="item in teacherList"
                         :key="item.id"
                         :label="item.nickName"
                         :value="item.profileId">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="顺序"
                        size="small"
                        prop="sequence">
            <el-input type="sequence"
                      v-model.number="addCodeInfo.sequence"></el-input>
          </el-form-item>
          <el-form-item label="群二维码">
            <el-upload action="/pc/upload/file"
                       list-type="picture-card"
                       :limit="1"
                       :multiple="false"
                       :disabled="upFileDisabled"
                       :on-success="upPicSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addClassQrCode('addCodeFrom')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';

export default {
  name: 'classAdviser',
  data () {
    return {
      semester: [],
      outerVisible: false,
      qrCodeList: [],
      selectedOptions: [],
      teacherList: [],
      sequence: '',
      addCodeInfo: {
        profileId: '',
        sequence: '',
        semester: [],
        qrCodeImageUrl: ''
      },
      rules: {
        semester: [{ required: true, message: '请选择学期', trigger: 'change' }],
        sequence: [{ required: true, message: '顺序字段不能为空', trigger: 'blur' }, { type: 'number', message: '顺序必须为数字值', trigger: 'blur' }],
        teacher: [{ validator: serialno, required: true, message: '请选择班主任', trigger: 'change' }]
      },
      upFileDisabled: false,
      viewTheBigQrCode: false

    }
  },
  mounted () {
    this.getclassGroup()
    this.loadTeachers()
  },
  methods: {
    getclassGroup () {
      apiDataFilter.request({
        apiPath: 'manage.classGroup.loadOpendate',
        successCallback: (res) => {
          // console.log(res)
          const { code, msg } = res
          if (code !== 200) return '加载筛选条件失败'
          let semester = msg
          semester.forEach(item => {
            const { memberTypeName, memberTypeId, openDateList } = item
            let children = openDateList.map(date => { return { label: date, value: date } })
            item = Object.assign(item, { label: memberTypeName, value: memberTypeId, children })
          });
          this.semester = semester
          // console.log(options)
        }
      })
    },
    loadQrCode (value) {
      // console.log(value)
      apiDataFilter.request({
        apiPath: 'manage.classGroup.loadQrCode',
        pathParams: value,
        successCallback: (res) => {
          this.qrCodeList = res.msg
          console.log(res)
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除本条信息, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = row
        apiDataFilter.request({
          apiPath: 'manage.classGroup.del',
          data: { id },
          method: 'post',
          successCallback: (res) => {
            console.log(res)
            const { code, msg } = res
            if (code !== 200) return this.$message.error(msg);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadQrCode(this.selectedOptions)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(index, row)
    },
    loadTeachers () {
      apiDataFilter.request({
        apiPath: 'manage.classGroup.teachers',
        successCallback: (res) => {
          console.log(res)
          this.teacherList = res.msg
          this.outerVisible = true
        }
      })
    },
    addClassQrCode (formName) {
      console.log(this.addCodeInfo)
      this.$refs[formName].validate((valid) => {
        if (!valid) return
        const { qrCodeImageUrl, profileId, sequence, semester } = this.addCodeInfo
        const [memberTypeId, openDate] = semester
        const data = { qrCodeImageUrl, profileId, sequence, semester, memberTypeId, openDate }
        console.log(data)
        apiDataFilter.request({
          apiPath: 'manage.classGroup.add',
          data,
          successCallback: (res) => {
            console.log(res)
            this.teacherList = res.msg
            this.outerVisible = true
          }
        })
      });
    },
    upPicSuccess (res, file, fileList) {
      console.log(res, file, fileList)
      let { msg } = res
      this.addCodeInfo.qrCodeImageUrl = msg
    },
    handleGetAdviser (row) {
      console.log(row)
      this.dialogTableVisible = true;
      this.adviserData.status = row.status;
      this.adviserData.memberTypeId = row.memberTypeId;
      this.adviserData.channel = row.channel;
      this.getClassAdviser(row);
    },
    /*加载需要添加的班主任*/
    headTeachers () {
      apiDataFilter.request({
        apiPath: 'manage.classAdviser.teachers',
        successCallback: (res) => {
          this.headTeachersList = res.msg;
          this.innerVisible = true;
        }
      })
    },
    /*加载项目*/
    getClassMember () {
      apiDataFilter.request({
        apiPath: 'manage.classAdviser.rotates',
        successCallback: (res) => {
          // this.projectList = res.msg;
        }
      })
    },
    /*加载班主任*/
    getClassAdviser (row) {
      const { status, memberTypeId, channel } = row
      const param = { status, memberTypeId, channel }
      apiDataFilter.request({
        apiPath: 'manage.classAdviser.targetRotates',
        data: param,
        method: 'post',
        successCallback: (res) => {
          console.log('加载班主任', res)
          this.adviserList = res.msg
        }
      })
    },
    /*新增测验数据*/
    handleCheck () {
      if (!this.headTeachersId || !this.sequence || !this.startTime || !this.endTime) {
        this.$message.error('请完善数据');
        return;
      }
      this.handleAddSubmit();
    },
    handleAddSubmit () {
      let param = { headTeacherId: this.headTeachersId, isActive: this.del, sequence: Number(this.sequence), activeDateStr: this.startTime, expiredDateStr: this.endTime }
      Object.assign(param, this.adviserData);
      apiDataFilter.request({
        apiPath: 'manage.classAdviser.add',
        method: 'post',
        data: param,
        successCallback: (res) => {
          this.$message.success('新增成功');
          this.innerVisible = false;
          this.getClassAdviser(this.adviserData);
        }
      })
    },
    handleAdd () {
      this.nickName = '';
      this.avatarUrl = '';
      this.startTime = '';
      this.endTime = '';
      this.sequence = '';
      this.disabled = false;
      this.rotateId = '';
      this.title = '新增';
      this.headTeachersId = '';
      this.headTeachers();
    },
    /*编辑*/
    handleEdited (index, row) {
      const { nickName, avatar, startTime, endTime, sequence, rotateId, del } = row
      console.log(index, row)
      this.title = '编辑';
      this.innerVisible = true;
      this.nickName = nickName;
      this.avatarUrl = avatar;
      this.startTime = startTime;
      this.endTime = endTime;
      this.sequence = sequence;
      this.disabled = true;
      this.rotateId = rotateId;
      this.del = del
    },
    /*提交*/
    submit () {
      if (!this.sequence || !this.endTime) {
        this.$message.error('请完善信息');
        return
      }
      let param = { sequence: this.sequence, expireDate: this.endTime, rotateId: this.rotateId, isActive: this.del };
      apiDataFilter.request({
        apiPath: 'manage.classAdviser.update',
        data: param,
        method: 'post',
        successCallback: (res) => {
          this.$message.success('提交成功');
          this.innerVisible = false;
          this.getClassAdviser(this.adviserData);
        }
      })
    }
  },
  created () {
    this.getClassMember();
  }
}
</script>

<style scoped lang='less'>
@import "classGroup.less";
</style>
