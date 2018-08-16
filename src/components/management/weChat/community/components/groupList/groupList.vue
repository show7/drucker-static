<template>
  <div class="group-list-container">
    <div class="group-list-top">
      <el-row>
        <el-col :span="8">
          <el-select v-model="value" placeholder="请选择社群">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入微信群名称"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">清空</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="group-list-content">
      <div class="add-box">
        <el-button type="primary">添加微信群</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="groupList"
        style="width: 100%">
        <el-table-column
          prop="nickname"
          width="150"
          label="群名">
        </el-table-column>
        <el-table-column
          prop="labelCategory"
          label="群主">
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="所属社群">
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="群成员数">
        </el-table-column>
        <el-table-column
          prop="labelName"
          width="200"
          label="群主二维码">
          <template slot-scope="scope">
            <div class="pic-code">
              <img :src="scope.row.labelCategory" alt="二维码">
            </div>
          </template>
        </el-table-column>
        <el-table-column width="300" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleOnlook(scope.$index, scope.row)">删除
            </el-button>
            <el-button
              v-if="scope.row.publishStatus != 1"
              size="mini"
              @click="groupPublish([scope.row.esChatId])">发布
            </el-button>
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
    </div>
  </div>
</template>

<script>
    export default {
        name: "groupList",
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped lang='less'>
    @import "groupList.less";
</style>
