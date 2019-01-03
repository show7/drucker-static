<template>
  <div class="wechat-menu-container">
    <h3>公众号菜单管理</h3>
    <div class="wechat-menu-top">
      公众号：
      <WeChat @getServiceId="handleGet"></WeChat>
    </div>
    <div class="wechat-menu-content">
      <div class="add-box">
        <el-button type="primary" :disabled="buttonList.length == 3" @click="handleAdd">新增</el-button>
      </div>
      <el-table
        :data="buttonList"
        style="width: 100%">
        <el-table-column prop="name" label="菜单名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="sequence" label="顺序"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="last-submit">
        <span class="attention">注意：请按需要修改全部后，做最终一次提交</span>
        <el-button type="primary" @click="confirmButton">提交</el-button>
      </div>
    </div>

    <el-dialog :title="title" :visible.sync="outerVisible" :show-close="false" :close-on-click-modal="false">
      <div class="parent-box">
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              标题：
              <el-input v-model="singleButton.name" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              顺序：
              <el-select v-model="singleButton.sequence" placeholder="请选择">
                <el-option v-for="item in sequenceList" :key="item" :label="item"
                           :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              类型：
              <el-radio-group v-model="singleButton.type" @change="handleChangeRadio">
                <el-radio label="text">text</el-radio>
                <el-radio label="pic">pic</el-radio>
                <el-radio label="view">view</el-radio>
                <el-radio label="parent">parent</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content type-content">
              <el-input v-if="singleButton.type== 'text'" type="textarea" :rows="4" placeholder="请输入内容" v-model="singleButton.value"></el-input>
              <el-input v-if="singleButton.type== 'view'" v-model="singleButton.value" placeholder="请输入url"></el-input>
              <div class="lang-url" v-if="singleButton.type=='pic'">
                <el-upload
                  class="upload-demo"
                  :action='langUrl+"&serviceId="+serviceId'
                  :limit="1"
                  :on-success="sendLongPicSuccess"
                  :on-exceed="handleExceed"
                  :file-list="longFileList">
                  <el-button size="small" type="primary">上传永久素材</el-button>
                </el-upload>
              </div>
              <el-button v-if="singleButton.type=='parent'" type="primary" @click="handleEditChildren">编辑子菜单</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelKeep">取 消</el-button>
        <el-button type="primary" @click="handleKeepData">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog width="40%" title="子菜单" :visible.sync="innerVisible" :show-close="false" :close-on-click-modal="false">
      <div class="children-box" v-for="(item,index) in singleButton.sub_button" :key="index">
        <el-row>
          <el-col :span="10">
            <div class="grid-content">
              标题：
              <el-input v-model="item.name" placeholder="请输入内容"></el-input>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content">
              顺序：
              <el-select v-model="item.sequence" placeholder="请选择">
                <el-option v-for="item in sub_buttonSequenceList" :key="item" :label="item"
                           :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDeleteSingleChildren(item.index)"></el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
              类型：
              <el-radio-group v-model="item.type">
                <el-radio label="text">text</el-radio>
                <el-radio label="view">view</el-radio>
                <el-radio label="pic">pic</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content type-content">
              <el-input v-if="item.type== 'text'" type="textarea" :rows="4" placeholder="请输入内容" v-model="item.value"></el-input>
              <el-input v-if="item.type== 'view'" v-model="item.value" placeholder="请输入url"></el-input>
              <div class="lang-url" v-if="item.type=='pic'">
                <el-upload
                  class="upload-demo"
                  :action='langUrl+"&serviceId="+serviceId'
                  :limit="1"
                  :on-success="sendChildrenPicSuccess"
                  :on-exceed="handleExceed"
                  :file-list="longFileList">
                  <el-button size="small" type="primary" @click="handleUp(index)">上传永久素材</el-button>
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-button type="primary" @click="handleAddSingleChildren">增加子菜单</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancelSingleChildren">取 消</el-button>
        <el-button type="primary" @click="handleSaveChildren">保存</el-button>
      </div>
    </el-dialog>
    {{JSON.stringify(buttonList)}}
  </div>
</template>

