import { combineReducers } from 'redux';
import app from './app';
import bookDetails from './bookDetails';
import home from './home';
import newBook from './newBook';

const reducers = combineReducers({
  bookDetails,
  app,
  home,
  newBook,
});

export default reducers;