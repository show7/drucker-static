
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 课程路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const courseIntroduce = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseIntroduce/courseIntroduce') //小课导入
const courseKnowledge = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseKnowledge/courseKnowledge') //小课知识导入
const courseThinking = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseThinking/courseThinking') // 课前思考导入
const courseExtended = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseExtended/courseExtended') // 拓展学习
const exerciseChoice = () => import(/* webpackChunkName: "course" */ '@/components/management/course/exerciseChoice/exerciseChoice') // 选择题管理
const exerciseApplication = () => import(/* webpackChunkName: "course" */ '@/components/management/course/exerciseApplication/exerciseApplication') // 应用题管理
const knowledgeCard = () => import(/* webpackChunkName: "course" */ '@/components/management/course/knowledgeCard/knowledgeCard') // 卡片管理

export default [
  { path: 'courseintroduce', name: 'courseIntroduce', component: courseIntroduce },
  { path: 'courseknowledge', name: 'courseKnowledge', component: courseKnowledge },
  { path: 'coursethinking', name: 'courseThinking', component: courseThinking },
  { path: 'courseextended', name: 'courseExtended', component: courseExtended },
  { path: 'exercisechoice', name: 'exerciseChoice', component: exerciseChoice },
  { path: 'exerciseapplication', name: 'exerciseApplication', component: exerciseApplication },
  { path: 'knowledgecard', name: 'knowledgeCard', component: knowledgeCard },

]
