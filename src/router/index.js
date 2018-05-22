import Vue from 'vue'
import Router from 'vue-router'
import projectMain from '@/components/project/projectMain'

const projectOne = () => import(/* webpackChunkName: "projectOne" */ '@/components/project/projectOne/projectOne')
const projectTwo = () => import(/* webpackChunkName: "projectTwo" */ '@/components/project/projectTwo/projectTwo')
const helloWorld = () => import(/* webpackChunkName: "projectOne" */ '@/components/project/projectOne/helloWorld/helloWorld')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/project',
      name: "projectMain",
      component: projectMain,
      children: [
        {
          path: '/',
          name: "projectOne",
          component: projectOne,
          children: [
            {
              path: 'helloWorld',
              name: "helloWorld",
              component: helloWorld,
            }
          ]
        },
        {
          path: 'projectTwo',
          name: "projectTwo",
          component: projectTwo,
        }
      ]
    }
  ]
})
