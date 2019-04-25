/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 运营路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const userInfo = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/userInfo/userInfo'
  ); //用户信息
const certificate = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/certificate/certificate'
  ); //添加证书
const certificateSend = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/certificateSend/certificateSend'
  ); // 发送证书
const application = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/application/application'
  ); //申请审批
const qrcode = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/qrcode/qrcode'
  ); //推广二维码
const survey = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/survey/survey'
  ); //问卷链接设置
const banner = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/banner/banner'
  ); //首页banner
const lives = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/lives/lives'
  ); //首页直播
const activities = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/activities/activities'
  ); //线下活动编辑
const articles = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/articles/articles'
  ); //文章编辑

const autoReply = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/autoReply/autoReply'
  ); //服务号自动回复
const subscribe = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/subscribe/subscribe'
  ); //服务号关注回复
const customerMessage = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/customerMessage/customerMessage'
  ); //客服消息

const statusFreeze = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/statusFreeze/statusFreeze'
  ); //学籍冻结
const statusunfreeze = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/statusUnfreeze/statusUnfreeze'
  ); //学籍解冻
const changeWeChat = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/changeWeChat/changeWeChat'
  ); //交换微信号
const classAdviser = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/classAdviser/classAdviser'
  ); //添加班主任
const classGroup = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/classGroup/classGroup'
  ); //添加班主任
const classAdviserManage = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/classAdviserManage/classAdviserManage'
  ); //班主任管理
const projectOpen = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/projectOpen/projectOpen'
  ); //项目开课时间
const picSource = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/picSource/picSource'
  ); //微信图片素材上传
const weChatMenu = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/weChatMenu/weChatMenu'
  ); //公众号菜单 管理
const articleSend = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/articleSend/articleSend'
  ); //文章定向发送 管理
const task = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/task/task'
  ); //任务保后台
const classGrouping = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/classGrouping'
  ); //任务保后台
const statusChange = () =>
  import (
    /* webpackChunkName: "manage" */ '@/components/management/manage/statusChange/statusChange'
  ); // 修改学籍
const classScheduling = () =>
  import ('@/components/management/manage/classScheduling/classScheduling'); // 体验课排期

export default [
  {path: 'userinfo', name: 'userInfo', component: userInfo},
  {path: 'certificate', name: 'certificate', component: certificate},
  {
    path: 'certificatesend',
    name: 'certificateSend',
    component: certificateSend,
  },
  {path: 'application', name: 'application', component: application},
  {path: 'qrcode', name: 'qrcode', component: qrcode},
  {path: 'survey', name: 'survey', component: survey},
  {path: 'banner', name: 'banner', component: banner},
  {path: 'lives', name: 'lives', component: lives},
  {path: 'activities', name: 'activities', component: activities},
  {path: 'articles', name: 'articles', component: articles},
  {path: 'autoreply', name: 'autoReply', component: autoReply},
  {path: 'subscribe', name: 'subscribe', component: subscribe},
  {
    path: 'customermessage',
    name: 'customerMessage',
    component: customerMessage,
  },
  {path: 'statusfreeze', name: 'statusFreeze', component: statusFreeze},
  {path: 'changewechat', name: 'changeWeChat', component: changeWeChat},
  {path: 'statusunfreeze', name: 'statusunfreeze', component: statusunfreeze},
  {path: 'classadviser', name: 'classAdviser', component: classAdviser},
  {
    path: 'classadvisermanage',
    name: 'classAdviserManage',
    component: classAdviserManage,
  },
  {path: 'projectopen', name: 'projectOpen', component: projectOpen},
  {path: 'picsource', name: 'picSource', component: picSource},
  {path: 'wechatmenu', name: 'weChatMenu', component: weChatMenu},
  {path: 'articlesend', name: 'articleSend', component: articleSend},
  {path: 'task', name: 'task', component: task},
  {path: 'classgrouping', name: 'classgrouping', component: classGrouping},
  {path: 'statuschange', name: 'statusChange', component: statusChange},
  {path: 'classgroup', name: 'classGroup', component: classGroup},
  {
    path: 'classScheduling',
    name: 'classScheduling',
    component: classScheduling,
  },
];
