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
  }
}
