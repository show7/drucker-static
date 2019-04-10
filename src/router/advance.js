

const refund = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/refund/refund')//退钱
const employee = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/employee/employee') //hr
const templateMessage = () => import(/* webpackChunkName: "manage" */ '@/components/management/advance/templateMessage/templateMessage') //模板消息
const coin = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/coin/coin'
); //礼金
const invest = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/invest/invest'
); //投资圈外
const couponClear = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/couponClear/couponClear'
); //消除优惠券
const coupon = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/coupon/coupon'
); //创建优惠券
const addvip = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/addvip/addvip'
); // 添加会员
const openCourse = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/openCourse/openCourse'
); //新开/解锁课程
export default [
  { path: 'refund', name: 'refund', component: refund },
  { path: 'employee', name: 'employee', component: employee},
  { path: 'templatemessage', name: 'templateMessage', component: templateMessage},
  { path: 'coin', name: 'coin', component: coin},
  { path: 'couponClear', name: 'couponClear', component: couponClear},
  { path: 'invest', name: 'invest', component: invest},
  { path: 'coupon', name: 'coupon', component: coupon},
  { path: 'addvip', name: 'addvip', component: addvip},
  { path: 'opencourse', name: 'openCourse', component: openCourse},
]
