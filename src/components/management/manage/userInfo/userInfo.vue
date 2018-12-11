<template>
  <div class="user-info">
    <h3>用户信息</h3>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="个人搜索" name="first">
        <div class="single">
          <div class="info-top">
            <el-row>
              <el-col :span="12">
                <el-input v-model="inputValue" placeholder="输入学号/ProfileId/RiseId/昵称查询"></el-input>
                <el-button type="primary" @click="getUserInfo">点击查询</el-button>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>
          </div>
          <div class="user-list">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                width="150"
                label="序号">
                序号
              </el-table-column>
              <el-table-column
                prop="headimgurl"
                label="头像">
                <template slot-scope="scope">
                  <img class="head-pic" :src="scope.row.headimgurl" alt="">
                </template>
              </el-table-column>
              <el-table-column
                prop="riseId"
                label="riseId">
              </el-table-column>
              <el-table-column
                prop="nickname"
                label="昵称">
              </el-table-column>
              <el-table-column
                prop="memberId"
                label="学号">
              </el-table-column>
              <el-table-column
                prop="memberTypes"
                label="会员类型">
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">查看详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班级和小组搜索" name="second">
        <div class="info-top">
          <el-select v-model="classValue" placeholder="请选择班级名" @change="handleGroupChange">
            <el-option
              v-for="item in GroupData.className"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="groupValue" placeholder="请选择小组">
            <el-option
              v-for="item in groupIds"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
          <el-button type="primary" @click="getGroupList(1)">点击查询</el-button>
        </div>
        <div class="user-list">
          <el-table
            :data="tableGroupData"
            border
            style="width: 100%">
            <el-table-column
              type="index"
              width="150"
              label="序号">
              序号
            </el-table-column>
            <el-table-column
              prop="headimgurl"
              label="头像">
              <template slot-scope="scope">
                <img class="head-pic" :src="scope.row.headimgurl" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="riseId"
              label="riseId">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="memberId"
              label="学号">
            </el-table-column>
            <el-table-column
              prop="memberTypes"
              label="会员类型">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="pageChange"
              :page-count="pageData.pageCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title="信息"
      :visible.sync="dialogVisible"
      width="40%">
      <div class="dialog-user">
        <h3>用户信息</h3>
        <ul>
          <li><span>昵称：</span>{{personData.nickname}}</li>
          <li><span>openid：</span>{{personData.openid}}</li>
          <li><span>学号：</span>{{personData.memberId}}</li>
          <li><span>真实姓名：</span>{{personData.realName}}</li>
          <li><span>收件人：</span>{{personData.realName}}</li>
          <li><span>圈外id：</span>{{personData.riseId}}</li>
          <li><span>微信号：</span>{{personData.weixinId}}</li>
          <li><span>联系方式：</span>{{personData.mobileNo}}</li>
        </ul>
      </div>
      <div class="dialog-user">
        <h3>优惠券信息</h3>
        <ul v-for="(item, index) in personData.coupons" :key="index">
          <li><span>金额：</span>{{item.amount}}</li>
          <li><span>描述：</span>{{item.description}}</li>
          <li><span>过期日期：</span>{{item.expiredDate}}</li>
        </ul>
      </div>
      <div class="dialog-user">
        <h3>会员信息</h3>
        <ul v-for="(item, index) in personData.memberInfoVOs" :key="index">
          <li><span>当前会员类型：</span>{{item.memberName}}</li>
          <li><span>入学日期：</span>{{item.openDate}}</li>
          <li><span>过期日期：</span>{{item.expireDate}}</li>
          <li><span>班级：</span>{{item.className}}</li>
          <li><span>小组：</span>{{item.groupId}}</li>
        </ul>
      </div>
      <div class="dialog-user">
        <h3>工作情况</h3>
        <ul>
          <li><span>行业：</span>{{personData.industry}}</li>
          <li><span>职业：</span>{{personData.function}}</li>
          <li><span>参加工作年份：</span>{{personData.workingYear}}</li>
        </ul>
      </div>
      <div class="dialog-user">
        <h3>地址信息</h3>
        <ul>
          <li><span>国家：</span>{{personData.country}}</li>
          <li><span>省份：</span>{{personData.province}}</li>
          <li><span>城市：</span>{{personData.city}}</li>
          <li><span>地址：</span>{{personData.address}}</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
           <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import ApiDataFilter from '@/libraries/apiDataFilter'

  export default {
    name: 'userInfo',
    data() {
      return {
        inputValue: '', // 个人填写的搜索值
        tableData: [], // 个人搜索之后的值
        tableGroupData: [], //班级搜索之后的值
        GroupData: {}, //获取班级数据
        groupIds: [], //小组的数据集合
        activeName: 'first', // tab选择位置
        classValue: '', //选取的班级
        groupValue: '', //选取小组
        pageData: {}, //分页的数据
        personData: {}, // 弹框数据
        dialogVisible: false,
        coupons: [],//优惠卷
      }
    },
    methods: {
      /*弹框*/
      handleEdit($index, row) {
        this.dialogVisible = true;
        this.personData = row;
      },
      /*获取个人数据*/
      getUserInfo() {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'manage.userInfo',
          method: 'get',
          data: {
            searchId: self.inputValue
          },
          successCallback(res) {
            self.tableData = res.msg;
          }
        })
      },
      /*获取班级数据*/
      getClassInfo() {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'manage.groupInfo',
          method: 'get',
          successCallback(res) {
            self.GroupData = res.msg;
          }
        })
      },
      getGroupList(pageIndex) {
        let self = this;
        ApiDataFilter.request({
          apiPath: 'manage.classInfo',
          method: 'get',
          data: {
            className: this.classValue,
            groupId: this.groupValue,
            page: pageIndex
          },
          successCallback(res) {
            self.tableGroupData = res.msg.data;
            self.pageData = res.msg.page
          }
        })
      },
      handleClick() {

      },
      /*根据班级数据变动更改小组*/
      handleGroupChange() {
        this.groupIds = [];
        if (this.classValue) {
          this.GroupData.groupIds.forEach((item, index) => {
            if (item.className === this.classValue) {
              this.groupIds.push(item.groupId);
              this.groupValue = '';
            }
          })
        }
      },
      /*切换页面*/
      pageChange(val) {
        this.getGroupList(val)
      }
    },
    created() {
      this.getClassInfo()
    }
  }
</script>

<style scoped lang="less">
  @import "./userInfo.less";
</style>
