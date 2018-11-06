<template>
  <div class="add-edit-compontent">
    <el-dialog
      :title="productionItem.title"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="50%">
      <div class="pop-out">
        <el-row>
          <el-col :span="10">
            <div class="grid-content ">
              <span>*</span>商品头图：
              <el-upload
                class="avatar-uploader"
                action="/pc/upload/file"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
                <img v-if="productionItem.productImg" :src="productionItem.productImg" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content ">
              <span>*</span> 商品名称：
              <el-input v-model="productionItem.productionName" placeholder="请输入商品名称"></el-input>
            </div>
            <div class="grid-content-down">
              <span>*</span> 礼金定价：
              <el-input :disabled="disabled" v-model="productionItem.coinPrice" placeholder="请输入礼金定价"></el-input> 礼金
            </div>
            <div class="grid-content grid-content-down">
              <span>*</span>排列顺序：
              <el-input v-model="productionItem.order" placeholder="请输入顺序"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div class="grid-content ">
              所属群组：
              <el-select :disabled="disabled" v-model="productionItem.communityId" placeholder="请选择所属群组">
                <el-option
                  v-for="item in productionItem.communityList"
                  :key="item.id"
                  :label="item.name"
                  :disabled="item.id ==0 ? true:false"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">
              商品标签：<el-input class="tag"  maxlength="4" v-model="productionItem.productTags[0]" placeholder="请输入标签"></el-input>
              <el-input class="tag"    maxlength="4" v-model="productionItem.productTags[1]" placeholder="请输入标签"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content ">
              商品详情：
              <div class="editor-box">
                <Editor id="contentEditor"
                        ref="contentEditor"
                        :value="productionItem.productDetail"
                        :toolbar="toolbarNormal"
                        @change="oneEditorChange"></Editor>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content ">
              <span>*</span>商品分类：
              <el-select :disabled="disabled" v-model="productionItem.productionTypeId" placeholder="请选择分类" >
                <el-option
                  v-for="item in productionItem.productionType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content " v-if="productionItem.productionTypeId == 2">
              <el-upload
                class="upload-demo"
                action="/pc/wxmini/reward/code"
                :limit="1"
                :on-success="handleFileSuccess"
                :before-upload="beforeFileUpload"
                :file-list="fileItemText">
                <el-button  size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">为正常使用，只能上传txt文件</div>
              </el-upload>
            </div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <div class="grid-content ">
              <span>*</span>客服消息推送文案：
              <el-button type="primary" @click="handleAddMessage(1)">添加消息</el-button>
              <el-button type="primary" @click="handleAddMessage(2)">添加图片</el-button>
            </div>
          </el-col>
        </el-row>

        <div class="message-content" >
          <div class="message-box" v-for="(item, index) in productionItem.messageList" :key="index">
            <div class="item">
              <el-input v-if="item.type == 1" v-model="item.text" placeholder="请输入内容"></el-input>
              <el-upload
                v-if="item.type == 2"
                class="avatar-uploader"
                action="/pc/upload/file"
                :show-file-list="false"
                :on-success="handleTextSuccess">
                <img v-if="item.text && item.type == 2" :src="item.text" class="avatar"
                     @click="handlePicTextIndex(index)">
                <i v-else class="el-icon-plus avatar-uploader-icon" @click="handlePicTextIndex(index)"></i>
              </el-upload>
              <i class="el-icon-delete" @click="handleDel(index)"></i>
            </div>
          </div>
        </div>

        <el-row v-if="productionItem.productionTypeId == 3">
          <el-col :span="12">
            <div class="grid-content">
              <span>*</span>关键字：
              <el-input :disabled="disabled" v-model="productionItem.keyWords" placeholder="请输入关键字"></el-input>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span>*</span>定时下架：
              <el-date-picker
                v-model="productionItem.timedTask"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="timestamp"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <span>*</span>操作：
              <el-radio v-model="productionItem.publishStatus" label="2">上架</el-radio>
              <el-radio v-model="productionItem.publishStatus" label="0">暂不上架</el-radio>
              <el-radio v-model="productionItem.publishStatus" label="1">即将上架</el-radio>
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="hidePopOut">取 消</el-button>
          <el-button type="primary" @click="handleCheckData">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>


