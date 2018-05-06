import React from 'react'
import NavBar from './navBar'

const App = (props) => (
  <div>
    <NavBar />
    <div>
      <h1>This is our app component</h1>
      {props.children}
    </div>
  </div>
)

export default App
