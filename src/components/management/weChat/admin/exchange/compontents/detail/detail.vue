<template>
  <div class="add-edit-compontent">
    <el-dialog
       title="详情"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      width="50%">
      <div class="pop-out">
        <el-row>
          <el-col :span="10">
            <div class="grid-content ">
              <span>*</span>商品头图：
              <img class="productImg" :src="productionItem.productImg" alt="图片">
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content ">
              <span>*</span> 商品名称：{{productionItem.productionName}}
            </div>
            <div class="grid-content-down">
              <span>*</span> 礼金定价：{{productionItem.coinPrice}}
            </div>
            <div class="grid-content grid-content-down">
              <span>*</span>排列顺序：{{productionItem.order}}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <div class="grid-content ">
              所属群组：{{communityName}}
            </div>
          </el-col>
          <el-col :span="14">
            <div class="grid-content">
              商品标签：{{productionItem.productTags[0]}},{{productionItem.productTags[1]}}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid ">
              商品详情：<div  v-html='productionItem.productDetail'></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content ">
              <span>*</span>商品分类：{{productionItem.productionTypeId == 2? '兑换码商品':'链接回复类商品'}}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content " v-if="productionItem.productionTypeId == 2">
            </div>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="24">
            <div class="grid-content ">
              <span>*</span>客服消息推送文案：
            </div>
          </el-col>
        </el-row>

        <div class="message-content" >
          <div class="message-box" v-for="(item, index) in productionItem.messageList" :key="index">
            <div class="item">{{index+1}}、
              <p v-if="item.type == 1">{{item.text}}</p>
              <img class="message-pic" v-if="item.text && item.type == 2" :src="item.text" />
            </div>
          </div>
        </div>

        <el-row v-if="productionItem.productionTypeId == 3">
          <el-col :span="12">
            <div class="grid-content">
              <span>*</span>关键字：{{productionItem.keyWords}}
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <span>*</span>定时下架：
              <el-date-picker
                v-model="productionItem.timedTask"
                type="datetime"
                disabled
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
              <span>*</span>操作：{{productionItem.publishStatus == 1 ?'上架':productionItem.publishStatus == 2 ? '暂不上架':'即将上架'}}
            </div>
          </el-col>
          <el-col :span="12">

          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="hidePopOut">确 定</el-button>
       </span>
    </el-dialog>
  </div>
</template>


<script>

  export default {
    name: "detail",
    props: {
      dialogVisibleD:Boolean,
      productItem:Object
    },
    data() {
      return {
        communityName:'',
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
          title: '详情'
        }
      }
    },
    computed: {
      dialogVisible() {
        return this.dialogVisibleD
      }
    },
    methods: {
      /*隐藏弹框*/
      hidePopOut(){
        this.$emit('callBackPop',false)
      },
    },
    mounted() {
      this.productionItem = this.productItem;
      this.productionItem.communityList.forEach((item,index)=>{
        if (item.id == this.productionItem.communityId){
          this.communityName = item.name
        }
      })
    }
  }
</script>

<style scoped lang='less'>
  @import "detail.less";
</style>
