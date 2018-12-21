<template>
  <div class="audio-course-container">
    <h3>音频课管理</h3>
   <div class="audio-course-top">

   </div>
   <div class="audio-course-content">
     <div class="add-box">
       <el-button type="primary" @click="handleAddNew">新增</el-button>
     </div>
     <!--table列表-->
     <el-table
       :data="courseList"
       style="width: 100%">
       <el-table-column
         type="index"
         label="序号"
         width="150">
         序号
       </el-table-column>
       <el-table-column
         prop="topic"
         label="标题"
         width="200">
       </el-table-column>
       <el-table-column
         prop="url"
         width="400"
         label="语音">
         <template slot-scope="scope">
           <div class="audio-box">
             <audio class="audio" controls :src="scope.row.url">
               您的浏览器不支持 audio 元素。
             </audio>
           </div>
         </template>
       </el-table-column>
       <el-table-column
         prop="descriptionString"
         label="描述">
         <template slot-scope="scope">
           <div class="question-box">
             <p class="content">{{scope.row.descriptionString}}</p>
           </div>
         </template>
       </el-table-column>
       <el-table-column width="150" fixed="right" label="操作">
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
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "audioCourse",
    data(){
      return{
        courseList:[],
      }
    },
    methods:{
      getList(){
        apiDataFilter.request({
          apiPath:'',
          successCallback:(res)=>{
            this.courseList = res.msg.list;
          }
        })
      },
      handleAddNew(){

      },
      handleEdit(index,row){

      },
    }
  }
</script>

<style scoped lang='less'>
    @import "audioCourse.less";
</style>
