import * as types from '../actions/ActionTypes';

const initialState = {
  color: 'black'
};

function counter(state = initialState, action) {
  switch(action.type) {
    case types.SET_COLOR:
      return {
        ...state,
        color: action.color
      };
    default:
      return state;
  }
};

export default counter;
