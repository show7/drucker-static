
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：小程序接口
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'common':{
    'group':'pc/wxmini/data/owner/group', //获取群组微信群
  },
  'groupManage': { // 群内容管理
    'groupList': 'pc/wxmini/content/page', //获取list
    'groupSearch': 'pc/wxmini/content/list', //搜索接口
    'getMember': 'pc/wxmini/member', //获取用户信息
    'contentSave': 'pc/wxmini/content/save', //新增和修改接口
    'groupPublish': 'pc/wxmini/content/publish',//发布接口
    'category':'pc/wxmini/load/category',//加载分类
    'recommend':'pc/wxmini/content/recommend',//更改推荐状态'
    'unPublish':'pc/wxmini/content/batch/unPublish',//批量下架
    'commentList':'pc/wxmini/comment/list',//评论列表
    'hidden':'pc/wxmini/comment/hidden',//隐藏评论
    'show':'pc/wxmini/comment/show',//显示评论
    'comment':'pc/wxmini/comment',//提交评论
  },
  'community':{  //群组管理
    'communityList':{
      'list':'pc/wxmini/community/list',//群组list
      'revise':'pc/wxmini/community/revise',//编辑和新增
      'publish':'pc/wxmini/community/publish',//发布
      'statistic':'pc/wxmini/community/statistic',//统计数据
    },
    'groupList':{
      'list':'pc/wxmini/group/list',//群list
      'infoList':'pc/wxmini/community/info',//群组列表
      'validgroup':'pc/wxmini/validgroup/list',//
      'addgroups':'pc/wxmini/community/addgroups',//添加群
      'revise':'pc/wxmini/group/revise',//完善信息
      'release':'pc/wxmini/group/release',//解绑
    }
  },
  'statistics': { //群数据
    'words':'pc/wxmini/data/chat' , //发言信息
    'coinList':'pc/wxmini/data/coin',//列表
    'records':'pc/wxmini/data/coin/records',//礼金详情记录 
  },
  'topic':{
    'topicList':'pc/wxmini/topic/list',//话题list
    'modify':'pc/wxmini/topic/modify',//话题新增和编辑
    'publish':'pc/wxmini/data/publish/topic',//发布
    'recommend':'pc/wxmini/data/recommend/topic',//推荐
  },
  'exchange':{
    'list':'pc/wxmini/reward/list',//获取列表
    'edit':'pc/wxmini/reward/edit',//新增和编辑
  },
  'activity':{
    'activityList':'pc/wxmini/load/guess/activity',//加载
    'activitySubmit':'pc/wxmini/submit/guess/activity',//提交
    'publish':'pc/wxmini/guess/publish',//发布
    'packet':'pc/wxmini/open/packet',//开奖
    'cancelActive':'pc/wxmini/guess/cancel/active',//下架变为历史状态
  }
}
