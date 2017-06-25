/* 
* Wait for page load, click review tab, scrape contents
* Print reviews and dates of review from bestbuy
* Unable to use jQuery
*/
var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
  // clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url = 'http://www.bestbuy.com/site/dji-phantom-3-standard-quadcopter-white/4406800.p?id=1219743453736&skuId=4406800';

var ratings = [];
var dates = [];

function getRatings() {
  var ratings = $('[data-selenium=hotel-name]');
  return _.map(ratings, function(e) {
    return e.innerHTML;
  });
};

function getDates() {
  var dates = $('[data-selenium=display-price]');
  return _.map(dates, function(e) {
    return e.innerHTML;
  });
};

casper.start(url, function() {
  this.echo(this.getTitle())
});

casper.wait(2000, function() {
  this.echo("I've waited for a second.");
});

casper.then(function() {
  this.clickLabel('성급(5→1)', 'span');
  console.log('clicked reviews tab');
});


casper.waitForSelector('.hotel-name', function() {
  console.log('hotel-name selector is loaded');
});

casper.then(function() {
  ratings = this.evaluate(getRatings);
  dates = this.evaluate(getDates);
});

casper.then(function() {
  this.echo(ratings.length + ' ratings found');
  this.echo(' - ' + ratings.join('\n - '));
  this.echo(' - ' + dates.join('\n - ')).exit();
});

casper.run();
