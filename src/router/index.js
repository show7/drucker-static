import Vue from 'vue'
import Router from 'vue-router'
import contentMain from '@/components/content/contentMain'

const project = () => import(/* webpackChunkName: "content" */ '@/components/content/project/project')
const projectTwo = () => import(/* webpackChunkName: "projectTwo" */ '@/components/content/projectTwo/projectTwo')
const courseIntroduce = () => import(/* webpackChunkName: "content" */ '@/components/content/project/course/courseIntroduce/courseIntroduce')
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
          path: 'projectTwo',
          name: 'projectTwo',
          component: projectTwo
        }
      ]
    }
  ]
})
