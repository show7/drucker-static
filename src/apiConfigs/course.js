/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：课程接口
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'courseIntroduction': { //课程介绍
    'catalog': 'pc/operation/problem/catalog/load', // 获取小课主及次类别
    'sendData': 'pc/asst/problem/load', // 发送选择的标题名称
    'uploadAudio': 'pc/upload/audio/revise', //上传和修改语音文案接口
    'save': 'pc/operation/problem/save' //更新小课导入数据
  },
  'courseThinking': {
    'load': 'pc/operation/preview/load',//课前思考列表
    'update': 'pc/operation/preview/update',//新增和编辑
    'audioDb': 'pc/upload/audio/db',//上传语音返回id
  },
  'extension': {
    'load': 'pc/operation/extension/load',// 加载延伸学习的接口
    'detail': 'pc/operation/extension/load/detail', /*新增编辑获取信息接口*/
    'submit': 'pc/operation/extension/submit',//新增编辑提交
    'delete': 'pc/operation/extension/delete',//删除
  },
  'knowledge': {
    'list': 'pc/operation/knowledge/load/list', /*获取list*/
    'detail': 'pc/operation/knowledge/load/detail',//编辑的详情
    'submit': 'pc/operation/knowledge/submit',//提交知识点
    'media': 'pc/upload/deal/media',//提交获取语音和视频id
    'submitMedia': 'pc/operation/knowledge/submit/media',//绑定音频视频
  },
  'exerciseChoice': {
    'all': 'pc/operation/warmup/load/all',//根据课程加载选择题
    'insert': 'pc/operation/warmup/insert/practice',//提交添加的题目
    'knowledges': 'pc/operation/problem/get/knowledges',//获得知识点
    'submit': 'pc/operation/warmup/submit',//提交接口
    'delete':'pc/operation/warmup/delete/warmup',//删除
  },
  'application': {
    'homework': 'pc/operation/homework',//获取应用题
    'submit': 'pc/operation/application/submit',//提交
    'delete':'pc/operation/delete/applicationPractice',//删除
  },
  'card': {
    'load': 'pc/operation/essence/card/load',//知识卡list
    'submit': 'pc/operation/essence/card/submit',//提交
  },
  'assist': {
    'assistStandard': 'pc/operation/assist/standard/load',//加载规则
    'search':'pc/operation/assist/standard/search/load',//搜索
    'update':'pc/operation/assist/standard/update',//更新
  },
  'execution':{
    'load':'pc/operation/assist/execution/load',//加载
    'search':'pc/operation/assist/execution/search/load',//搜索
    'update':'pc/operation/assist/execution/update',//更新
  },
  'assistUpgrade':{
    'load':'pc/operation/assist/load',//加载
    'unassist':'pc/operation/assist/load/unassist',//加载非助教
    'catalog':'pc/operation/assist/load/catalog',//加载教练类别
    'add':'pc/operation/assist/add',//新增
    'update':'pc/operation/assist/update',//
  }
}
