<template>
  <div class="employee-container">
    <h3>员工管理</h3>
    <div class="employee-top">
      <h4>输入riseId</h4>
      <el-input v-model="riseId"
                placeholder="请输入riseId"></el-input>
      <el-button type="primary"
                 @click="handleSearch">搜索</el-button>
    </div>
    <div class="employee-content">
      <div class="add-box">
        <el-button type="primary"
                   @click="handleNewAdd">添加员工</el-button>
      </div>

      <el-table :data="tableList"
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="180">
          序号
        </el-table-column>
        <el-table-column prop="riseId"
                         label="riseId">
        </el-table-column>
        <el-table-column prop="nickName"
                         label="真实姓名">
        </el-table-column>
        <el-table-column prop="phone"
                         label="手机">
        </el-table-column>
        <el-table-column prop="department"
                         label="部门">
        </el-table-column>
        <el-table-column prop="position"
                         label="职位">
        </el-table-column>
        <el-table-column prop="leader"
                         label="组长">
        </el-table-column>
        <el-table-column width="200"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <div v-if='scope.row.status===0'>
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         @click="handleDevice(scope.$index, scope.row)">离职</el-button>
            </div>
            <div v-else>
              <el-button size="mini"
                         disabled>已离职</el-button>
              <el-button size="mini"
                         @click="handleDelect(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!--分页-->
      <div class="pagination">
        <el-pagination background
                       layout="prev, pager, next"
                       :current-page="pageIndex"
                       @current-change="currentChange"
                       :page-count="pageCount">
        </el-pagination>
      </div>

      <el-dialog title="添加员工"
                 :visible.sync="dialogVisible"
                 :close-on-click-modal="false"
                 width="30%">
        <el-form :model="itemData"
                 :rules="rules">
          <div class="popout">
            <el-row>
              <el-col :span="18">
                <el-form-item label="riseId"
                              prop="riseId">
                  <el-input v-model="itemData.riseId"
                            placeholder="请输入riseId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="真实姓名"
                              prop="nickName">
                  <el-input v-model="itemData.nickName"
                            placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="手机"
                              prop="phone">
                  <el-input v-model="itemData.phone"
                            placeholder="请输入手机"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="部门"
                              prop="department">
                  <el-select v-model="itemData.department"
                             placeholder="请选择公众号"
                             clearable
                             filterable>
                    <el-option v-for="item in department"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="职位"
                              prop="position">
                  <el-select v-model="itemData.position"
                             placeholder="请选择公众号"
                             clearable
                             filterable>
                    <el-option v-for="item in position"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="组长"
                              prop="leader">
                  <el-select v-model="itemData.leader"
                             placeholder="请选择组长"
                             @change="handleSelect"
                             clearable
                             filterable
                             remote
                             reserve-keyword
                             :remote-method="getLeader">
                    <el-option v-for="item in leader"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleSubmit(true)">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加员工"
                 :visible.sync="editVisible"
                 :close-on-click-modal="false"
                 width="30%">
        <el-form :model="itemData"
                 :rules="rules">
          <div class="popout">
            <el-row>
              <el-col :span="18">
                <el-form-item label="riseId"
                              prop="riseId">
                  <el-input v-model="itemData.riseId"
                            placeholder="请输入riseId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="真实姓名"
                              prop="nickName">
                  <el-input v-model="itemData.nickName"
                            placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="手机"
                              prop="phone">
                  <el-input v-model="itemData.phone"
                            placeholder="请输入手机"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="部门"
                              prop="department">
                  <el-select v-model="itemData.department"
                             placeholder="请选择公众号"
                             clearable
                             filterable>
                    <el-option v-for="item in department"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="职位"
                              prop="position">
                  <el-select v-model="itemData.position"
                             placeholder="请选择公众号"
                             clearable
                             filterable>
                    <el-option v-for="item in position"
                               :key="item.name"
                               :label="item.name"
                               :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item label="组长"
                            prop="leader">
                <el-select v-model="itemData.leader"
                           placeholder="请选择组长"
                           @change="handleSelect"
                           clearable
                           filterable
                           remote
                           reserve-keyword
                           :remote-method="getLeader">
                  <el-option v-for="item in leader"
                             :key="item.name"
                             :label="item.name"
                             :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
          </div>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleSubmit(false)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import apiDataFilter from '../../../../libraries/apiDataFilter';

