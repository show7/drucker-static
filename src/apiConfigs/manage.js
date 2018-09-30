/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：运营接口
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'userInfo': 'pc/operation/user/search', //查询用户信息
  'groupInfo': 'pc/asst/load/classname/group', //获取班级的信息
  'classInfo': 'pc/operation/user/class/search', //查询班级人员信息
  'certificate': 'rise/operation/backend/generate/special/certificate', // 生成证书
  'certificateSend': { //发送证书
    'generateCertificate': 'rise/operation/backend/generate/certificate', // 证书正在生成中
    'sendCertificate': 'rise/operation/backend/send/certificate', //证书正在发送中
    'Attendance': 'rise/operation/backend/generate/fullattendance' //发送全勤奖
  },
  'templates': { //模板消息
    'loadTemplates': 'pc/operation/load/templates', // 得到模板消息类型
    'sendTemplate': 'pc/operation/send/template/msg'//发送模板消息pc/operation/send/template/msg
  },
  'addVip': { //添加会员
    'loadRiseMember': 'pc/operation/load/member', // 获取会员类型接口
    'addRiseMember': 'pc/operation/add/risemember/vip' // 添加会员
  },
  'openCourse': { //新课/解锁课程
    'openCourseByriseIds': 'rise/operation/backend/open/course/riseId'//新课/解锁课程提交
  },
  'application': { //申请审批
    'applicationList': 'pc/operation/bs/application/list', //获取审核列表
    'applicationBs': 'pc/operation/notice/bs/application', //发送审核结果
    'approveBusinessApplication': 'pc/operation/bs/application/approve', //提交审批结果
    'rejectBusinessApplication': 'pc/operation/bs/application/reject', // 拒绝通过
    'interviewerList': 'pc/operation/interviewer/list', //获得面试官接口
    'assignInterviewer': 'pc/operation/assign/interviewer', //发送面试官
    'sendCheckedApplication': 'pc/operation/notice/bs/application'//发送审核结果
  },
  'qrCode': 'subscribe/rule/tmp/qrCode', //推广二维码
  'survey': { // 调查问卷
    'surveyList': 'pc/operation/survey/config/list', //获取问卷list
    'surveyConfig': 'pc/operation/survey/config' //修改新增问卷
  },
  'home': { // 首页banner变价
    'bannersList': 'pc/operation/flow/banners', //获取banner列表
    'bannerInsert': 'pc/operation/flow/banner/insert', //插入一条banner
    'bannerUpdate': 'pc/operation/flow/banner/update', //更新banner
    'bannerDelete': 'pc/operation/flow/delete/banner' //删除banner
  },
  'lives': { //直播内容编辑
    'livesList': 'pc/operation/flow/lives', //直播内容list
    'livesInsert': 'pc/operation/flow/lives/insert', //插入
    'livesUpdate': 'pc/operation/flow/lives/update', //更新
    'livesDelete': 'pc/operation/flow/delete/lives' //删除
  },
  'activities': { //线下活动编辑
    'activitiesList': 'pc/operation/flow/activities', //线下活动list
    'activitiesInsert': 'pc/operation/flow/activities/insert', //插入
    'activitiesUpdate': 'pc/operation/flow/activities/update', //更新
    'activitiesDelete': 'pc/operation/flow/delete/activities' //删除
  },
  'articles': { //文章
    'articlesList': 'pc/operation/flow/articles', //线下活动list
    'articlesInsert': 'pc/operation/flow/article/insert', //插入
    'articlesUpdate': 'pc/operation/flow/article/update', //更新
    'articlesDelete': 'pc/operation/flow/delete/articles' //删除
  },
  'reply': { //服务号自动回复
    'loadList': 'pc/operation/message/reply/load/text', //自动回复列表
    'replyUpdate': 'pc/operation/message/reply/update', //更新
    'replyAdd': 'pc/operation/message/reply/add', //新增
    'replyDel': 'pc/operation/message/reply/del', //删除
    'cache': 'cache/weixin/message/reload'//清缓存
  },
  'subscribe': { //服务号关注回复
    'subscribeLoad': 'pc/operation/message/subscribe/load', //获取list
    'subscribeUpdate': 'pc/operation/message/subscribe/update' //更新
  },
  'coupon': {
    'couponAdd': 'pc/operation/add/coupon', //添加优惠券
    'loadType': 'pc/operation/load/couponConfig'//优惠券类型
  },
  'employee':{
    'list':'pc/operation/employee/list',//员工list
    'add':'pc/operation/employee/add',//添加新员工
    'del':'pc/operation/employee/del',//删除
  },
  'customerMessage':{
    'send':'pc/operation/send/customer/msg', //发送客服消息
  }
}
