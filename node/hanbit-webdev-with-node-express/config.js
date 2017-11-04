module.exports = {
  bundles: {
    clientJavaScript: {
      main: {
        file: '/js/meadowlark.min.js',
        location: 'head',
        contents: [
          '/js/contact.js',
          '/js/cart.js',
        ]
      }
    },
    clientCss: {
      main: {
        file: '/css/meadowlark.min.css',
        contents: [
          '/css/main.css',
          '/css/cart.css',
        ]
      }
    }
  }
}
