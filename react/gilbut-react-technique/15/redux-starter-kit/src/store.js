import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger, ReduxThunk));

export default store;
