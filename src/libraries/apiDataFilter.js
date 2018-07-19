import Vue from 'vue';
import apiConf from '@/configs/api';
import '@/libraries/jquery.tips';
import { Loading } from 'element-ui';
import { Message } from 'element-ui'
/*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
apiDataFilter的定义
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/

let apiDataFilter = {
  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求数据 , successCallback的唯一参数为：response，返回的json数据应该这样取得：response.body
    @method : get | post | jsonp
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  request ({apiPath, data = {}, pathParams = [], method = 'get', contentType = 'application/json', jsonp = 'callback', successCallback, errorCallback}) {
    let apiUrl = this.pathParamsToUrl(apiPath, pathParams);
    let loadingInstance = Loading.service();
    method = method.toLowerCase();
    let opts = {
      'timeout': apiConf.timeout,
      'headers': {}
    };
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        如果启用jsonp模式，而且如果设置了jsonp参数
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    if (method === 'post') {
      if (contentType) opts.headers['content-type'] = contentType;
    } else if (method === 'jsonp' || method === 'get') {
      opts.params = data;
      if (method === 'jsonp' && jsonp !== '' && jsonp !== undefined) opts.jsonp = jsonp;
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        不是生产环境在控制台输出请求log
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    if (this.getEnv() !== 'prod') {
      console.log('http请求(' + apiUrl + ')后端接口数据(' + method + ')：' + JSON.stringify(data));
    }
    /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        发起请求
        -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
    errorCallback = errorCallback || this.errorCallback;
    if (method === 'post') {
      Vue.http[method](apiUrl, data, opts).then((res) => {
        if (parseInt(res.body.code, 10) === apiConf.successStatusCode)  {successCallback(res.body) ;}
         else { errorCallback(res && res.body.msg);}
          loadingInstance.close()
      }, ()=>{ errorCallback ;loadingInstance.close()});
    } else if (method === 'jsonp' || method === 'get') {
      Vue.http[method](apiUrl, opts).then((res) => {
        if (parseInt(res.body.code, 10) === apiConf.successStatusCode) {successCallback(res.body);}
         else { errorCallback(res && res.body && res.body.msg, res);}
          loadingInstance.close()
      }, ()=>{ errorCallback ;loadingInstance.close()});
    }

  },
  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    通过域名来获取当前阶段环境
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  getEnv () {
    let env = 'dev';
    let domain = document.domain;
    switch (domain) {
      case 'mypc.test.iqw' :
        env = 'test';
        break;
      case 'mypc.sim.iqw' :
        env = 'sim';
        break;
      case 'www.iquanwai.com' :
        env = 'prod';
        break;
      default :
        env = 'dev';
        break;
    }
    return env;
  },
  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    请求错误处理方法
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  errorCallback (res, arg) {
    //console.log(res);
    Message.error(typeof res === 'string' && res || '网络错误，请重试^_^');
  },
  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    根据apiPath返回apiUrl
    @apiPath：从api配置中suffix往下层写如："example.rent.detail"
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  pathToUrl (apiPath) {
    let pathArray = apiPath.split('.');
    let prefix = apiConf.prefix[this.getEnv()];
    let suffix = apiConf.suffix;
    for (let n = 0; n < pathArray.length; n++) {
      suffix = suffix[pathArray[n]];
    }
    if (suffix === undefined) suffix = '';
    return prefix + suffix;
  },

  /**++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   拼接路径参数 返回路径
   -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  pathParamsToUrl (apiPath, pathParams) {
    let path = this.pathToUrl(apiPath);
    if (pathParams && pathParams.length > 0) {
      pathParams.forEach((item, index) => {
        path += `/${item}`
      })
    }
    return path
  }
}

export default apiDataFilter;
