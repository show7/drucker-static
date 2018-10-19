const role = () => import(/* webpackChunkName: "admin" */ '@/components/management/admin/role/role')

export default [
  { path: 'role', name: 'role', component: role },
]
