import Vue from 'vue'
import Router from 'vue-router'
import management from '@/components/management/index'
import courseRouter from './course'
import managerRouter from './manage'
import wechatRouter from './weChat'
import steveRouter from './steve'

/*课程路由*/
const course = () => import(/* webpackChunkName: "course" */ '@/components/management/course/index')

/*运营路由*/
const manage = () => import(/* webpackChunkName: "manage" */'@/components/management/manage/index');

/*小程序路由*/
const weChat = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/index');

const steve = () => import(/* webpackChunkName: "wechat" */ '@/components/management/steve/index');

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/management',
      name: 'management',
      component: management,
      children: [
        {
          path: 'course',
          name: 'course',
          component: course,
          children: courseRouter
        },
        {
          path: 'manage',
          name: 'manage',
          component: manage,
          children: managerRouter
        },
        {
          path: 'wechat',
          name: 'weChat',
          component: weChat,
          children: wechatRouter
        },
        {
          path: 'steve',
          name: 'steve',
          component: steve,
          children: steveRouter
        }
      ]
    }
  ]
})
