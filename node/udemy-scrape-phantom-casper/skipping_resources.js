// Skip Certain Resources
casper.options.onResourceRequested = function(casper, requestData, request) {
  // If any of these strings are found in the requested resource's URL, skip this request.
  var skip = [
    'googleads.g.doubleclick.net',
    'cm.g.doubleclick.net',
    'www.googleadservices.com'
  ];

  skip.forEach(function(needle) {
    if (requestData.url.indexOf(needle) > 0) {
      request.abort();
    }
  })
};


// Don't get CSS
casper.options.onResourceRequested = function(C, requestData, request) {
  if ((/http:\/\/.+?.css/gi)
    .test(requestData['url']) || requestData['Content - Type'] == 'text/css') {
  //console.log
  ('Skipping CSS file: ' + requestData['url']);
    request.abort();
  }
}