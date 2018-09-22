require('babel-register')({
  presets: ['react']
})

const ReactDOMServer = require('react-dom/server')
const React = require('react')
const Email = React.createFactory(require('./email.jsx'))
const emailString = ReactDOMServer.renderToString(Email())
console.log(emailString)

/*
<div data-reactroot="" data-reactid="1" data-react-checksum="-1828626982"><h1 data-reactid="2"><!-- react-text: 3 -->Thank you <!-- /react-text --><!-- react-text: 4 --><!-- /react-text --><!-- react-text: 5 --> for signing up!<!-- /react-text --></h1><p data-reactid="6">If you have any questions, please contact support</p></div>
*/

const emailStaticMarkup = ReactDOMServer.renderToStaticMarkup(Email())
console.log(emailStaticMarkup)

/*
<div><h1>Thank you  for signing up!</h1><p>If you have any questions, please contact support</p></div>
*/

const emailStringWithName = ReactDOMServer.renderToString(Email({
  name: 'Johny Pineappleseed'
}))
console.log(emailStringWithName)
/*
<div data-reactroot="" data-reactid="1" data-react-checksum="-1616288447"><h1 data-reactid="2"><!-- react-text: 3 -->Thank you <!-- /react-text --><!-- react-text: 4 -->Johny Pineappleseed<!-- /react-text --><!-- react-text: 5 --> for signing up!<!-- /react-text --></h1><p data-reactid="6">If you have any questions, please contact support</p></div>
*/
