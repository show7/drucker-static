import Vue from 'vue'
import Router from 'vue-router'
import management from '@/components/management/index'

const project = () => import('@/components/management/project/index')
const courseIntroduce = () => import('@/components/management/project/course/courseIntroduce/courseIntroduce')
/*import project  from '@/components/management/project/index'
import courseIntroduce  from '@/components/management/project/course/courseIntroduce/courseIntroduce'*/

const manage  = ()=> import('@/components/management/manage/index');
/*import manage from '@/components/management/manage/index'*/
import managerRouter from './manage'

const weChat = () => import('@/components/management/weChat/index');
/*import weChat from '@/components/management/weChat/index'*/
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
        }
      ]
    }
  ]
})
