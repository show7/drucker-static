import apiDataFilter from '../libraries/apiDataFilter'
import {
  default as TYPE
} from './mutations-types'

export default {
  setUserInfo ({
    commit
  }) {
    apiDataFilter.request({
      apiPath: 'common.info',
      successCallback: (res) => {
        commit(TYPE.SET_USER_INFO,
          res.msg
        )
      }
    })
  }
}
