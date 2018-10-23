

const role = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/role/role')//角色
const projectConfig = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/projectConfig/projectConfig')//项目管理
const picUpload = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/picUpload/picUpload')//图片上传
const picSource = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/picSource/picSource')//微信图片素材上传
const richText = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/richText/richText')//富文本上传

export default [
  { path: 'role', name: 'role', component: role },
  { path: 'projectconfig', name: 'projectConfig', component: projectConfig },
  { path: 'picupload', name: 'picUpload', component: picUpload },
  { path: 'picsource', name: 'picSource', component: picSource },
  { path: 'richtext', name: 'richText', component: richText },
]
