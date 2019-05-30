const Mock = require('mockjs')
const putInHistory = {
  // loadSelectInfo: {
  //   url: '/pc/flow/channel/types/config',
  //   res: {
  //     code: 200,
  //     msg: {}
  //   },
  //   methods: 'get'
  // },
  // saveGenerate: {
  //   url: '/pc/flow/channel/qrCode/save',
  //   res: {
  //     code: 200,
  //     msg: {},
  //     methods: 'get'
  //   }

  // },
  loadSelectInfo: {
    url: '/pc/loadSelectInfo',
    res: {
      code: 200,
      msg: {
        projectList: [{
          label: 'l1项目',
          value: 12
        }, {
          label: 'l2项目',
          value: 10
        }, {
          label: 'l3项目',
          value: 8
        }],
        claimStatusList: [{
          label: '未认领',
          value: 0
        }, {
          label: '待审核',
          value: 1
        }, {
          label: '审核完成',
          value: 2
        }],
        teacherList: [{
          label: '小泽玛利亚',
          value: 0
        }, {
          label: '泷泽萝拉',
          value: 1
        }]
      },
      methods: 'get'
    }
  },
  loadPageList: {
    url: '/pc/flow/channel/PageList/load',
    res: {
      code: 200,
      msg: {
        a: '你妈'
      },
      methods: 'get'
    }
  },
  confirmClaim: {
    url: '/pc/performance/order/appl',
    res: {
      code: 200,
      msg: 'ok'
    }
  },
  loadScreeningList: {
    url: '/pc/performance/order/loa',
    res: {
      code: 200,
      msg: [{
        riseId: 12345, //圈外id
        disputeId: 1,
        status: 0,
        reason: '我认为是对的，他就是对的', //认领理由
        proofPictures: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', //
        teacher: 1, //认领老师
        nickname: '德玛西亚', //用户微信昵称
        flowClassName: '个人发展战略24期23班', //体验课班级
        teacherInfo: '班主任-昵称',
        sellTeacherInfo: '班主任-昵称',
        buyCourse: 'L1项目', //购买课程
        paidTime: '2018-10-11', //支付时间
        price: '2011000' //实收金额

      }, {
        riseId: 12345, //圈外id
        disputeId: 2,
        status: 1,
        reason: '我认为是对的，他就是对的', //认领理由
        teacher: 1, //认领老师
        proofPictures: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        nickname: '德玛西亚', //用户微信昵称
        flowClassName: '个人发展战略24期23班', //体验课班级
        teacherInfo: '班主任-昵称',
        sellTeacherInfo: '班主任-昵称',
        buyCourse: 'L1项目', //购买课程
        paidTime: '2018-10-11', //支付时间
        price: '2011000' //实收金额

      }, {
        riseId: 12345, //圈外id
        disputeId: 3,
        status: 2,
        reason: '我认为是对的，他就是对的', //认领理由
        teacher: 1, //认领老师
        proofPictures: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        nickname: '德玛西亚', //用户微信昵称
        flowClassName: '个人发展战略24期23班', //体验课班级
        teacherInfo: '班主任-昵称',
        sellTeacherInfo: '班主任-昵称',
        buyCourse: 'L1项目', //购买课程
        paidTime: '2018-10-11', //支付时间
        price: '2011000' //实收金额

      }],
      methods: 'post'
    }
  }
}

for (let key in putInHistory) {
  console.log(key, putInHistory[key])
  Mock.mock(putInHistory[key].url, putInHistory[key].methods, putInHistory[key].res);
}
