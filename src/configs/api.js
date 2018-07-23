export default {
  'timeout': 60 * 1000, //超时请求时间，单位：毫秒
  'successStatusCode': 200,
  'prefix': {
    'dev': '/',
    'test': '',
    'sim': '',
    'prod': '/'
  },
  'suffix': { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
    'common': { // 公共接口
      'simple': 'pc/asst/problem/simple', // 获取小课标题
    },
    'project': {
      'course': { // 课程导入
        'courseIntroduction': { //课程介绍
          'catalog': 'pc/operation/problem/catalog/load', // 获取小课主及次类别
          'sendData': 'pc/asst/problem/load', // 发送选择的标题名称
          'uploadAudio': 'pc/upload/audio/revise', //上传和修改语音文案接口
          'save': 'pc/operation/problem/save' //更新小课导入数据
        }
      }
    },
    'manage': {
      'userInfo': 'pc/operation/user/search', //查询用户信息
      'groupInfo': 'pc/asst/load/classname/group', //获取班级的信息
      'classInfo': 'pc/operation/user/class/search', //查询班级人员信息
      'certificate':'rise/operation/backend/generate/special/certificate' , // 生成证书
      'certificateSend':{  //发送证书
        'generateCertificate':'rise/operation/backend/generate/certificate',// 证书正在生成中
        'sendCertificate':'rise/operation/backend/send/certificate',  //证书正在发送中
        'Attendance':'rise/operation/backend/generate/fullattendance', //发送全勤奖
      },
      'templates':{  //模板消息
        'loadTemplates':'pc/operation/load/templates',  // 得到模板消息类型
        'sendTemplate':'pc/operation/send/template/msg',//发送模板消息pc/operation/send/template/msg
      },
      'addVip':{ //添加会员
        'loadRiseMember':'pc/operation/load/member', // 获取会员类型接口
        'addRiseMember':'pc/operation/add/risemember/vip', // 添加会员
      },
      'openCourse':{ //新课/解锁课程
        'openCourseByriseIds':'rise/operation/backend/open/course/riseId',//新课/解锁课程提交
      },
      'application':{  //申请审批
        'applicationList':'pc/operation/bs/application/list', //获取审核列表
        'applicationBs':'pc/operation/notice/bs/application', //发送审核结果
        'approveBusinessApplication':'pc/operation/bs/application/approve' , //提交审批结果
        'rejectBusinessApplication':'pc/operation/bs/application/reject',// 拒绝通过
        'interviewerList':'pc/operation/interviewer/list',  //获得面试官接口
        'assignInterviewer':'pc/operation/assign/interviewer', //发送面试官
        'sendCheckedApplication':'pc/operation/notice/bs/application',//发送审核结果
      },
      'qrCode':'subscribe/rule/tmp/qrCode' , //推广二维码
      'survey': {   // 调查问卷
        'surveyList':'pc/operation/survey/config/list', //获取问卷list
        'surveyConfig':'pc/operation/survey/config', //修改新增问卷
      },
      'home':{   // 首页banner变价
        'bannersList':'backend/flow/banners', //获取banner列表
        'bannerInsert':'backend/flow/banner/insert' , //插入一条banner
        'bannerUpdate':'backend/flow/banner/update' , //更新banner
        'bannerDelete':'backend/flow/delete/banner' , //删除banner
      },
      'lives':{  //直播内容编辑
        'livesList':'backend/flow/lives' , //直播内容list
        'livesInsert':'backend/flow/lives/insert',//插入
        'livesUpdate':'backend/flow/lives/update',//更新
        'livesDelete':'backend/flow/delete/lives', //删除
      }
    }
  }
};
