// npm run static

import { style, getStyles } from 'typestyle';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server'
// // import * as fs from 'fs';

const className = style({
  color: 'red',
  fontSize: '30px',
})

const App = () => {
  return (
    <div className={className}>
      Hello world
    </div>
  )
}

export default App

const html = ReactDOMServer.renderToStaticMarkup(<App />);
const css = getStyles();

const renderPage = ({ html, css }) => `
<html>
  <head>
    <style>${css}</style>
  </head>
  <body>
    <div>${html}</div>
  </body>
</html>
`

const renderedPage = renderPage({ html, css })
// fs.writeFileSync(__dirname + '/index.html', renderedPage)
