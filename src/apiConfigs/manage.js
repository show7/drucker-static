/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：运营接口
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  userInfo: 'pc/operation/user/search', //查询用户信息
  groupInfo: 'pc/asst/load/classname/group', //获取班级的信息
  classInfo: 'pc/operation/user/class/search', //查询班级人员信息
  certificate: 'rise/operation/backend/generate/special/certificate', // 生成证书
  certificateSend: {
    //发送证书
    generateCertificate: 'rise/operation/backend/generate/certificate', // 证书正在生成中
    sendCertificate: 'rise/operation/backend/send/certificate', //证书正在发送中
    learnList: 'pc/operation/memberType/load/list', // 学习项目列表
    templateList: 'pc/operation/memberType/load/masterplate' // 获取证书列表
  },
  templates: {
    //模板消息
    loadTemplates: 'pc/operation/load/templates', // 得到模板消息类型
    sendTemplate: 'pc/operation/send/template/msg' //发送模板消息pc/operation/send/template/msg
  },
  addVip: {
    //添加会员
    loadRiseMember: 'pc/operation/load/member', // 获取会员类型接口
    addRiseMember: 'pc/operation/add/risemember/vip' // 添加会员
  },
  openCourse: {
    //新课/解锁课程
    openCourseByRiseIds: 'rise/operation/backend/open/course/riseId' //新课/解锁课程提交
  },
  addCourse: {
    //添加课表
    addCourseByRiseIds: 'pc/operation/add/course' //添加课表提交
  },
  application: {
    //申请审批
    applicationList: 'pc/operation/bs/application/list', //获取审核列表
    applicationBs: 'pc/operation/notice/bs/application', //发送审核结果
    approveBusinessApplication: 'pc/operation/bs/application/approve', //提交审批结果
    rejectBusinessApplication: 'pc/operation/bs/application/reject', // 拒绝通过
    interviewerList: 'pc/operation/interviewer/list', //获得面试官接口
    assignInterviewer: 'pc/operation/assign/interviewer', //发送面试官
    sendCheckedApplication: 'pc/operation/notice/bs/application' //发送审核结果
  },
  qrCode: 'subscribe/rule/tmp/qrCode', //推广二维码
  channel: {
    rules: 'subscribe/rule/channels'
  },
  survey: {
    // 调查问卷
    surveyList: 'pc/operation/survey/config/list', //获取问卷list
    surveyConfig: 'pc/operation/survey/config' //修改新增问卷
  },
  home: {
    // 首页banner变价
    bannersList: 'pc/operation/flow/banners', //获取banner列表
    bannerInsert: 'pc/operation/flow/banner/insert', //插入一条banner
    bannerUpdate: 'pc/operation/flow/banner/update', //更新banner
    bannerDelete: 'pc/operation/flow/delete/banner' //删除banner
  },
  lives: {
    //直播内容编辑
    livesList: 'pc/operation/flow/lives', //直播内容list
    livesInsert: 'pc/operation/flow/lives/insert', //插入
    livesUpdate: 'pc/operation/flow/lives/update', //更新
    livesDelete: 'pc/operation/flow/delete/lives' //删除
  },
  activities: {
    //线下活动编辑
    activitiesList: 'pc/operation/flow/activities', //线下活动list
    activitiesInsert: 'pc/operation/flow/activities/insert', //插入
    activitiesUpdate: 'pc/operation/flow/activities/update', //更新
    activitiesDelete: 'pc/operation/flow/delete/activities' //删除
  },
  articles: {
    //文章
    articlesList: 'pc/operation/flow/articles', //线下活动list
    articlesInsert: 'pc/operation/flow/article/insert', //插入
    articlesUpdate: 'pc/operation/flow/article/update', //更新
    articlesDelete: 'pc/operation/flow/delete/articles' //删除
  },
  reply: {
    //服务号自动回复
    loadList: 'pc/operation/message/reply/load/text', //自动回复列表
    replyUpdate: 'pc/operation/message/reply/update', //更新
    replyAdd: 'pc/operation/message/reply/add', //新增
    replyDel: 'pc/operation/message/reply/del', //删除
    cache: 'cache/weixin/message/reload' //清缓存
  },
  subscribe: {
    //服务号关注回复
    subscribeLoad: 'pc/operation/message/subscribe/load', //获取list
    subscribeUpdate: 'pc/operation/message/subscribe/update' //更新
  },
  coupon: {
    couponAdd: 'pc/operation/add/coupon', //添加优惠券
    loadType: 'pc/operation/load/coupon/category' //优惠券类型
  },
  customerMessage: {
    send: 'pc/operation/send/customer/msg' //发送客服消息
  },
  statuschange: {
    options: 'pc/operation/load/member', // 类型列表
    load: 'pc/operation/load/classinfo', // 学籍列表
    update: 'pc/operation/update/classinfo' // 更新学籍信息
  },
  statusFreeze: {
    freeze: 'pc/operation/freeze/member' //冻结学籍
  },
  changeWeChat: {
    change: 'pc/operation/change/wechat' //交换微信号
  },
  statusUnfreeze: {
    unfreeze: 'pc/operation/unfreeze/member', //解冻
    classname: 'pc/asst/load/classname/group' //班级
  },
  classAdviser: {
    rotates: 'pc/operation/load/project/rotates', //加载班主任项目
    targetRotates: 'pc/operation/load/target/rotates', //加载班主任
    update: 'pc/operation/update/rotate', //提交
    teachers: 'pc/operation/load/head/teachers', //加载选择班主任
    add: 'pc/operation/add/rotate' //新增
  },
  classGroup: {
    loadOpendate: 'pc/operation/enter/group/load/opendate', //加载筛选条件
    loadQrCode: 'pc/operation/enter/group/load/qrCode', //加载指定条件课程
    teachers: 'pc/operation/load/head/teachers', //加载选择班主任
    add: 'pc/operation/enter/group/add', //新增
    del: 'pc/operation/enter/group/del' //删除
  },
  coin: {
    rppoint: 'pc/wxmini/submit/rppoint' //礼金提交
  },
  classAdviserManage: {
    loadList: 'pc/operation/teacher/load/list', //加载list
    loadUser: 'pc/operation/teacher/load', //查询人
    add: 'pc/operation/teacher/add' //添加
  },
  invest: {
    investTask: 'pc/operation/load/invest/task', //投资圈外列表
    record: 'pc/operation/submit/invest/record' //提交投资
  },
  couponClear: {
    load: 'pc/operation/load/coupons', //获取列表
    delete: 'pc/operation/delete/coupon' //删除优惠券
  },
  projectOpen: {
    configs: 'pc/operation/load/month/configs', //load项目
    updateConfig: 'pc/operation/update/month/config' //新增和编辑
  },
  task: {
    load: 'pc/promotion/config/loadAll', // 获取任务列表
    update: 'pc/promotion/config/save', // 更新任务
    test: 'pc/promotion/config/test' // 测试消息
  },
  classScheduling: {
    load: 'pc/drainage/term/load', //加载类型
    save: 'pc/drainage/term/save', //编辑&新增
    del: 'pc/drainage/term/del', //删除
    getInfo: 'pc/drainage/classmate/init', //获取学院信息
    getQuery: 'pc/drainage/classmate/query', //获取学院信息
    getQuestion: 'pc/drainage/classmate/query/question' //获取问卷信息
  },
  classSort: {
    load: 'pc/drainage/term/load', //加载类型
    del: 'pc/drainage/class/del', //删除排期
    listLoad: 'pc/drainage/class/load', //根据条件加载类型
    loadTeacher: 'pc/drainage/load/all/teacher', //加载老师
    saveTeacher: 'pc/drainage/class/teacher/save', //添加班主任
    saveGroup: 'pc/drainage/class/group/save', //添加群二维码
    upClass: 'pc/drainage/class/update',
    flowInfo: 'pc/drainage/class/load/flow/info', //查看分布
    historyName: 'pc/drainage/load/pre/teacher'
  },
  publicCheck: {
    load: 'pc/wechat/load/recommend', //加载类型 manage.publicCheck.load
    deal: 'pc/wechat/deal/recommend' //处理订阅号推荐 manage.publicCheck.deal
  },
  putInHistory: {
    loadSelectInfo: 'pc/flow/channel/types/config', //加载下拉框选项
    saveGenerate: 'pc/flow/channel/qrCode/save',
    loadPageList: 'pc/flow/channel/history',
    channelAnalysis: 'pc/flow/channel/analysis', //渠道分析
    delete: 'pc/flow/channel/qrCode/delete'
  },
  salesOrder: {
    loadScreeningList: 'pc/performance/order/load', //筛选查询
    confirmClaim: 'pc/performance/order/apply', //确认认领
    loadSelectInfo: 'pc/performance/init', //加载下拉信息,
    delete: 'pc/performance/order/delete', //删除
    rejectAndAdopt: 'pc/performance/order/check' //驳回&&通过申请
  }
}
