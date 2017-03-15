import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import './App.css'

const App = () => (
  <Router>
    <div>
      <Route path='/:page?-:subpage?' render={({match}) => (
        <h1>
          PAGE: {match.params.page || 'Home'}<br/>
          SUBPAGE: {match.params.subpage}
        </h1>
      )} />
    </div>
  </Router>
)

export default App
