import weChat from './weChat'
import manage from './manage'
import steve from './steve'
import course from './course'
import admin from './admin'
import advance from './advance'

export default {
  'timeout': 60 * 1000, //超时请求时间，单位：毫秒
  'successStatusCode': 200,
  'prefix': {
    'dev': '/',
    'test': '/',
    'sim': '/',
    'prod': '/'
  },
  'suffix': { //后缀代表接口去掉prefix的部分，这里可以是无限级的树状结构，根据自己的需要
    'common': { // 公共接口
      'simple': 'pc/asst/problem/simple' ,// 获取小课标题
      'permission':'pc/permission/check',//权限
      'auth':'wx/oauth/pc/auth',//登录
      'info':'rise/customer/info'
    },
    'course': course,
    'manage': manage,
    'weChat': weChat,
    'steve': steve,
    'admin': admin,
    'advance': advance,
  }
};
