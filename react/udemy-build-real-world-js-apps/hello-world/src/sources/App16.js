// 03 The Basics - 18 Forms in React - Part 3

import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      myInputValue: 'My Input'
    }
    this.myInputChanged = this.myInputChanged.bind(this);
  }

  myInputChanged(e) {
    this.setState({
      myInputValue: e.target.value
    })
  }

  render() {
    return (
      <div className="App-intro">
        <h1>Forms in React!</h1>
        <p>In this lecture, we will go over Forms in React</p>
        <MyInputComponent inputValue={this.state.myInputValue} myInputChanged={this.myInputChanged}/>
        <h4>{this.state.myInputValue}</h4>
        <EssayComponent />
        <FlavorForm />
        <hr/>
        <Reservation />
      </div>
    );
  }
}

class MyInputComponent extends Component {
  render() {
    return (
      <div>
        <input value={this.props.inputValue} onChange={this.props.myInputChanged}/>
      </div>
    )
  }
}

class EssayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Once upon a time...'   
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    alert(this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea value={this.state.value} onChange={this.handleChange}/>
        <h4>{this.state.value}</h4>
        <button type='submit'>Submit</button>
      </form>
    )
  }
}

class FlavorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'grapefruit'   
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    alert('The Flavor you selected is : ' + this.state.value.toUpperCase());
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select onChange={this.handleChange}>
            <option value='grapefruit'>Grape Fruit</option>
            <option value='apple'>Apple</option>
            <option value='chocolate'>Chocolate</option>
            <option value='banana'>Banana</option>
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange (e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    alert('I will be going : ' + this.state.isGoing + ', I will bring ' + this.state.numberOfGuests);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Are you going for the party? :
          <input
            name='isGoing'
            type='checkbox'
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br/>
        <label>
          How many guests will you bring? :
          <input
            name='numberOfGuests'
            type='number'
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
        <input type='submit' value='Submit'></input>
      </form>
    );
  }
}

export default App;
