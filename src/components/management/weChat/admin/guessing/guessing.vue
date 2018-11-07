<template>
  <div class="guessing-container">
    <h3>竞猜管理</h3>
    <div class="guessing-top">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            活动状态：
            <el-select v-model="statusId" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">

          </div>
        </el-col>
      </el-row>
    </div>
    <div class="guessing-content">
      <div class="new-add">
        <el-button type="primary" @click="handleAdd">新增竞猜</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="activityList"
        style="width: 100%">
        <el-table-column
          prop="question"
          label="竞猜题目">
        </el-table-column>
        <el-table-column
          prop="answerA"
          label="答案A">
        </el-table-column>
        <el-table-column
          prop="answerB"
          label="答案B">
        </el-table-column>
        <el-table-column
          prop="leftNum"
          label="剩余数">
        </el-table-column>
        <el-table-column
          prop="coinPrice"
          label="礼金定价">
        </el-table-column>
        <el-table-column
          prop="publishStatusStying"
          label="上架状态">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnlook(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
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
    name: "guessing",
    data(){
      return{
        statusList:[{id:0,name:'全部'},{id:1,name:'进行中'},{id:2,name:'已开奖'}],
        statusId:0,
        activityList:[
          {
            question:''
          }
        ]
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "guessing.less";
</style>
