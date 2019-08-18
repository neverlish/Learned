import { combineReducers } from 'redux';
import app from './app';
import bookDetails from './bookDetails';
import home from './home';

const reducers = combineReducers({
  bookDetails,
  app,
  home,
});

export default reducers;