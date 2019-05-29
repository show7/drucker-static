export default {
  refund: {
    load: 'pc/advance/pay/info', //加载信息
    refund: 'pc/advance/refund' //退款
  },
  employee: {
    list: 'pc/operation/employee/list', //员工list
    edit: 'pc/operation/employee/edit', //添加新员工
    del: 'pc/operation/employee/del', //删除
    get: 'pc/operation/employee/functions', //查询部门职位
    leader: 'pc/operation/employee/search/leaders', //查询组长
    leave: 'pc/operation/employee/leave' //离职
  }
}
