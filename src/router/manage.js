/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 运营路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const userInfo = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/userInfo/userInfo')   //用户信息
const certificate = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/certificate/certificate')    //添加证书
const certificateSend = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/certificateSend/certificateSend') // 发送证书
const templateMessage = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/templateMessage/templateMessage') //模板消息
const addvip = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/addvip/addvip')               // 添加vip
const openCourse = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/openCourse/openCourse')  //新开/解锁课程
const application = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/application/application')  //申请审批
const qrcode = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/qrcode/qrcode')  //推广二维码
const survey = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/survey/survey')  //问卷链接设置
const banner = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/banner/banner')  //首页banner
const lives = () => import(/* webpackChunkName: "manage" */ '@/components/management/manage/lives/lives')  //首页直播
const activities = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/activities/activities')  //线下活动编辑
const articles = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/articles/articles')  //文章编辑
const social = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/social/social')  //社群信息导入
const autoReply = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/autoReply/autoReply')  //服务号自动回复
const subscribe = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/subscribe/subscribe')  //服务号关注回复
const coupon = ()=> import(/* webpackChunkName: "manage" */ '@/components/management/manage/coupon/coupon')  //创建优惠券


export default [
  { path: 'userinfo', name: 'userInfo', component: userInfo },
  { path: 'certificate', name: 'certificate', component: certificate},
  { path: 'certificatesend', name: 'certificateSend', component: certificateSend},
  { path: 'templatemessage', name: 'templateMessage', component: templateMessage},
  { path: 'addvip', name: 'addvip', component: addvip},
  { path: 'opencourse', name: 'openCourse', component: openCourse},
  { path: 'application', name: 'application', component: application},
  { path: 'qrcode', name: 'qrcode', component: qrcode},
  { path: 'survey', name: 'survey', component: survey},
  { path: 'banner', name: 'banner', component: banner},
  { path: 'lives', name: 'lives', component: lives},
  { path: 'activities', name: 'activities', component: activities},
  { path: 'articles', name: 'articles', component: articles},
  { path: 'social', name: 'social', component: social},
  { path: 'autoreply', name: 'autoReply', component: autoReply},
  { path: 'subscribe', name: 'subscribe', component: subscribe},
  { path: 'coupon', name: 'coupon', component: coupon},
]
