import React from 'react'
import { render } from 'react-dom'
import Users from './containers/users'
import { Provider } from 'react-redux'
import UsersStore from './store'
import App from './components/app'
import { Router, Route, hashHistory } from 'react-router'

render(
  <Provider store={UsersStore}>
    <Router history={hashHistory}>
      <Route path='/users' component={Users} />
      <Route path='/test' component={Users} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
