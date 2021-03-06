
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 小程序路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const content = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/group/content/content') //群内容管理
const groups = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/admin/groups/groups') //群管理
const statistics = () => import(/* webpackChunkName: "wechat" */'@/components/management/weChat/group/statistics/statistics') //群组数据
const topic = ()=> import(/* webpackChunkName: "wechat" */'@/components/management/weChat/community/topic/topic') //话题管理
const exchange = ()=> import(/* webpackChunkName: "wechat" */'@/components/management/weChat/admin/exchange/exchange') //兑换管理
const guessing = ()=> import(/* webpackChunkName: "wechat" */'@/components/management/weChat/admin/guessing/guessing') //竞猜管理



export default [
  { path: 'group/content', name: 'content', component: content },
  { path: 'admin/groups', name: 'group', component: groups },
  { path: 'group/statistics', name: 'statistics', component: statistics },
  { path: 'community/topic', name: 'topic', component: topic },
  { path: 'admin/exchange', name: 'exchange', component: exchange },
  { path: 'admin/guessing', name: 'guessing', component: guessing },
]
