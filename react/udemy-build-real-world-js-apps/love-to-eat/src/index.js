import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Home from './components/Home';
import Submit from './components/Submit';

ReactDOM.render(
  <Router>
    <div>
      <div className='container'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Love To Eat</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><NavLink exact activeClassName='activeNav' to="/">Home</NavLink></li>
                <li><NavLink activeClassName='activeNav' to="/submit">Submit a Recipe</NavLink></li>
              </ul>
            </div>
          </div>
        </nav>
        <Route exact path='/' component={Home}/>
        <Route path='/submit' component={Submit} history={createBrowserHistory}/>
      </div>
    </div>
    
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
