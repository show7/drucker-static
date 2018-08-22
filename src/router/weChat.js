
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 小程序路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const content = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/group/content/content') //群内容管理
const groups = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/admin/groups/groups') //群管理
const statistics = () => import(/* webpackChunkName: "wechat" */'@/components/management/weChat/statistics/statistics') //社群数据
const topic = ()=> import(/* webpackChunkName: "wechat" */'@/components/management/weChat/topic/topic') //话题管理
const contentManage = ()=> import(/* webpackChunkName: "wechat" */'@/components/management/weChat/contentManage/contentManage') //内容管理


export default [
  { path: 'group/content', name: 'content', component: content },
  { path: 'admin/groups', name: 'group', component: groups },
  { path: 'statistics', name: 'statistics', component: statistics },
  { path: 'topic', name: 'topic', component: topic },
  { path: 'contentmanage', name: 'contentManage', component: contentManage },
]
