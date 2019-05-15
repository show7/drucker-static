

const refund = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/refund/refund')//退钱
const employee = () => import(/* webpackChunkName: "advance" */ '@/components/management/advance/employee/employee') //hr
const templateMessage = () => import(/* webpackChunkName: "manage" */ '@/components/management/advance/templateMessage/templateMessage') //模板消息
const coin = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/coin/coin'
); //礼金
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
); //赠送课程
const importCourse = () =>
import (
  /* webpackChunkName: "manage" */ '@/components/management/advance/importCourse/importCourse'
); //新开/解锁课程
export default [
  { path: 'refund', name: 'refund', component: refund },
  { path: 'employee', name: 'employee', component: employee},
  { path: 'templatemessage', name: 'templateMessage', component: templateMessage},
  { path: 'coin', name: 'coin', component: coin},
  { path: 'couponclear', name: 'couponClear', component: couponClear},
  { path: 'coupon', name: 'coupon', component: coupon},
  { path: 'addvip', name: 'addvip', component: addvip},
  { path: 'opencourse', name: 'openCourse', component: openCourse},
  { path: 'importcourse', name: 'importCourse', component: importCourse},
]
