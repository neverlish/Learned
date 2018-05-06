import React from 'react'
import { render } from 'react-dom'
import Users from './containers/users'
import { Provider } from 'react-redux'
import UsersStore from './store'

render(
  <Provider store={UsersStore}>
    <Users />
  </Provider>,
  document.getElementById('app')
)
