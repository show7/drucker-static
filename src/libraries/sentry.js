// sentry
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

function initSentry(Vue) {
  console.log(`init sentry:${window.ENV.release},dsn:${window.ENV.sentryDsn}`)
  Raven
    .config(window.ENV.sentryDsn, { release: window.ENV.release })
    .addPlugin(RavenVue, Vue)
    .install()

  // 监控js资源加载错误
  window.addEventListener('error', event => {
    if(event.target && event.target.src && (event.target.src.indexOf('.js') !== -1 || event.target.src.indexOf('.css') !== -1)) {
      // 加载错误
      console.log(`加载错误,链接地址:${event.target.src}`)
      if(event.target.src.indexOf('.js') !== -1) {
        Raven.captureException(new Error(`Javascript Resource Error:${event.target.src}`), { fingerprint: [ 'javascript', 'resource', event.target.src ] })
      } else {
        Raven.captureException(new Error(`css Resource Error:${event.target.src}`), { fingerprint: [ 'css', 'resource', event.target.src ] })
      }
    }
  }, true)
}

/*
 * {
 * release: development
 * })
 */

function setSentryUserContext(data) {
  Raven.setUserContext(data)
}

export {
  Raven, setSentryUserContext, initSentry
}
