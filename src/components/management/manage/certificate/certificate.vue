
<template>
   <div class="certificate">
     <h3>添加证书</h3>
     <div class="certificate-select">
       <el-row>
         <el-col :span="6">
           <h4>证书年份</h4>
           <el-select v-model="certificateYear" placeholder="请选择证书年份">
             <el-option
               v-for="item in certificateYearList"
               :key="item"
               :label="item"
               :value="item">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>证书月份</h4>
           <el-select v-model="certificateMonth" placeholder="请选择证书月份">
             <el-option
               v-for="item in certificateMonthList"
               :key="item"
               :label="item+'月'"
               :value="item">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>学习项目</h4>
           <el-select v-model="certificateProject" placeholder="请选择生成学习项目">
             <el-option
               v-for="item in learnList"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>身份类型</h4>
           <el-select v-model="certificateIdentity" placeholder="请选择身份类型">
             <el-option
               v-for="item in certificateIdentityList"
               :key="item.is"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="6" v-if="certificateIdentity == 4 ">
           <h4>输入小组号例如 2</h4>
           <el-input type="text" placeholder="学组号" v-model="groupNo"></el-input>
         </el-col>
         <el-col :span="6">
           <h4>选择课程</h4>
           <el-select v-model="courseTitleValue" placeholder="请选择课程">
             <el-option
               v-for="item in courseTitleList"
               :key="item.id"
               :label="item.abbreviation"
               :value="item.id">
             </el-option>
           </el-select>
         </el-col>
         <el-col :span="6">
           <h4>选择学员查找方式</h4>
           <el-select v-model="profileSearchTypeId" placeholder="请选择课程">
             <el-option
               v-for="item in ProfileSearchType"
               :key="item.id"
               :label="item.name"
               :value="item.id">
             </el-option>
           </el-select>
         </el-col>
          <el-col :span="6">
            <h4>模版</h4>
            <el-select v-model="masterplateId" placeholder="请选择模版">
              <el-option
                v-for="item in templateList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
       <el-row>
         <el-col :span="12">
           <el-input
             type="textarea"
             :placeholder="profileSearchTypeId == 1 ? '请输入学号，换行区分':'请输入圈外 id，换行区分'"
             v-model="textareaValue">
           </el-input>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="6">
           <div class="button-submit">
             <el-button type="primary" plain  @click="dialogVisible = true">点击提交</el-button>
           </div>
         </el-col>
       </el-row>
     </div>

     <el-dialog
       :visible.sync="dialogVisible"
       width="30%"
       :show-close="false">
       <span>您将要添加{{certificateYear}} 年{{certificateMonth}} 月的证书，请确认</span>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleSendData">确 定</el-button>
       </span>
     </el-dialog>
   </div>
</template>

<script>
import ApiDataFilter from '@/libraries/apiDataFilter'
export default {
  name: 'certificate',
  data () {
    return {
      certificateYear: '', // 请选择证书年份
      certificateYearList: [], //证书年份list
      certificateMonth: '', // 请选择证书月份
      certificateMonthList: [], // 月份list
      certificateProject: '', //请选择生成学习项目
      certificateProjectList: [{id: 3, name: '核心能力项目'}, {id: 12, name: 'L1项目'}, {id: 10, name: 'L2项目'}, {id: 8, name: 'L3项目'}], //项目list
      certificateIdentity: '', //请选择身份类型
      masterplateId: '', // 模版类型
      certificateIdentityList: [
        {id: 1, name: '优秀班长'},
        {id: 2, name: '优秀组长'},
        {id: 3, name: '优秀学员'},
        {id: 4, name: '优秀团队'},
        {id: 5, name: '优秀结课'},
        {id: 6, name: '优秀教练'},
        {id: 7, name: '优秀班委'},
        {id: 8, name: '毕业证书'},
        {id: 9, name: '项目证书'}
      ],
      textareaValue: '',
      dialogVisible: false,
      courseTitleList:[],
      courseTitleValue:'',
      ProfileSearchType:[{id:1,name:'学号'},{id:2,name:'圈外 id'}],
      profileSearchTypeId:1,
      groupNo:'',
      // 学习项目的列表
      learnList: [],
      // 模版列表
      templateList: []
    }
  },

  mounted () {
    this.getLearnList()
    this.getTemplateList()
  },

  methods: {
    // 获取课程名称列表
    getData () {
      ApiDataFilter.request({
        apiPath: 'common.simple',
        successCallback :(res)=> {
          this.courseTitleList = res.msg;
        }
      });
    },
    getYearList () {
      let date = new Date();
      let year = date.getFullYear() - 2;
      for (let i = 0; i < 3; i++) {
        year += 1;
        this.certificateYearList.push(year);
      }
      for (let i = 1; i < 13; i++) {
        let month = i;
        this.certificateMonthList.push(month);
      }
    },

    /**
     * 获取学习项目的列表
     */
    getLearnList () {
      ApiDataFilter.request({
        apiPath: 'manage.certificateSend.learnList',
        successCallback :(res)=> {
          const { msg } = res
          this.learnList = msg
        }
      });
    },

    /**
     * 获取模版列表
     */
    getTemplateList () {
      ApiDataFilter.request({
        apiPath: 'manage.certificateSend.templateList',
        successCallback :(res)=> {
          const { msg } = res
          this.templateList = msg
        }
      });
    },

    handleSendData () {
      let memberIds = this.textareaValue.split('\n');
      let self = this;
      if (this.certificateYear && this.certificateMonth && this.certificateProject &&  (this.textareaValue.length > 0) && this.certificateIdentity && this.courseTitleValue) {
        if (this.certificateIdentity == 4 && !this.groupNo){
          this.$message.error('请填写组号');
          return
        }
        let param = { year: this.certificateYear, month: this.certificateMonth, type: this.certificateIdentity,
          memberTypeId: this.certificateProject, problemId:this.courseTitleValue,
          profileSearchType: this.profileSearchTypeId,
          masterplateId: this.masterplateId};
        this.profileSearchTypeId == 1 ? Object.assign(param,{memberIds: memberIds}):Object.assign(param,{riseIds: memberIds})
        this.certificateIdentity == 4 ?  Object.assign(param,{groupNo: this.groupNo}):''
        ApiDataFilter.request({
          apiPath: 'manage.certificate',
          method: 'post',
          data: param,
          successCallback (res) {
            self.dialogVisible = false;
            self.$message.success('恭喜你，提交成功');
          }
        })
      } else {
        this.$message.error('请完善信息');
      }
    }
  },
  created () {
    this.getYearList();
    this.getData();
  }
}
</script>

<style scoped lang="less">
@import "./certificate.less";
</style>
