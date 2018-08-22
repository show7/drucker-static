<template>
  <div class="statistics-container">
    <h3>社群数据</h3>
    <!--头部搜索展示-->
    <div class="statistics-top">
      <el-row>
        <el-col :span="8">
          <el-select v-model="latesValue" placeholder="请选择近期统计">
            <el-option v-for="item in latesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="value" placeholder="请选择社群">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select v-model="value" placeholder="请选择微信群">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">日发言数</p>
            <p class="score">32432</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">日活跃人数</p>
            <p class="score">32432</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">话题讨论数</p>
            <p class="score">32432</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="data-box">
            <p class="name">讨论人数</p>
            <p class="score">32432</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-content">
      <div class="name-add-box">
        <el-row>
          <el-col :span="12"><p class="name">用户礼金值</p></el-col>
          <el-col :span="12" class="select">
            <el-select v-model="latesValue" placeholder="请选择近期统计">
            <el-option v-for="item in latesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          </el-col>
        </el-row>
        <!--table表格-->
        <el-table
          :data="communityList"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="排序">
          </el-table-column>
          <el-table-column
            prop="groupCount"
            label="用户昵称">
          </el-table-column>
          <el-table-column
            prop="description"
            width="400"
            label="礼金值">
          </el-table-column>
          <el-table-column width="200" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleLook(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="page"
            @current-change="currentChange"
            :page-count="pageCount">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "statistics",
    data() {
      return {
        latesList:[{id:1,name:'今日'},{id:2,name:'最近七日'},{id:3,name:'最近30日'}],
        latesValue: 1,//近期统计选取值
      }
    },
    methods: {},
    created() {

    }
  }
</script>

<style scoped lang='less'>
  @import "statistics.less";
</style>
