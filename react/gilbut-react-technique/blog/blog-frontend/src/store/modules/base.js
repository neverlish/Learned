import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

// action types
const SHOW_MODAL = 'base/SHOW_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';
const LOGIN = 'base/LOGIN';
const LOGOUT = 'base/LOGOUT';
const CHECK_LOGIN = 'base/CHECK_LOGIN';
const CHANGE_PASSWORD_INPUT = 'base/CHANGE_PASSWORD_INPUT';
const INITIALIZE_LOGIN_MODAL = 'base/INITIALIZE_LOGIN_MODAL';
const TEMP_LOGIN = 'base/TEMP_LOGIN';

// action creators
export const showModal = createAction(SHOW_MODAL);
export const hideModal = createAction(HIDE_MODAL);
export const login = createAction(LOGIN, api.login);
export const logout = createAction(LOGOUT, api.logout);
export const checkLogin = createAction(CHECK_LOGIN, api.checkLogin);
export const changePasswordInput = createAction(CHANGE_PASSWORD_INPUT);
export const initializeLoginModal = createAction(INITIALIZE_LOGIN_MODAL);
export const tempLogin = createAction(TEMP_LOGIN);

// initial state
const initialState = Map({
  modal: Map({
    remove: false,
    login: false
  }),
  loginModal: Map({
    password: '',
    error: false
  }),
  logged: false
});

// reducer
export default handleActions({
  [SHOW_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], true);
  },
  [HIDE_MODAL]: (state, action) => {
    const { payload: modalName } = action;
    return state.setIn(['modal', modalName], false);
  },
  ...pender({
    type: LOGIN,
    onSuccess: (state, action) => {
      return state.set('logged', true);
    },
    onError: (state, action) => {
      return state.setIn(['loginModal', 'error'], true)
                  .setIn(['loginModal', 'password'], '');
    }
  }),
  ...pender({
    type: CHECK_LOGIN,
    onSuccess: (state, action) => {
      const { logged } = action.payload.data;
      return state.set('logged', logged);
    }
  }),
  [CHANGE_PASSWORD_INPUT]: (state, action) => {
    const { payload: value } = action;
    return state.setIn(['loginModal', 'password'], value);
  },
  [INITIALIZE_LOGIN_MODAL]: (state, action) => {
    return state.set('loginModal', initialState.get('loginModal'));
  },
  [TEMP_LOGIN]: (state, action) => {
    return state.set('logged', true);
  }
}, initialState);
