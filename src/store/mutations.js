import {
  default as TYPE
} from './mutations-types'

export default {
  [TYPE.SET_USER_INFO] (state, params) {
    console.log(state, 666)
    state.userInfo = {
      ...state.userInfo,
      ...params
    }
  }
}
