
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：小程序接口
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'groupManage': { // 群内容管理
    'groupList': 'pc/wxmini/content/page', //获取list
    'groupSearch': 'pc/wxmini/content/list', //搜索接口
    'getMember': 'pc/wxmini/member', //获取用户信息
    'contentSave': 'pc/wxmini/content/save', //新增和修改接口
    'groupPublish': 'pc/wxmini/content/publish'//发布接口
  },
  'community':{
    'communityList':{
      'list':'pc/wxmini/community/list',//社群list
      'revise':'pc/wxmini/community/revise',//编辑和新增
      'publish':'pc/wxmini/community/publish',//发布
    },
    'groupList':{
      'list':'pc/wxmini/group/list',//群list
      'infoList':'pc/wxmini/community/info',//社群列表
      'validgroup':'pc/wxmini/validgroup/list',//
      'addgroups':'pc/wxmini/community/addgroups',//添加群
      'revise':'pc/wxmini/group/revise',//完善信息
      'release':'pc/wxmini/group/release',//解绑
    }
  }
}
