import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';

class App extends Component {
  render() {
    return (
      <PageTemplate>
        <TodoInput />
      </PageTemplate>
    );
  }
}

export default App;
