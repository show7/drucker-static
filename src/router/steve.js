const job = () => import(/* webpackChunkName: "wechat" */ '@/components/management/steve/job/job')
const query = () => import(/* webpackChunkName: "wechat" */ '@/components/management/steve/query/query')

export default [
  { path: 'job', name: 'job', component: job },
  { path: 'query', name: 'query', component: query }
]
