import { createStore, applyMiddleware } from 'redux';
import modules from './modules';
// import loggerMiddleware from './lib/loggerMiddleware';
import { createLogger } from 'redux-logger';

const logger = createLogger();

const store = createStore(modules, applyMiddleware(logger));

export default store;
