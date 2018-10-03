import number from './number';
import color from './color';

import { combineReducers } from 'redux';
const reducers = combineReducers({
  numberData: number,
  colorData: color
});

export default reducers;
