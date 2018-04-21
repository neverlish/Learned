import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <MyInput update={this.update.bind(this)} />
        <h1>{this.state.content}</h1>
      </div>
    );
  }
}

const MyInput = (props) => <input type='text' onChange={props.update} />

export default App;
