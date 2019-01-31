

const role = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/role/role')//角色
const projectConfig = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/projectConfig/projectConfig')//项目管


export default [
  { path: 'role', name: 'role', component: role },
  { path: 'projectconfig', name: 'projectConfig', component: projectConfig },

]
