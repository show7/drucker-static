import Vue from 'vue'
import Router from 'vue-router'
import contentMain from '@/components/content/index'

const project = () => import(/* webpackChunkName: "project" */ '@/components/content/project/index')
const courseIntroduce = () => import(/* webpackChunkName: "project" */ '@/components/content/project/course/courseIntroduce/courseIntroduce')

const manage = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/index')
import managerRouter from './manage'

const weChat = () => import(/* webpackChunkName: "manage" */ '@/components/content/weChat/index')
import wechatRouter from './weChat'
Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/management',
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
          children: managerRouter
        },
        {
          path:'wechat',
          name:'weChat',
          component:weChat,
          children: wechatRouter
        }
      ]
    }
  ]
})
