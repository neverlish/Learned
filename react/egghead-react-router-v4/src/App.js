import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './App.css'

const Links = () => (
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Header />
    <Content />
  </nav>
)

const Header = ({match}) => (
  <div className='header'>
    <Route path='/:page' render={({match}) => (<h1>{match.params.page} header</h1>)} />
  </div>
)

const Content = ({match}) => (
  <div className='content'>
    <Route path='/:page' render={({match}) => (<p>{match.params.page} content</p>)} />
  </div>
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Links />
        </div>
      </Router>
    )
  }
}

export default App