<script>

  import weChat from '../../../common/weChat/weChat'
  import apiDataFilter from "../../../../libraries/apiDataFilter";
  import lodash from 'lodash'

  export default {
    name: "weChatMenu",
    components: {WeChat: weChat},
    data() {
      return {
        serviceId: null,
        buttonList: [],
        keepButtonList:[],
        title: '新增',
        outerVisible: false,
        innerVisible: false,
        longFileList: [],
        langUrl: '/wx/file/upload/image/?tmp=0&remark=',
        sequenceList: [],
        sub_buttonSequenceList:[],
        keepOldData:null,
        editDataIndex:null,
        childrenPosition:null,
        singleButton: {
          name: '',
          value: '',
          type: '',
          sequence: '',
          sub_button:[
            {
              name: '',
              value: '',
              type: '',
              sequence: '',
            }
          ],
        }
      }
    },
    methods: {
      handleGet(id) {
        this.serviceId = id;
        this.getMenu();
      },
      getMenu() {
        apiDataFilter.request({
          apiPath: 'admin.weChatMenu.menu',
          pathParams: [this.serviceId],
          successCallback: (res) => {
            this.buttonList = res.msg.button || [];
            this.keepButtonList = lodash.cloneDeep(res.msg.button);
            this.getSequenceList();
          }
        })
      },
      /*父菜单顺序*/
      getSequenceList(){
        this.sequenceList = [];
        if (this.buttonList.length > 0) {
          for (let i = 0; i < this.buttonList.length; i++) {
            this.sequenceList.push(i+1)
          }
        }
      },
      handleAdd() {
        this.title = '新增';
        this.outerVisible = true;
        let item =  {name: '', value: '', type: '', sequence: '', sub_button:[{name: '', value: '', type: '', sequence: '',}]};
        this.buttonList.push(item);
        this.singleButton = this.buttonList[this.buttonList.length-1];
        this.keepOldData = lodash.cloneDeep(item);
        this.getSequenceList();
      },
      handleEdit(index, row) {
        this.title = '编辑';
        this.outerVisible = true;
        this.singleButton = row;
        this.keepOldData = lodash.cloneDeep(row);
        this.editDataIndex = index;
      },
      handleDelete(index,row){
        this.$confirm('删除数据后请点击下面提交，否则不能生效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.buttonList.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /*父菜单的永久素材*/
      sendLongPicSuccess(res, file, fileList) {
        this.$message.success('上传永久素材成功');
        this.longFileList = [];
        this.singleButton.value = res.msg;
      },
      /*子菜单的永久素材*/
      sendChildrenPicSuccess(res, file, fileList){
        this.$message.success('上传永久素材成功');
        this.longFileList = [];
        this.singleButton.sub_button[this.childrenPosition].value = res.msg;
      },
      handleExceed() {
        this.$message.error(`图片最多上传1张`)
      },
      /*编辑子菜单*/
      handleEditChildren() {
        this.innerVisible = true;
        if (this.singleButton.sub_button == null) {
          this.singleButton.sub_button = [];
          let item = {name: '', value: '', type: 'text', sequence: ''};
          this.singleButton.sub_button.push(item)
        }
       this.getSub_buttonSequenceList();
      },
      getSub_buttonSequenceList(){
        this.sub_buttonSequenceList = [];
        for (let i = 0; i < this.singleButton.sub_button.length; i++) {
          this.sub_buttonSequenceList.push(i+1)
        }
      },
      /*父级选择类型不是parent*/
      handleChangeRadio(val) {
        if (val != 'parent') {
          this.singleButton.sub_button = null
        }
      },
      /*增加子菜单*/
      handleAddSingleChildren(){
        if ( this.singleButton.sub_button.length < 5){
          let item = {name: '', value: '', type: 'text', sequence: ''};
          this.singleButton.sub_button.push(item)
        }
        this.getSub_buttonSequenceList();
      },
      /*删除某个子菜单*/
      handleDeleteSingleChildren(index){
        if (this.singleButton.sub_button.length > 1){
          this.singleButton.sub_button.splice(index,1)
        }
      },
      /*取消编辑子菜单*/
      handleCancelSingleChildren(){
        this.singleButton.sub_button = this.keepOldData.sub_button;
        this.innerVisible = false;
      },

      handleSaveChildren(){
        let list = [];
        list=this.singleButton.sub_button.filter((item)=>{
           return (item.name == '' || item.value == '' || item.sequence == '');
        })
        if (list.length > 0){
          this.$message.error('请完善信息')
          return
        }
        this.innerVisible = false;
      },
      /*取消编辑（一级）*/
      handleCancelKeep(){
        if (this.title == '编辑'){
          this.buttonList[this.editDataIndex] = this.keepButtonList[this.editDataIndex]
        } else {
          this.buttonList.pop();
        }
        this.outerVisible = false
      },
      /*保存当前编辑的按钮*/
      handleKeepData(){
        if (!this.singleButton.name || !this.singleButton.sequence || (this.singleButton.type !='parent' && !this.singleButton.value)){
          this.$message.error('请完善信息')
          return
        }
        this.outerVisible = false
      },
      /*子菜单当前位置*/
      handleUp(index){
        this.childrenPosition = index;
      },
      /*提交编辑*/
      confirmButton(){
        this.$confirm('提交最终改变的数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.handleSubmit();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSubmit(){
        let param = {button:this.buttonList};
        apiDataFilter.request({
          apiPath:'admin.weChatMenu.update',
          method:'post',
          data:param,
          pathParams: [this.serviceId],
          successCallback:(res)=>{
            this.$message({
              type: 'success',
              message: '提交成功!'
            });
            this.getMenu();
          }
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped lang='less'>
  @import "weChatMenu.less";
</style>
