

const refund = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/refund/refund')//退钱


export default [
  { path: 'refund', name: 'refund', component: refund },
]
