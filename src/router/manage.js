/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 运营路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const userInfo = () => import( '@/components/management/manage/userInfo/userInfo')   //用户信息
const certificate = () => import( '@/components/management/manage/certificate/certificate')    //添加证书
const certificateSend = () => import( '@/components/management/manage/certificateSend/certificateSend') // 发送证书
const templateMessage = () => import( '@/components/management/manage/templateMessage/templateMessage') //模板消息
const addvip = () => import( '@/components/management/manage/addvip/addvip')               // 添加vip
const openCourse = () => import( '@/components/management/manage/openCourse/openCourse')  //新开/解锁课程
const application = () => import( '@/components/management/manage/application/application')  //申请审批
const qrcode = () => import( '@/components/management/manage/qrcode/qrcode')  //推广二维码
const survey = () => import( '@/components/management/manage/survey/survey')  //问卷链接设置
const banner = () => import( '@/components/management/manage/banner/banner')  //首页banner
const lives = () => import( '@/components/management/manage/lives/lives')  //首页直播
const activities = ()=> import( '@/components/management/manage/activities/activities')  //线下活动编辑
const articles = ()=> import( '@/components/management/manage/articles/articles')  //文章编辑
const social = ()=> import( '@/components/management/manage/social/social')  //社群信息导入
const autoReply = ()=> import( '@/components/management/manage/autoReply/autoReply')  //服务号自动回复
const subscribe = ()=> import( '@/components/management/manage/subscribe/subscribe')  //服务号关注回复
const coupon = ()=> import( '@/components/management/manage/coupon/coupon')  //创建优惠券

/*import userInfo from '@/components/management/manage/userInfo/userInfo'
import certificate from '@/components/management/manage/certificate/certificate'
import certificateSend from '@/components/management/manage/certificateSend/certificateSend'
import templateMessage from '@/components/management/manage/templateMessage/templateMessage'
import addvip from '@/components/management/manage/addvip/addvip'
import openCourse from '@/components/management/manage/openCourse/openCourse'
import application from '@/components/management/manage/application/application'
import qrcode from '@/components/management/manage/qrcode/qrcode'
import survey  from '@/components/management/manage/survey/survey'  //问卷链接设置
import banner  from '@/components/management/manage/banner/banner'//首页banner
import lives  from '@/components/management/manage/lives/lives'  //首页直播
import activities  from '@/components/management/manage/activities/activities'  //线下活动编辑
import articles  from '@/components/management/manage/articles/articles'  //文章编辑
import social  from '@/components/management/manage/social/social'  //社群信息导入
import autoReply  from '@/components/management/manage/autoReply/autoReply'  //服务号自动回复
import subscribe  from '@/components/management/manage/subscribe/subscribe'  //服务号关注回复
import coupon  from '@/components/management/manage/coupon/coupon'  //创建优惠券*!/*/

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
