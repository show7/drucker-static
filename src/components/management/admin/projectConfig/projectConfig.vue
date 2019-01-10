<template>
  <div class="project-config-container">
    <h3>项目配置</h3>
    <!--头部选择-->
    <div class="project-config-top">
      <h4>项目</h4>
      <el-select v-model="projectValue" placeholder="请选择项目" @change="handleSelectChange">
        <el-option
          v-for="item in projectList"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="add">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!--table表格-->
    <div class="project-config-content">
      <el-table
        :data="resultList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="key"
          label="Key">
        </el-table-column>
        <el-table-column
          prop="value"
          label="Value">
          <template slot-scope="scope">
            <div class="question-box">
              <p class="content">
                {{scope.row.value}}
              </p>
            </div>

          </template>
        </el-table-column>
        <el-table-column
          prop="desc"
          label="配置说明">
        </el-table-column>

        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleDelect(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹框-->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      :show-close='false'
      width="30%">
      <div class="pop-box">
        <el-row>
          <el-col :span="4"><p class="key">key</p></el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="2"
              :disabled="disabled"
              placeholder="请输入内容"
              v-model="key">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><p class="key">value</p></el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="value">
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4"><p class="key">配置说明</p></el-col>
          <el-col :span="20">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="desc">
            </el-input>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="handleCheckData">确 定</el-button>
         </span>
    </el-dialog>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "projectConfig",
    data() {
      return {
        projectList: [
          {value: 'rise', name: 'RISE'},
          {value: 'course', name: '训练营'},
          {value: 'job', name: 'JOB'},
          {value: 'arch', name: '架构'},
          {value: 'front', name: '前端资源'},
          {value: 'kotler', name: '营销平台'},
        ],
        projectValue: 'rise',
        resultList: [],
        dialogVisible: false,
        title: '新增',
        key: '',
        value: '',
        desc: '',
        disabled: false
      }
    },
    methods: {
      getConfig() {
        apiDataFilter.request({
          apiPath: 'admin.projectConfig.config',
          method: 'get',
          pathParams: [this.projectValue],
          successCallback: (res) => {
            this.resultList = res.msg
          }
        })
      },
      /*新增和编辑提交*/
      updateData() {
        let param = {key: this.key, value: this.value, desc: this.desc, projectId: this.projectValue}
        let api = this.title == '新增' ? 'admin.projectConfig.add' : 'admin.projectConfig.update';
        apiDataFilter.request({
          apiPath: api,
          method: 'post',
          data: param,
          successCallback: (res) => {
            this.$message.success('提交成功');
            this.dialogVisible = false;
            this.getConfig();
          }
        })
      },
      /*删除*/
      handleDelectPost(item) {
        apiDataFilter.request({
          apiPath: 'admin.projectConfig.delete',
          method: 'post',
          data:item,
          successCallback:()=>{
             this.$message.success('删除成功');
             this.getConfig();
          }
        })
      },
      handleCheckData() {
        if (!this.key || !this.value || !this.desc) {
          this.$message.error('请填写完整的数据！');
          return
        } else {
          this.updateData();
        }
      },
      /*编辑弹框*/
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.title = '编辑';
        this.desc = row.desc;
        this.key = row.key;
        this.value = row.value;
        this.disabled = true;
      },
      /*新增*/
      handleAdd() {
        this.dialogVisible = true;
        this.title = '新增';
        this.desc = '';
        this.key = '';
        this.value = '';
        this.disabled = false;
      },
      handleSelectChange() {
        this.getConfig();
      },
      /*删除按钮*/
      handleDelect(index,row) {
        let item = {
          desc: row.desc,
          display: false,
          key: row.key,
          projectId: this.projectValue,
          value: row.value,
        };
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelectPost(item);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.getConfig();
    }
  }
</script>

<style scoped lang='less'>
  @import "projectConfig.less";
</style>
