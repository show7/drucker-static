import Vue from 'vue'
import Router from 'vue-router'
import contentMain from '@/components/content/contentMain'

const project = () => import(/* webpackChunkName: "content" */ '@/components/content/project/project')
const courseIntroduce = () => import(/* webpackChunkName: "content" */ '@/components/content/project/course/courseIntroduce/courseIntroduce')

const manage = () => import(/* webpackChunkName: "manage" */ '@/components/content/manage/manage')
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
