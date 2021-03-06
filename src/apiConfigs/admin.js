/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：admin,管理员功能
3. 作者：zhenzikang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'projectConfig':{
    'config':'pc/admin/config',//加载数据
    'update':'pc/admin/config/update',//修改数据
    'add':'pc/admin/config/add',//新增数据
    'delete':'pc/admin/config/delete',//删除
  },
  'richText':{
    'all':'pc/operation/richtext/load/all',//加载列表
    'save':'pc/operation/richtext/save',//编辑和新增
    'load':'pc/operation/richtext/load',//加载详情
  },
  'role':{
    'all':'pc/admin/userroles',//加载所有数据
    'del':'pc/admin/userrole/del',//删除
    'modify':'pc/admin/userrole/modify',//新增和编辑
    'roles':'pc/admin/roles',//职位
  },
  'weChatMenu':{
    'menu':'pc/operation/wx/get/menu',//获取菜单
    'update':'pc/operation/wx/update/menu',//提交更改
  },
  'articleSend':{
    'message':'pc/operation/wx/preview/mass/message',// 发送前预览
    'preview':'pc/operation/wx/mass/message',//群发
    'material':'pc/operation/get/materials',//获取图文素材
  }
}
