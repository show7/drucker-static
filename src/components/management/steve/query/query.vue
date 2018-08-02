<template>
  <div class="query">
    <h3>数据查询</h3>
    <div class="content">
      <el-row>
        <h4>查询sql</h4>
        <el-input type="textarea" placeholder="请输入查询SQL" :row="4" v-model="sql"></el-input>
        <el-row>
          <el-col :span="5" class="buttons">
            <br/>
            <br/>
            <el-button type="primary" @click="handleSearch">查询</el-button>
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
    data() {
      return {
        sql: '',
        queryResult: [],
        queryCols: []
      }
    },
    methods: {
      handleSearch() {
        console.log(this.sql);
        let self = this;
        ApiDataFilter.request({
          apiPath: 'steve.query',
          method: 'post',
          data: { sql: this.sql },
          successCallback(res) {
            let queryResult = res.msg;
            if(queryResult.length > 0) {
              let queryCols = []
              for(let col in queryResult[ 0 ]) {
                queryCols.push(col);
              }
              self.queryCols = queryCols;
              self.queryResult = queryResult;
            }
          }
        })
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  @import "./query.less";
</style>
