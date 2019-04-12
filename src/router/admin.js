

const role = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/role/role')//角色
const projectConfig = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/projectConfig/projectConfig')//项目管
const invest = () =>
import (
  /* webpackChunkName: "admin" */ '@/components/management/admin/invest/invest'
); //投资圈外

export default [
  { path: 'role', name: 'role', component: role },
  { path: 'projectconfig', name: 'projectConfig', component: projectConfig },
  { path: 'invest', name: 'invest', component: invest},

]
