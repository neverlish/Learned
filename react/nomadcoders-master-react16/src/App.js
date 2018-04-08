import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';

const MAX_PIZZAS = 20

const eatPizza = (state, props) =>  {
  const { pizzas } = state
  if (pizzas < MAX_PIZZAS) {
    return {
      pizzas: pizzas + 1
    }
  } else {
    return null
  }
}

class Controlled extends Component {
  state = {
    pizzas: 10
  }
  render() {
    const { pizzas } = this.state
    return (
      <button onClick={this._handleClick}>
        {`I have eaten ${pizzas} ${pizzas === 1 ? 'pizza' : 'pizzas'}`}
      </button>
    )
  }

  _handleClick = () => {
    this.setState(eatPizza)
  }
}

const BoundaryHOC = ProtectedComponent => class Boundary extends Component {
  state = {
    hasError: false
  }
  componentDidCatch = () => {
    this.setState({
      hasError: true
    })
  }
  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorFallback />;
    } else {
      return <ProtectedComponent />;
    }
  }
}

class ErrorMaker extends Component {
  state = {
    friends: ['jisu', 'flynn', 'daal', 'kneeplayer']
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        friends: undefined
      })
    }, 2000);
  }
  render() {
    const { friends } = this.state;
    return friends.map(friend => ` ${friend} `);
  }
}

const PErrorMaker = BoundaryHOC(ErrorMaker)

class Portals extends Component {
  render() {
    return createPortal(<Message />, document.getElementById('touchme'));
  }
}

const PPortals = BoundaryHOC(Portals)

const Message = () => "Just touched it!";

class ReturnTypes extends Component {
  render() {
    return 'hello';
  }
}

const ErrorFallback = () => ' Sorry something went wrong'

class App extends Component {
  state = {
    hasError: false
  }
  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true
    })
  }
  render() {
    // const { hasError } = this.state;
    // return (
    //   <Fragment>
    //     <ReturnTypes />
    //     <PPortals />
    //     <PErrorMaker />
    //   </Fragment>
    // );
    return <Controlled />
  }
}

export default App;
