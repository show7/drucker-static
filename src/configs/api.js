export default {
  "timeout": 60 * 1000,  //超时请求时间，单位：毫秒
  "successStatusCode": 200,
  "prefix": {
    "dev": "/",
    "test": "",
    "sim": "",
    "prod": "/"
  },
  "suffix": { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
    "common":{  // 公共接口

    },
    "project": {
      "course": {   // 课程导入
        "courseIntroduction": {   //课程介绍
          "catalog": 'pc/operation/problem/catalog/load'  , // 获取小课主及次类别
          "simple": "pc/asst/problem/simple", // 获取小课标题
          "sendData": "pc/asst/problem/load" , // 发送选择的标题名称
        }
      },
    }
  }
};
