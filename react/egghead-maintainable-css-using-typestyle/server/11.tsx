// npm run server

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getStyles } from 'typestyle';
import App from '../src/11';
import * as express from 'express';

export const renderPage = ({ html, css }) => `
<html>
  <head>
    <style id='styles-target'>${css}</style>
  </head>
  <body>
    <div id='root'>${html}</div>
    <script src='./bundle.js'></script>
  </body>
</html>
`
const app = express();
app.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<App />);
  const css = getStyles();
  res.send(renderPage({ html, css }));
})

app.use(express.static('public'));
app.listen(3000, () => {
  console.log('App listening on port 3000!');
})
