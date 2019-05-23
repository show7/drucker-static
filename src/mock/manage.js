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
  loadPageList: {
    url: '/pc/flow/channel/PageList/load',
    res: {
      code: 200,
      msg: {
        a: '你妈'
      },
      methods: 'get'
    }
  }
}

for (let key in putInHistory) {
  console.log(key, putInHistory[key])
  Mock.mock(putInHistory[key].url, putInHistory[key].methods, putInHistory[key].res);
}
