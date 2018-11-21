<template>
  <div class="assist-upgrade-container">
    <h3>助教升降级</h3>
    <div class="assist-upgrade-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            昵称或学号或RiseId：
            <el-input v-model="name" placeholder="请输入昵称或学号或RiseId"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="assistUpgrade">清空</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="assist-upgrade-content">
      <!--table表格-->
      <el-table
        :data="assistList"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="助教级别">
        </el-table-column>
        <el-table-column
          prop="remainDay"
          label="倒计时天数">
        </el-table-column>
        <el-table-column
          prop="remainCount"
          label="剩余未完成">
        </el-table-column>
        <el-table-column
          prop="reached"
          label="是否达标">
        </el-table-column>
        <el-table-column
          prop="needVerified"
          label="是否需要升级认证">
        </el-table-column>
        <el-table-column
          prop="upGrade"
          label="升级认证结果">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
    </div>
    <el-dialog
      title="主要信息"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="60%">
      <div class="pop-out">
        <el-row>
          <el-col :span="8">
            <div class="grid-content">
              <img :src="headImageUrl" alt="">
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              昵称：{{nickName}}
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content">
              riseId：{{riseId}}
            </div>
          </el-col>
        </el-row>
        <el-select v-model="catalogId" placeholder="请选择">
          <el-option
            v-for="item in catalogList"
            :key="item.catalogId"
            :label="item.catalogName"
            :value="item.catalogId">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "assistUpgrade",
    data() {
      return {
        name: '',
        pageIndex: 1,
        pageCount: null,
        assistList: [],
        catalogList: [],
        catalogId: null,
        dialogVisible: false,
        headImageUrl: '',
        nickName: '',
        riseId: '',
        id: ''
      }
    },
    methods: {
      /*加载需要更新的教练*/
      assistUpgrade() {
        this.riseId = '';
        let param = {page: this.pageIndex};
        apiDataFilter.request({
          apiPath: 'course.assistUpgrade.load',
          data: param,
          successCallback: (res) => {
            this.assistList = res.msg;
          }
        })
      },
      /*根据NickName加载非教练*/
      loadUnAssistByNickName() {
        apiDataFilter.request({
          apiPath: 'course.assistUpgrade.unassist',
          pathParams: [this.name],
          successCallback: (res) => {
            this.assistList = res.msg;
          }
        })
      },
      //加载教练类别
      loadAssistCatalogs() {
        apiDataFilter.request({
          apiPath: 'course.assistUpgrade.catalog',
          successCallback: (res) => {
            this.catalogList = res.msg;
          }
        })
      },
      search() {
        this.loadUnAssistByNickName();
      },
      handleEdit(index, row) {
        this.dialogVisible = true;
        this.riseId = row.riseId;
        this.nickName = row.nickName;
        this.headImageUrl = row.headImageUrl;
        this.catalogId = row.roleId;
        this.id = row.id
      },
      handleAdd() {
        if (!this.catalogId) {
          this.$message.error('请选择角色')
          return
        }
        apiDataFilter.request({
          apiPath: 'course.assistUpgrade.add',
          pathParams: [this.riseId, this.catalogId],
          successCallback: () => {
            this.$message.success('新增成功');
            this.dialogVisible = false;
            this.loadUnAssistByNickName()
          }
        })
      },
      updateAssistCatalog() {
        let param = {riseId: this.riseId, assist: this.id, catalog: this.catalogId};
        apiDataFilter.request({
          apiPath: 'course.assistUpgrade.update',
          data: param,
          successCallback: () => {
            this.$message.success('提交成功');
            this.dialogVisible = false;
            this.assistUpgrade();
          }
        })
      },
      currentChange(val) {
        this.pageIndex = val
      },
      update() {
         if (this.name){
           this.handleAdd()
         } else {
           this.updateAssistCatalog()
         }
      }
    },
    created() {
      this.assistUpgrade();
      this.loadAssistCatalogs()
    }
  }
</script>

<style scoped lang='less'>
  @import "assistUpgrade.less";
</style>
