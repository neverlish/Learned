import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {value: 0}
    this.update = this.update.bind(this)
  }

  update(e) {
    this.setState({
      value: this.state.value + 1
    })
  }

  componentWillMount() {
    console.log('componentWillMount')
    this.setState({
      mul: 2
    })
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.inc = setInterval(this.update, 500);
  }

  render() {
    console.log('render')
    return (
      <div>
        <button onClick={this.update}>{this.state.value * this.state.mul}</button>
      </div>
    )
  }

  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.inc)
  }
}

class Wrapper extends React.Component {
  mount() {
    ReactDOM.render(<App/>, document.getElementById('a'))
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
  }

  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>mount</button>
        <button onClick={this.unmount.bind(this)}>unmount</button>
        <div id='a'/>
      </div>
    )
  }
}

export default Wrapper;
