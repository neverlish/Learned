import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    padding: 0;
    margin: 0;
  }
`

class App extends Component {
  render() {
    return (
      <Container>
        <Button>Hello</Button>
        <Button danger>Hello</Button>
        <Anchor href='http://google.com'>Go to google</Anchor>
      </Container>
    );
  }
}

const Button = ({danger}) => (
  <button 
    className={danger ? 'button button--danger' : 'button button--success'}>
    Hello
  </button>
);

const Anchor = Button.withComponent('a').extend`
  text-decoration: none;
`;

export default App;
