import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';
import Home from './components/Home';
import Submit from './components/Submit';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='submit' component={Submit}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
