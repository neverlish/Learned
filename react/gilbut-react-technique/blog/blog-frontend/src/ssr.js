import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import configure from 'store/configure';
import routes from './routes';
import axios from 'axios';
import transit from 'transit-immutable-js';

import App from 'components/App';

const render = async (ctx) => {
  const { url, origin } = ctx;

  axios.defaults.baseURL = origin;

  // 요청이 들어올 때마다 새 스토어를 생성합니다.
  const store = configure();

  const promises = [];
  routes.forEach(
    route => {
      const match = matchPath(url, route);
      if (!match) return;
      // match가 성공하면 해당 라우트가 가리키는 컴포넌트의 preload를 호출합니다. 그리고 파싱된 params를 preload 함수에 전달합니다.
      const { component } = route;
      const { preload } = component;
      if (!preload) return;
      const { params } = match; // Route의 props로 받는 match와 동일한 객체입니다.
      // preload를 사용하여 얻은 프로미스를 promises 배열에 등록합니다.
      const promise = preload(store.dispatch, params);
      promises.push(promise);
    }
  );

  try {
    // 등록된 모든 프로미스를 기다립니다.
    await Promise.all(promises);
  } catch (e) {

  }

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = JSON.stringify(transit.toJSON(store.getState()))
                             .replace(/</g, '\\u003c');

  return { html, preloadedState };
}

export default render;
