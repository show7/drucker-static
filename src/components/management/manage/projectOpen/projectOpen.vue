<template>
     <div class="project-open-container">
        <h3>项目开课时间</h3>
       <div class="project-open-content">
         <div class="add-box">
           <el-button type="success" @click="handleAdd">新增</el-button>
         </div>
         <div class="table-box">
           <el-table
             :data="configsList"
             style="width: 100%">
             <el-table-column prop="memberTypeName" label="项目"></el-table-column>
             <el-table-column prop="openDate" label="开课时间"></el-table-column>
             <el-table-column prop="closeDate" label="结课时间"></el-table-column>
             <el-table-column prop="activeDate" label="生效日期"></el-table-column>
             <el-table-column prop="expiredDate" label="数据过期日期"></el-table-column>
             <el-table-column prop="sellingMonth" label="开课月份"></el-table-column>
             <el-table-column prop="sellingYear" label="开课年份"></el-table-column>

             <el-table-column width="200" fixed="right" label="操作">
               <template slot-scope="scope">
                 <el-button
                   size="mini"
                   @click="handleEdit(scope.$index, scope.row)">编辑
                 </el-button>
               </template>
             </el-table-column>
           </el-table>
         </div>
       </div>

       <el-dialog
         :title="title"
         :close-on-click-modal="false"
         :show-close="false"
         :visible.sync="dialogVisible"
         width="60%">
         <div class="pop-box">
           <el-row>
             <el-col :span="12">
               <div class="grid-content">
                <span>项目:</span>
                 <el-select v-model="memberTypeId" :disabled="disabled" placeholder="请选择会员类型">
                   <el-option
                     v-for="item in memberTypeIdList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
               </div>
             </el-col>
             <el-col :span="12">
               <div class="grid-content">
           <!--     <span>项目Id: </span>
                 <el-input v-model="memberTypeId" :disabled="disabled" placeholder="请输入项目Id"></el-input>-->
               </div>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <div class="grid-content">
                 <span>开课时间：</span>
                 <el-date-picker
                   v-model="openDate"
                   value-format="yyyy-MM-dd"
                   type="date"
                   placeholder="选择开课时间">
                 </el-date-picker>
               </div>
             </el-col>
             <el-col :span="12">
               <div class="grid-content">
                 <span>结课时间：</span>
                 <el-date-picker
                   v-model="closeDate"
                   value-format="yyyy-MM-dd"
                   type="date"
                   placeholder="选择开课时间">
                 </el-date-picker>
               </div>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <div class="grid-content">
                 <span>生效日期： </span>
                 <el-date-picker
                   v-model="activeDate"
                   value-format="yyyy-MM-dd"
                   type="date"
                   placeholder="选择开课时间">
                 </el-date-picker>
               </div>
             </el-col>
             <el-col :span="12">
               <div class="grid-content">
                 <span>数据过期日期：</span>
                 <el-date-picker
                   v-model="expiredDate"
                   value-format="yyyy-MM-dd"
                   type="date"
                   placeholder="选择开课时间">
                 </el-date-picker>
               </div>
             </el-col>
           </el-row>
           <el-row>
             <el-col :span="12">
               <div class="grid-content">
                 <span>开课月份： </span>
                 <el-select v-model="sellingMonth" placeholder="请选择月份">
                   <el-option
                     v-for="item in sellingMonthList"
                     :key="item"
                     :label="item"
                     :value="item">
                   </el-option>
                 </el-select>
               </div>
             </el-col>
             <el-col :span="12">
               <div class="grid-content">
                 <span>开课年份：</span>
                 <el-select v-model="sellingYear" placeholder="请选择年份">
                   <el-option
                     v-for="item in sellingYearList"
                     :key="item"
                     :label="item"
                     :value="item">
                   </el-option>
                 </el-select>
               </div>
             </el-col>
           </el-row>
         </div>
         <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary" @click="handleCheck">确 定</el-button>
         </span>
       </el-dialog>
     </div>
</template>

<script>
  import apiDataFilter from "../../../../libraries/apiDataFilter";

  export default {
    name: "projectOpen",
    data(){
      return{
        configsList:[],
        dialogVisible:false,
        title:'',
        memberTypeName:'',
        memberTypeId:'',
        openDate:'',
        closeDate:'',
        expiredDate:'',
        activeDate:'',
        sellingMonthList:[],
        sellingMonth:'',
        sellingYearList:[],
        sellingYear:'',
        disabled:false,
        memberTypeIdList:[],
        id:''
      }
    },
    methods:{
      /*项目*/
      loadRiseMember () {
        apiDataFilter.request({
          apiPath: 'manage.addVip.loadRiseMember',
          successCallback :(res)=> {
            this.memberTypeIdList = res.msg
          }
        })
      },
      loadData(){
        apiDataFilter.request({
          apiPath:'manage.projectOpen.configs',
          successCallback:(res)=>{
            this.configsList = res.msg
          }
        })
      },
      handleEdit(index,row){
        this.title = '编辑';
        this.dialogVisible = true;
        this.disabled = true;
        this.memberTypeId = row.memberTypeId;
        this.openDate = row.openDate;
        this.closeDate = row.closeDate;
        this.expiredDate = row.expiredDate;
        this.activeDate = row.activeDate;
        this.sellingMonth = row.sellingMonth;
        this.sellingYear = row.sellingYear;
        this.id=row.id
      },
      handleAdd(){
        this.title = '新增';
        this.dialogVisible = true;
        this.disabled = false;
        this.memberTypeId ='';
        this.openDate = '';
        this.closeDate = '';
        this.expiredDate = '';
        this.activeDate = '';
        this.sellingMonth = '';
        this.sellingYear = '';
        this.id=''
      },
      /*处理月份*/
      handleDealMonth(){
        this.sellingMonthList = [];
        for (let i = 1 ;i < 13;i++ ){
          this.sellingMonthList.push(i)
        }
      },
      /*处理你那份*/
      handleDealYear(){
        this.sellingYearList = [];
        for (let i = 2018;i < 2025; i++ ){
          this.sellingYearList.push(i)
        }
      },
      /*数据完整性*/
      handleCheck(){
        if (!this.memberTypeId || !this.openDate || !this.closeDate  || ! this.sellingMonth || !this.sellingYear) {
          this.$message.error('请完善信息')
        }else {
          this.handleSubmit();
        }
      },
      /*提交*/
      handleSubmit(){
        let param = {
          memberTypeId:this.memberTypeId,expiredDate:this.expiredDate,activeDate:this.activeDate,
          openDate:this.openDate,closeDate:this.closeDate,sellingMonth:this.sellingMonth,sellingYear:this.sellingYear
        };
        this.id ? Object.assign(param,{id:this.id}):'';
        apiDataFilter.request({
          apiPath:'manage.projectOpen.upconfig',
          method:'post',
          data:param,
          successCallback:(res)=>{
             this.$message.success('提交成功');
            this.dialogVisible =false;
             this.loadData();
          }
        })
      }
    },
    created(){
      this.loadData();
      this.handleDealYear();
      this.handleDealMonth();
      this.loadRiseMember();
    }
  }
</script>

<style scoped lang='less'>
    @import "projectOpen.less";
</style>
