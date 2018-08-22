<template>
   <div class="topic-container">
     <h3>话题管理</h3>
     <div class="topic-top">
       <el-row>
         <el-col :span="6">
           <el-input v-model="input" placeholder="请输入话题名称"></el-input>
         </el-col>
         <el-col :span="6">
           <el-select v-model="value" placeholder="请选择发布状态">
             <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <el-select v-model="value" placeholder="请选择社群">
             <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <el-select v-model="value" placeholder="请选择微信群">
             <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
           </el-select>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="12">
           <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
         </el-col>
         <el-col :span="12">
           <el-button type="primary">搜索</el-button>
           <el-button type="primary">清空</el-button>
         </el-col>
       </el-row>
     </div>
     <div class="topic-content">
       <el-button type="primary">新增</el-button>
       <!--table表格-->
       <el-table
         :data="groupList"
         style="width: 100%">
         <el-table-column
           prop="groupName"
           label="话题名称">
         </el-table-column>
         <el-table-column
           prop="ownerNickname"
           label="所属社群">
         </el-table-column>
         <el-table-column
           prop="communityName"
           label="话题详情">
           <template slot-scope="scope">
             <div class="pic-code">
               <img v-if="scope.row.ownerCode" :src="scope.row.ownerCode" alt="二维码">
             </div>
           </template>
         </el-table-column>
         <el-table-column
           prop="groupMemberCount"
           label="话题日期">
         </el-table-column>
         <el-table-column
           prop="ownerCode"
           width="200"
           label="话题状态">
         </el-table-column>
         <el-table-column width="200" fixed="right" label="操作">
           <template slot-scope="scope">
             <el-button
               size="mini"
               @click="handleEdit(scope.$index, scope.row)">编辑
             </el-button>
             <el-button
             v-if="scope.row.communityId !==null"
             size="mini"
             @click="handleDelete(scope.$index, scope.row)">详情
           </el-button>
             <el-button
               v-if="scope.row.communityId !==null"
               size="mini"
               @click="handleDelete(scope.$index, scope.row)">发布
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
        name: "topic",
        data() {
            return {}
        },
        methods: {},
        created() {

        }
    }
</script>

<style scoped lang='less'>
    @import "topic.less";
</style>
