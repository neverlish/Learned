import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'components/App';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import transit from 'transit-immutable-js';

const preloadedState = window.__PRELOADED_STATE__ && transit.fromJSON(window.__PRELOADED_STATE__);

const store = configure(preloadedState);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