<script>
  import Editor from '../../../../../../common/editor/editor'
  export default {
    name: "addEdit",
    props: {
      dialogVisibleF:Boolean,
      productItem:Object
    },
    components: {Editor},
    data() {
      return {
        fileItemText:[],//text文件
        picTextIndex:null,//点击确定图片的位置
        toolbarNormal: ['bold','image'],
        disabled:false,
        productionItem: {
          productImg: '',//商品图片
          productionName: '',//商品名称
          productionType: [{id: 2, name: '兑换码商品'}, {id: 3, name: "链接回复类商品"}],
          productionTypeId: 2,//兑换类型id
          coinPrice: null,//兑换礼金
          communityList: [],//群组数据
          communityId: null,//群组id
          productNum: null,//商品总数量
          fileItemText: '',//上传text兑换码文件
          productTags: [],//标签
          productDetail: '',//详情
          messageList: [{ type:1, text: '文本'},{type:2, text:null},],//模板消息
          publishStatus:'1',//发布状态
          order:'',//排序
          keyWords:'',//关键字
          timedTask:'',//定时下架
          title: '新增'
        }
      }
    },
    computed: {
      dialogVisible() {
        return this.dialogVisibleF
      }
    },
    methods: {
      /*图片上传成功*/
      handleAvatarSuccess(res, file) {
        this.productionItem.productImg = res.msg;
      },
      /*图片上传之前*/
      beforeAvatarUpload() {

      },
      /*隐藏弹框*/
      hidePopOut(){
        this.$emit('callBackPop',false)
      },
      /*文本编辑*/
      oneEditorChange(val){
        this.productionItem.productDetail = val
      },
      /*上传text文本*/
      handleFileSuccess(res, file){
        this.productionItem.fileItemText=res.msg;
      },
      /*校验上传text文本*/
      beforeFileUpload(file){
        let typeFlag = 'text/plain' == file.type;
        if (this.disabled){
          this.$message.info('不可编辑');
          return !this.disabled
        }
        if (!typeFlag){
          this.$message.error('只能上传txt文件');
          return typeFlag
        }

      },
      /*客服消息图片上传成功*/
      handleTextSuccess(res, file){
        this.productionItem.messageList.forEach((item,index)=>{
          if (this.picTextIndex == index) {
            this.productionItem.messageList[index].text = res.msg
          }
        })
      },
      /*确定点击图片在数组的位置*/
      handlePicTextIndex(index){
        this.picTextIndex = index;
      },
      /*删除客服消息*/
      handleDel(index){
        this.productionItem.messageList.splice(index,1);
      },
      /*添加图文消息*/
      handleAddMessage(flag){
        let length = this.productionItem.messageList.length;
        if (length == 5){
          this.$message.info('只能添加5条图文消息哦！');
          return
        }
        let messageText = { type:1, text: ''};
        let messagePic = {type:2, text: ''};
        if (flag == 1){
          this.productionItem.messageList.push(messageText)
        } else {
          this.productionItem.messageList.push(messagePic)
        }
      },
      /*检验数据*/
      handleCheckData(){
        const {productImg, productionName, coinPrice, order, keyWords,productionTypeId,fileItemText,timedTask} = this.productionItem;
        if (!productImg || !productionName || !coinPrice || !order){
           this.$message.error('请完善必填信息');
          return;
        }if (!this.checkMessageList()){
          this.$message.error('图文消息内容不能为空');
          return;
        }
        if (productionTypeId == 2 && !this.disabled){
          if (!fileItemText){
            this.$message.error('请上传兑换码文本');
            return;
          }
        }else if (productionTypeId == 3){
           if (!keyWords){
            this.$message.error('关键字不能为空');
            return;
          } else if (!timedTask){
             this.$message.error('时间不能为空');
             return;
           }
        }

        this.$emit('callbackSubmit',this.productionItem)
      },
      /*检验推文消息*/
      checkMessageList() {
        let messageList = this.productionItem.messageList;
        if (messageList.length == 0) {
          return false;
        } else {
          let list = messageList.filter((item, index) => {
            return !item.text
          });
          if (list.length > 0) {
            return false
          } else {
            return true
          }
        }
      }
    },
    mounted() {
      this.productionItem = this.productItem;
    /*  this.productionItem.communityList = this.productItem.communityList;
      this.productionItem.productImg = this.productItem.productImg;
      this.productionItem.productionName = this.productItem.productionName;
      this.productionItem.productionType = this.productItem.productionType;
      this.productionItem.productionTypeId = this.productItem.productionTypeId;
      this.productionItem.coinPrice = this.productItem.coinPrice;
      this.productionItem.communityId = this.productItem.communityId;
      this.productionItem.productNum = this.productItem.productNum;
      this.productionItem.fileItemText = this.productItem.fileItemText;
      this.productionItem.productTags = this.productItem.productTags;
      this.productionItem.productDetail = this.productItem.productDetail;
      this.productionItem.messageList = this.productItem.messageList;
      this.productionItem.title = this.productItem.title;
      this.productionItem.keyWords = this.productItem.keyWords;
      this.productionItem.timedTask = this.productItem.timedTask;*/
      if (this.productItem.title == '编辑') {
        this.productionItem['id'] = this.productItem.id;
        this.disabled = true;
      } else {
        delete(this.productionItem['id']);
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "addEdit.less";
</style>
