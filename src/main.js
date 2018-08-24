/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件名：src -> main.js
3. 作者：liyang@iquanwai.com
4. 备注：全局js
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

import Vue from 'vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/theme/index.css'
import App from './App'
import router from './router'
import apiDataFilter from "./libraries/apiDataFilter";
import { initSentry } from './libraries/sentry'

router.beforeEach((to, from, next) => {
  let param = {uri: to.path};
  apiDataFilter.request({
    apiPath: 'common.permission',
    method: 'post',
    data: param,
    successCallback(res) {
      if (res.msg) {
          next();
      } else {
        if (from.name) {
          alert('抱歉，当前页面无权访问');
          next({path: from.path})
        } else {
          alert('抱歉，当前页面无权访问');
          window.location.href = '/403.jsp';
          next()
        }
      }
    }
  })
});

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
vue插件使用
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

Vue.use(VueResource)
Vue.use(ElementUI)
initSentry(Vue)

/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
关闭生产模式下给出的提示
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
