import * as types from './mutation-types'

export const signIn = ({commit}, user_paylod) => {
  commit(types.SIGN_IN, user_paylod)
}

export const signOut = ({commit}) => {
  commit(types.SIGN_OUT)
}

export const setEvents = ({commit}, events_payload) => {
  commit(types.SET_EVENT, events_payload)
}
