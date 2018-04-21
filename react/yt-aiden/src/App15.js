import React from 'react';

const HOC = (InnerComponent) => class extends React.Component {
  constructor() {
    super();

    this.state = {count: 0}
  }
  componentWillMount() {
    console.log('will Mount')
  }
  update() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <InnerComponent 
        {...this.props}
        {...this.state}
        update={this.update.bind(this)}
      />
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Button>button</Button>
        <hr />
        <LabelHOC>label</LabelHOC>
      </div>
    )
  }
}

const Button = HOC((props) => <button onClick={props.update}>{props.children} - {props.count}</button>)

class Label extends React.Component {
  componentWillMount() {
    console.log('label will mount')
  }
  render() {
    return (
      <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
    )
  }
}

const LabelHOC = HOC(Label)

export default App;
