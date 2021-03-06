/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：steve,数据化运营
3. 作者：zhenzikang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'query': 'steve/query/sql', //获取list
  'job': { // 任务相关
    'list': 'steve/quartz/jobs', // 获取任务列表
    'add': 'steve/quartz/job/add', // 添加任务
    'delete': 'steve/quartz/job/delete', // 删除任务
    'action': 'steve/quartz/job/action' // 执行任务
  }
}
