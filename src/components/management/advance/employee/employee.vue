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
            <el-button size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                       @click="handleDevice(scope.$index, scope.row)">离职</el-button>
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
                <el-form-item label="真实姓名"
                              prop="nickName">
                  <el-input v-model="itemData.nickName"
                            placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                手机
              </el-col>
              <el-col :span="18">
                <el-input v-model="itemData.phone"
                          placeholder="请输入手机"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                部门
              </el-col>
              <el-col :span="18">
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
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                职位
              </el-col>
              <el-col :span="18">
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
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                组长
              </el-col>
              <el-col :span="18">
                <el-input v-model="leader"
                          placeholder="请输入组长"></el-input>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加员工"
                 :visible.sync="editVisible"
                 :close-on-click-modal="false"
                 width="30%">
        <div class="popout">
          <el-row>
            <el-col :span="6">
              真实姓名
            </el-col>
            <el-col :span="18">
              <el-input v-model="itemData.nickName"
                        placeholder="请输入真实姓名"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              手机
            </el-col>
            <el-col :span="18">
              <el-input v-model="itemData.phone"
                        placeholder="请输入手机"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              部门
            </el-col>
            <el-col :span="18">
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
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              职位
            </el-col>
            <el-col :span="18">
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
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              组长
            </el-col>
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
          </el-row>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="handleSubmit">确 定</el-button>
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
      department: [],
      position: [],
      leader: [],
      editLeader: '',
      itemData: {
        nickName: '',
        phone: '',
        department: '',
        position: '',
        leader: ''
      },
      rules: {
        nickName: [
          { required: true, message: '请选择项目', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请选择期数', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请选择班主任', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择班号', trigger: 'change' }
        ],
        leader: [
          { required: true, message: '请选择班号', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    mapArr (val) {
      this.department.map((item, index) => {
        if (item.name === val) {
          this.position = item.positions
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
    handleDevice () {

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
    handleSubmit () {
      if (!this.nickName || !this.riseId) {
        this.$message.error('请填写完整信息');
        return
      }
      let param = { riseId: this.riseId, nickName: this.nickName };
      apiDataFilter.request({
        apiPath: 'advance.employee.add',
        method: 'post',
        data: param,
        successCallback: (res) => {
          this.$message.success('提交成功');
          this.dialogVisible = false;
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
        leader: ''
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
    }
  }
}
</script>

<style scoped lang='less'>
@import "employee.less";
</style>
