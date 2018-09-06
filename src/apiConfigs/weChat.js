
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
    'groupPublish': 'pc/wxmini/content/publish'//发布接口
  },
  'community':{  //群组管理
    'communityList':{
      'list':'pc/wxmini/community/list',//群组list
      'revise':'pc/wxmini/community/revise',//编辑和新增
      'publish':'pc/wxmini/community/publish',//发布
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
  }
}
