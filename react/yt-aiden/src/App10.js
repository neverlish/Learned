import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: ' '
    }
  }

  update(e) {
    this.setState({
      a: this.a.refs.input.value,
      b: this.b.value,
      c: this.refs.c.value
    })
  }

  render() {
    return (
      <div>
        <Input
          ref={component => this.a = component}
          type='text'
          update={this.update.bind(this)}
        />
        {this.state.a}
        <input
          ref={node => this.b = node}
          type='text'          
          onChange={this.update.bind(this)}
        />
        {this.state.b}<br/>
        <input
          ref='c'
          type='text'          
          onChange={this.update.bind(this)}
        />
        {this.state.c}
      </div>
    )
  }
}

class Input extends React.Component {
  render() {
    return <div><input ref='input' type='text' onChange={this.props.update} /></div>
  }
}

export default App;
