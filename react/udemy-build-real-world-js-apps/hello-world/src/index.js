import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './sources/App19';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Blog from './components/Blog';
import BlogSingle from './components/BlogSingle';
import {Router, Route, browserHistory} from 'react-router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/home' component={Home}/>
      <Route path='/about' component={About}/>
      <Route path='/contact' component={Contact}/>
      <Route path='/blog' component={Blog}>
        <Route path='/blog/:postId' component={BlogSingle} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
