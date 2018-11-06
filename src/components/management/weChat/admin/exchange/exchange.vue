<template>
  <div class="exchange-container">
    <h3>兑换管理</h3>
    <!--顶部搜索-->
    <div class="exchange-top">
      <el-row>
        <el-col :span="6">
          <div class="grid-content">
            商品名称：
            <el-input v-model="productionName" placeholder="请输入商品名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            上架状态：
            <el-select v-model="statusId" placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            群组：
            <el-select v-model="communityId" placeholder="请选择">
              <el-option
                v-for="item in communityList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content ">
            <el-button type="info" @click="getList">搜索</el-button>
            <el-button type="info" plain @click="handleClear">清空</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="exchange-content">
      <div class="new-add">
        <el-button type="primary" @click="handleAdd">新建商品</el-button>
      </div>
      <!--table表格-->
      <el-table
        :data="productList"
        style="width: 100%">
        <el-table-column
          prop="productionName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="communityName"
          label="所属群组">
        </el-table-column>
        <el-table-column
          prop="changedNum"
          label="已兑换">
        </el-table-column>
        <el-table-column
          prop="leftNum"
          label="剩余数">
        </el-table-column>
        <el-table-column
          prop="coinPrice"
          label="礼金定价">
        </el-table-column>
        <el-table-column
          prop="publishStatusStying"
          label="上架状态">
        </el-table-column>
        <el-table-column width="200" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOnlook(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
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
    <!--编辑-->
    <addEdit :dialogVisibleF="dialogVisibleF"
             @callBackPop="handleHide"
             @callbackSubmit = 'handleSubmit'
             v-if="dialogVisibleF"
             :productItem="detail"></addEdit>
    <!--详情-->
    <detail :dialogVisibleD="dialogVisibleD"
             @callBackPop="handleHide"
             v-if="dialogVisibleD"
             :productItem="detail"></detail>
  </div>
</template>

<script>
  import apiDataFilter from "../../../../../libraries/apiDataFilter";
  import lodash from 'lodash'
  import addEdit from './compontents/addEdit/addEdit'
  import detail from './compontents/detail/detail'

  export default {
    name: "exchange",
    components:{addEdit,detail},
    data() {
      return {
        status:[{id:0,name:'全部'},{id:1,name:'已发布'},{id:2,name:'未发布'}],
        statusId:0,
        communityListPop:[],
        communityList:[],
        communityId:0,
        productList:[],
        pageIndex:1,
        pageCount:20,
        dialogVisibleF:false,
        detail:{},
        productionName:'',
        dialogVisibleD:false
      }
    },
    computed:{

    },
    methods:{
      initProductItem(row){
        return{
          productImg: row ? row.productImg : '',//商品图片
          productionName: row ? row.productionName : '', //商品名称
          productionType: [{id: 2, name: '兑换码商品'}, {id: 3, name: "链接回复类商品"}],//商品兑换类型
          productionTypeId: 2,//兑换类型id
          coinPrice: row ? row.coinPrice : null,//兑换礼金
          communityList: this.communityList,//群组数据
          communityId:row? row.communityId:null,//群组id
          productNum: row ? row.productNum : null,//商品总数量
          fileItemText: '',//上传text兑换码文件
          productTags: row ? row.productTags : [],//标签
          productDetail: row ? row.productDetail : '',//详情
          messageList: row ? row.messageList : [{type:1, text: ''},{type:2, text: ''},],//模板消息
          title: row ? '编辑' : '新增',
          publishStatus:row? row.publishStatus.toString():'1',//发布状态
          order:row? row.order:'',//排序
          keyWords:row? row.keyWords:'',//关键字
          timedTask:row? row.timedTask:'',//定时下架
          id:row? row.id:null
        }
      },
      /*获取群组列表*/
      getGroup(){
        apiDataFilter.request({
          apiPath:'weChat.common.group',
          successCallback:(res)=>{
            let result = res.msg.communityList || [];
            result.unshift({id:0,name:'全部',groupList:[]});
            this.communityList = result;
          }
        })
      },
      /*搜索获取列表*/
      getList(){
        let param={page:this.pageIndex};
        this.productionName ? Object.assign(param,{productionName:this.productionName}):'';
        this.statusId ? Object.assign(param,{publishStatus:this.statusId}):'';
        this.communityId ? Object.assign(param,{cid:this.communityId}):'';
        apiDataFilter.request({
          apiPath:'weChat.exchange.list',
          data:param,
          successCallback:(res)=>{
            let result = res.msg;
            this.productList = result.content;
            this.pageCount = result.page.pageCount
          }
        })
      },
      /*分页*/
      currentChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getList();
      },
      /*清除搜索*/
      handleClear(){
        this.productionName = '';
        this.statusId = 0;
        this.communityId = 0;
        this.getList();
      },
      /*编辑*/
      handleEdit(index,row){
        this.detail = this.initProductItem(row);
        this.dialogVisibleF =true;
      },
      /*详情*/
      handleOnlook(index,row){
        this.detail = this.initProductItem(row);
        this.dialogVisibleD = true;
      },
      /*新增*/
      handleAdd(){
        this.dialogVisibleF = true;
        this.detail = this.initProductItem()
      },
      handleHide(){
        this.dialogVisibleF = false;
        this.dialogVisibleD = false;
      },
      handleSubmit(productionItem){
        let param = productionItem;
        apiDataFilter.request({
         apiPath:'weChat.exchange.edit',
          method:'post',
          data:param,
          successCallback:(res)=>{
           this.$message.success('提交成功');
           this.dialogVisibleF = false;
           this.getList();
          }
        })
      }
    },
    created(){
      this.getGroup();
      this.getList();
    }
  }
</script>

<style scoped lang='less'>
  @import "exchange.less";
</style>
