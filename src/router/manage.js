
const userInfo = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/userInfo/userInfo')   //用户信息
const certificate = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/certificate/certificate')    //添加证书
const certificateSend = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/certificateSend/certificateSend') // 发送证书
const templateMessage = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/templateMessage/templateMessage') //模板消息
const addvip = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/addvip/addvip')               // 添加vip
const openCourse = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/openCourse/openCourse')  //新开/解锁课程
const application = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/application/application')  //申请审批
const qrcode = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/qrcode/qrcode')  //推广二维码

export default [
  { path: 'userinfo', name: 'userInfo', component: userInfo },
  { path: 'certificate', name: 'certificate', component: certificate},
  { path: 'certificatesend', name: 'certificateSend', component: certificateSend},
  { path: 'templatemessage', name: 'templateMessage', component: templateMessage},
  { path: 'addvip', name: 'addvip', component: addvip},
  { path: 'opencourse', name: 'openCourse', component: openCourse},
  { path: 'application', name: 'application', component: application},
  { path: 'qrcode', name: 'qrcode', component: qrcode},
]
