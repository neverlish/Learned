/* 
* modified from googlePagination.js
* https://github.com/casperjs/casperjs/blob/master/samples/googlepagination.js
* 'Capture' the first 4 pages of BestBuy product reviews
* use counter, startPage
* Methods = capture(), thenClick(), waitFor(), waitForSelector()
*/
var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
  // clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url = 'http://www.bestbuy.com/site/dji-phantom-3-standard-quadcopter-white/4406800.p?id=1219743453736&skuId=4406800';

var currentPage = 1;
var startPage = '';

function terminate() {
  this.echo('thats all folks').exit();
}

function startPageFn() {
  var startPage = document.querySelector('span.BVRRSelectedPageNumber');
  return Array.prototype.map.call(startPage, function(e) {
    return e.innerText;
  });
}

var processPage = function() {
  
}

casper.start(url, function() {
  this.echo(this.getTitle())
});

casper.wait(2000, function() {
  this.echo("I've waited for a second.");
});

casper.then(function() {
  this.click('button[data-click-location="customerreviewstab"]');
  console.log('clicked reviews tab');
});

casper.then(function() {
  startPage = this.evaluate(startPageFn);
});

casper.waitForSelector('.BVRRRatingContainerStar', processPage, terminate);

casper.run();
