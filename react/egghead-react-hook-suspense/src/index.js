import React from 'react'
import ReactDOM from 'react-dom'

import Counter from './lessons/14-react-cache'

function App() {
  return (
    <div
      style={{
        padding: 30,
        height: '100vh',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Counter />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
