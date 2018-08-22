
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 小程序路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const group = () => import(/* webpackChunkName: "wechat" */'@/components/management/weChat/group/group') //群内容管理
const community = () => import(/* webpackChunkName: "wechat" */'@/components/management/weChat/community/community') //群管理
const statistics = () => import(/* webpackChunkName: "wechat" */'@/components/management/weChat/statistics/statistics') //社群数据

export default [
  { path: 'group', name: 'group', component: group },
  { path: 'community', name: 'community', component: community },
  { path: 'statistics', name: 'statistics', component: statistics },
]
