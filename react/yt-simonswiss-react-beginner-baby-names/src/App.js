import React, { Component } from 'react';

class App extends Component {
  render() {
    console.log('our data is',this.props.data)
    return (
      <ul>
        <li className='boy'>Name 1</li>
        <li className='girl'>Name 1</li>
        <li className='boy'>Name 2</li>
        <li className='girl'>Name 2</li>
        <li className='boy'>Name 3</li>
        <li className='girl'>Name 3</li>
      </ul>
    );
  }
}

export default App;
