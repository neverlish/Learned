import React from 'react';
import { Route } from 'react-router-dom';
import {
  Home,
  About
} from 'pages';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about/:name?' component={About} />
    </div>
  );
};

export default App;
