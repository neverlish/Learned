import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import configure from 'store/configure';

import App from 'components/App';

const render = (ctx) => {
  const { url } = ctx;

  // 요청이 들어올 때마다 새 스토어를 생성합니다.
  const store = configure();

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return html;
}

export default render;
