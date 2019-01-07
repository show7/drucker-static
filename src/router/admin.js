

const role = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/role/role')//角色
const projectConfig = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/projectConfig/projectConfig')//项目管
const picSource = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/picSource/picSource')//微信图片素材上传

const weChatMenu = ()=>import(/* webpackChunkName: "admin" */ '@/components/management/admin/weChatMenu/weChatMenu')//公众号菜单 管理
const articleSend = ()=>import(/* webpackChunkName: "admin" */ '@/components/management/admin/articleSend/articleSend')//文章定向发送 管理

export default [
  { path: 'role', name: 'role', component: role },
  { path: 'projectconfig', name: 'projectConfig', component: projectConfig },
  { path: 'picsource', name: 'picSource', component: picSource },

  { path: 'wechatmenu', name: 'weChatMenu', component: weChatMenu },
  { path: 'articlesend', name: 'articleSend', component: articleSend },
]
