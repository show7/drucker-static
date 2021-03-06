
/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能： 课程路由
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
const courseIntroduce = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseIntroduce/courseIntroduce') //课程导入
const courseKnowledge = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseKnowledge/courseKnowledge') //课程知识导入
const courseThinking = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseThinking/courseThinking') // 课前思考导入
const courseExtended = () => import(/* webpackChunkName: "course" */ '@/components/management/course/courseExtended/courseExtended') // 拓展学习
const exerciseChoice = () => import(/* webpackChunkName: "course" */ '@/components/management/course/exerciseChoice/exerciseChoice') // 选择题管理
const exerciseApplication = () => import(/* webpackChunkName: "course" */ '@/components/management/course/exerciseApplication/exerciseApplication') // 应用题管理
const knowledgeCard = () => import(/* webpackChunkName: "course" */ '@/components/management/course/knowledgeCard/knowledgeCard') // 卡片管理
const fileupload = () => import(/* webpackChunkName: "course" */ '@/components/management/course/picUpload/picUpload')//文件上传
const richText = () => import(/* webpackChunkName: "course" */ '@/components/management/course/richText/richText')//富文本上传
const assistStandard = ()=> import(/* webpackChunkName: "course" */ '@/components/management/course/assistStandard/assistStandard')//助教测评标准
const assistExecution = ()=> import(/* webpackChunkName: "course" */ '@/components/management/course/assistExecution/assistExecution')//助教完成情况
const assistUpgrade = ()=>import(/* webpackChunkName: "course" */ '@/components/management/course/assistUpgrade/assistUpgrade')//助教升降级
const audioCourse = ()=>import(/* webpackChunkName: "course" */ '@/components/management/course/audioCourse/audioCourse')//音频课管理
const social = () => import(/* webpackChunkName: "course" */ '@/components/management/course/social/social') //群组信息导入

export default [
  { path: 'courseintroduce', name: 'courseIntroduce', component: courseIntroduce },
  { path: 'courseknowledge', name: 'courseKnowledge', component: courseKnowledge },
  { path: 'coursethinking', name: 'courseThinking', component: courseThinking },
  { path: 'courseextended', name: 'courseExtended', component: courseExtended },
  { path: 'exercisechoice', name: 'exerciseChoice', component: exerciseChoice },
  { path: 'exerciseapplication', name: 'exerciseApplication', component: exerciseApplication },
  { path: 'knowledgecard', name: 'knowledgeCard', component: knowledgeCard },
  { path: 'fileupload', name: 'fileupload', component: fileupload },
  { path: 'richtext', name: 'richText', component: richText },
  { path: 'assiststandard', name: 'assistStandard', component: assistStandard },
  { path: 'assistexecution', name: 'assistExecution', component: assistExecution },
  { path: 'assistupgrade', name: 'assistUpgrade', component: assistUpgrade },
  { path: 'social', name: 'social', component: social},
  { path: 'audiocourse', name: 'audioCourse', component: audioCourse },

]
