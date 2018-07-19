import Vue from 'vue'
import Router from 'vue-router'
import contentMain from '@/components/content/contentMain'

const project = () => import(/* webpackChunkName: "content" */ '@/components/content/project/project')
const courseIntroduce = () => import(/* webpackChunkName: "content" */ '@/components/content/project/course/courseIntroduce/courseIntroduce')

const manage = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/manage')
/*
const userInfo = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/userInfo/userInfo')   //用户信息
const certificate = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/certificate/certificate')    //添加证书
const certificateSend = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/certificateSend/certificateSend') // 发送证书
const templateMessage = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/templateMessage/templateMessage') //模板消息
const addvip = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/addvip/addvip')               // 添加vip
const openCourse = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/openCourse/openCourse')  //新开/解锁课程
const application = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/application/application')  //申请审批
const qrcode = () => import(/!* webpackChunkName: "manage" *!/ '@/components/content/manage/qrcode/qrcode')  //推广二维码
*/
import manager from './manage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/content',
      name: 'contentMain',
      component: contentMain,
      children: [
        {
          path: 'project',
          name: 'project',
          component: project,
          children: [
            {
              path: 'course/courseintroduce',
              name: 'courseIntroduce',
              component: courseIntroduce
            }
          ]
        },
        {
          path: 'manage',
          name: 'manage',
          component: manage,
          children: manager
        }
      ]
    }
  ]
})
