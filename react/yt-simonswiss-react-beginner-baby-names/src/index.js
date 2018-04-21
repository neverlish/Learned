import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import data from './data/data';
import 'normalize-css';
import './index.css';

ReactDOM.render(
  <App data={data}/>, 
  document.getElementById('root')
);
