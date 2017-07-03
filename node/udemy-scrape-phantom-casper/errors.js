// Checking errors
casper.on("resource.error", function(resourceError){
    console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
});

// tracing page's console.log
casper.on('remote.message', function(msg) {
    console.log('[Remote Page] ' + msg);
});

// print out all the error messages from the web page
casper.on("page.error", function(msg, trace) {
    casper.echo("[Remote Page Error] " + msg, "ERROR");
    casper.echo("[Remote Error trace] " + JSON.stringify(trace, undefined, 4));
});