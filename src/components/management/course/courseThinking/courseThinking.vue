<template>
 <div class="course-thinking-container">
   <h3>课前思考</h3>
   <div class="thinking-top">
     <el-button type="primary">新增</el-button>
   </div>
   <div class="thinking-content">
     <el-table
       :data="tableData"
       style="width: 100%">
       <el-table-column
         prop="date"
         label="序号"
         width="180">
       </el-table-column>
       <el-table-column
         prop="name"
         label="课程"
         width="180">
       </el-table-column>
       <el-table-column
         prop="address"
         label="章节">
       </el-table-column>
       <el-table-column
         prop="address"
         label="小节">
       </el-table-column>
       <el-table-column
         prop="address"
         label="课前思考内容">
       </el-table-column>
       <el-table-column width="300" fixed="right" label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
         </template>
       </el-table-column>
     </el-table>
   </div>
 </div>
</template>

<script>
    export default {
        name: "courseThinking",
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped lang='less'>
 @import "courseThinking.less";
</style>
