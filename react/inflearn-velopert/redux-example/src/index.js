import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore } from 'redux';
import reducers from './reducers';


const store = createStore(reducers);

// store 테스트용 코드
// import * as actions from './actions';
// console.log(store.getState());
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
// store.dispatch(actions.increment());
// store.dispatch(actions.increment());
// store.dispatch(actions.decrement());
// store.dispatch(actions.setColor([200,200,200]));
//
// unsubscribe();
// store.dispatch(actions.setColor([210,210,210]));

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