export default {
  name: 'employee',
  data () {
    return {
      tableList: [{ riseId: '21e', nickName: 'dha', department: '技术部', wechatId: 'nidoas' }],
      pageIndex: 1,
      riseId: '',
      pageCount: null,
      dialogVisible: false,
      editVisible: false,
      nickName: '',
      id: '',
      phone: '',
      departmentId: '',
      positionId: '',
      leaderProfileId: '',
      department: [],
      position: [],
      leader: [],
      editLeader: '',
      itemData: {
        nickName: '',
        phone: '',
        department: '',
        position: '',
        leader: '',
        riseId: ''
      },
      rules: {
        riseId: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ]
        // department: [
        //   { required: true, message: '请选择项目', trigger: 'change' }
        // ],
        // position: [
        //   { required: true, message: '请输入手机', trigger: 'change' }
        // ],
        // leader: [
        //   { required: true, message: '请选择项目', trigger: 'change' }
        // ]
      }
    }
  },
  methods: {
    mapArr (val) {
      this.position = []
      this.department.map((item, index) => {
        if (item.name === val) {
          this.position = item.positions
          this.departmentId = item.id
        }
      })
      if (this.position.length === 0) {
        this.itemData.position = ''
      }
    },
    handleSelect (item) {
      console.log(item)
    },
    getList () {
      let param = { page: this.pageIndex };
      apiDataFilter.request({
        apiPath: 'advance.employee.list',
        data: param,
        successCallback: (res) => {
          let result = res.msg;
          this.tableList = result.content;
          this.pageCount = result.page.pageCount
        }
      })
    },
    get () {
      apiDataFilter.request({
        apiPath: 'advance.employee.get',
        successCallback: (res) => {
          let result = res.msg;
          this.department = result
        }
      })
    },
    getLeader (query) {
      let queryString = query || ''
      const name = { name: queryString }
      apiDataFilter.request({
        apiPath: 'advance.employee.leader',
        data: name,
        successCallback: (res) => {
          let result = res.msg;
          this.leader = result
        }
      })
    },
    delEmployee () {
      let param = { id: this.id };
      apiDataFilter.request({
        apiPath: 'advance.employee.del',
        data: param,
        method: 'post',
        successCallback: (res) => {
          this.$message.success('删除成功');
          this.getList()
        }
      })
    },
    handleEdit (index, row) {
      this.itemData = Object.assign(this.itemData, row)
      this.editVisible = true
      this.getLeader(this.itemData.leader)
    },
    handleDevice (index, row) {
      this.$confirm('此操作将离职员工, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDataFilter.request({
          apiPath: 'advance.employee.leave',
          data: { id: row.id },
          method: 'post',
          successCallback: (res) => {
            this.$message.success('离职成功');
            this.getList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    handleDelect (index, row) {
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
    handleSubmit (isAdd) {
      if (!this.itemData.nickName || !this.itemData.riseId || !this.itemData.phone || !this.departmentId || !this.positionId || !this.leaderProfileId) {
        this.$message.error('请填写完整信息');
        return
      }
      const itemData = this.itemData
      let param = {
        nickName: itemData.nickName,
        id: itemData.id,
        riseId: itemData.riseId,
        mobile: itemData.phone,
        departmentId: this.departmentId,
        positionId: this.positionId,
        leaderProfileId: this.leaderProfileId
      }
      apiDataFilter.request({
        apiPath: 'advance.employee.edit',
        method: 'post',
        data: param,
        successCallback: (res) => {
          this.$message.success('提交成功');
          if (isAdd) {
            this.dialogVisible = false;
          } else {
            this.editVisible = false;
          }
          this.getList()
        }
      })
    },
    currentChange (val) {
      this.pageIndex = val;
      this.getList();
    },
    handleNewAdd () {
      this.dialogVisible = true;
      this.riseId = '';
      this.nickName = '';
      this.itemData = {
        nickName: '',
        phone: '',
        department: '',
        position: '',
        leader: '',
        riseId: ''
      }
    },
    handleSearch () {
      let param = { page: this.pageIndex, riseId: this.riseId };
      apiDataFilter.request({
        apiPath: 'advance.employee.list',
        data: param,
        successCallback: (res) => {
          let result = res.msg;
          this.tableList = result.content;
          this.pageCount = result.page.pageCount
        }
      })
    }
  },
  created () {
    this.getList()
    this.get()
  },
  watch: {
    'itemData.department': {
      deep: true,
      handler: function (val) {
        this.mapArr(val)
      }
    },
    'itemData.position': {
      deep: true,
      handler: function (val) {
        this.position.map(item => {
          if (item.name === this.itemData.position) {
            this.positionId = item.id
          }
        })
      }
    },
    'itemData.leader': {
      deep: true,
      handler: function (val) {
        this.leader.map(item => {
          if (item.name === this.itemData.leader) {
            this.leaderProfileId = item.profileid
          }
        })
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "employee.less";
</style>
