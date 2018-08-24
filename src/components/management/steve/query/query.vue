<template>
  <div class="query">
    <!-- 查询请求入参 -->
    <h3>数据查询</h3>
    <div class="query-top">
      <el-row>
        <el-col :span="6">
          <h4>任务名</h4>
          <el-input placeholder="请输入任务名" v-model="name" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <h4>邮箱</h4>
          <el-input placeholder="请输入邮箱" v-model="email" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <h4>备注</h4>
          <el-input placeholder="请输入备注" v-model="remark" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <h4><span>*</span>数据库</h4>
          <el-radio v-model="database" label="1">备份</el-radio>
          <el-radio v-model="database" label="2">线上</el-radio>
        </el-col>
      </el-row>
    </div>
    <!-- 查询请求入参 -->
    <div class="content">
      <el-row>
        <h4>查询sql</h4>
        <el-input type="textarea" placeholder="请输入查询SQL" :row="4" v-model="sql"></el-input>
        <el-row>
          <el-col :span="5" class="buttons">
            <br/>
            <br/>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleClickError">报错</el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-table
        :data="queryResult"
        style="width: 100%">
        <el-table-column
          :key="col"
          v-for="col in queryCols"
          :prop="col"
          width="150"
          :label="col">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'

export default {
  name: 'query',
  data () {
    return {
      email: null, // 邮箱
      name: null, // 任务
      remark: null, // 备注
      database: '1', // 数据库，默认冷备
      sql: null, // sql
      queryResult: [], // 查询结果
      queryCols: [] // 结果列
    }
  },
  methods: {
    /* 查询 */
    handleSearch () {
      let self = this;
      ApiDataFilter.request({
        apiPath: 'steve.query',
        method: 'post',
        data: {
          sql: this.sql,
          email: this.email,
          name: this.name,
          remark: this.remark,
          database: this.database
        },
        successCallback (res) {
          let queryResult = res.msg;
          if (queryResult.length > 0) {
            let queryCols = []
            for (let col in queryResult[ 0 ]) {
              queryCols.push(col);
            }
            self.queryCols = queryCols;
            self.queryResult = queryResult;
          }
        }
      })
    },
    handleClickError(){
      console.log(a);
    }
  },
  created () {
  },
}
</script>

<style scoped lang="less">
  @import "./query.less";
</style>
