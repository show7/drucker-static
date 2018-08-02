import Vue from 'vue'
import Router from 'vue-router'
import management from '@/components/management/index'

const project = () => import(/* webpackChunkName: "project" */ '@/components/management/project/index')
const courseIntroduce = () => import(/* webpackChunkName: "project" */ '@/components/management/project/course/courseIntroduce/courseIntroduce')

const manage  = ()=> import(/* webpackChunkName: "manage" */'@/components/management/manage/index');
import managerRouter from './manage'

const weChat = () => import(/* webpackChunkName: "wechat" */ '@/components/management/weChat/index');
import wechatRouter from './weChat'

const steve = () => import(/* webpackChunkName: "wechat" */ '@/components/management/steve/index');
import steveRouter from './steve'


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
          children: managerRouter
        },
        {
          path:'wechat',
          name:'weChat',
          component:weChat,
          children: wechatRouter
        },
        {
          path:'steve',
          name:'steve',
          component:steve,
          children: steveRouter
        }
      ]
    }
  ]
})
