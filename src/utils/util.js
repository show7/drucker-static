export class Authentication {
  constructor (departmentId, positionId) {
    this.departmentId = departmentId
    this.positionId = positionId
    this.userRoleMap = [{
      'id': 1,
      'name': '转化',
      'position': [{
        'id': 1,
        'name': '管理员'
      },
      {
        'id': 2,
        'name': '运营'
      },
      {
        'id': 3,
        'name': '组长'
      },
      {
        'id': 4,
        'name': '组员'
      }
      ]
    }]
  }
  init () {
    if (!this.departmentId) return false
    const hasDepartment = this.hasDepartmentId(this.departmentId)
    return hasDepartment ? this.hasPositionId(hasDepartment, this.positionId) : false
  }
  hasDepartmentId (departmentId) {
    let departmentMap = new Map()
    for (let item of this.userRoleMap) {
      departmentMap.set(
        item.id, item
      )
    }
    console.log(departmentMap)
    return departmentMap.has(departmentId) ? departmentMap.get(departmentId).position : false
  }
  hasPositionId (userRoleMap, positionId) {
    let positionMap = new Map()
    for (let item of userRoleMap) {
      positionMap.set(
        item.id, item
      )
    }
    return positionMap.has(positionId) ? positionId : false
  }
}
