import React, { Component } from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
import Home from './components/Home';
import Submit from './components/Submit';

class App extends Component {
  render() {
    return (
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
              <a className="navbar-brand">Love To Eat</a>
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
        <Route path='/submit' component={Submit}/>
      </div>
    );
  }
}

export default App;
