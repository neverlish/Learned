import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tylestyle from 'typestyle';

import App from './11';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)

tylestyle.setStylesTarget(document.getElementById('styles-target'))
