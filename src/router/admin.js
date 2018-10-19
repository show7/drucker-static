const role = () => import(/* webpackChunkName: "wechat" */ '@/components/management/admin/role/role')

export default [
  { path: 'role', name: 'role', component: role },
]
