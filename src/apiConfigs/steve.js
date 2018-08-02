/*++----------------------------------------------------------------------------------------------------------------------------------------------------------------------
1. 项目名称：drucker-static
2. 文件功能：steve,数据化运营
3. 作者：liyang@iquanwai.com
4. 备注：
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
export default {
  'query': 'steve/query/sql', //获取list
  'job': {
    'list': 'steve/quartz/jobs',
    'add':'steve/quartz/job/add',
    'delete':'steve/quartz/job/delete',
  }
}
