'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const targetUrl = 'https://www.confucius.mobi'
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/steve/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/pc/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/rise/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/subscribe/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/cache/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/backend/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/file/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      },
      '/wx/*': {
        target: targetUrl,
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
            return 'index.html'
          }
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 4001, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: process.env.VERSION ?
      `https://static.iqycamp.com/script/drucker_js/${process.env.VERSION}/` : '/script/drucker_js/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: 'source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
