import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import App from './sources/App12';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  // <App header='Props from the Header...' content='Props from the Content...'/>, 
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
