import * as types from './mutation-types'

export const mutations = {
  [types.SIGN_IN] (state, user_paylod) {
    state.user = user_paylod
  },

  [types.SIGN_OUT] (state) {
    state.user = {}
  }
}
