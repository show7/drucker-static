

const refund = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/refund/refund')//退钱
const employee = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/employee/employee') //hr
const templateMessage = () => import(/* webpackChunkName: "manage" */ '@/components/management/advance/templateMessage/templateMessage') //模板消息

export default [
  { path: 'refund', name: 'refund', component: refund },
  { path: 'employee', name: 'employee', component: employee},
  { path: 'templatemessage', name: 'templateMessage', component: templateMessage},
]
