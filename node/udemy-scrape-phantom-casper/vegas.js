/* 
* grab the hotels namd and price
* print namd and price to the console
* wait for selector load
*/
var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url = 'https://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?asq=u2qcKLxwzRU5NDuxJ0kOF3T91go8JoYYMxAgy8FkBH1BN0lGAtYH25sdXoy34qb9XoByZ1EdmU5QQhFZc97xCe9P1ckPbMDqNtXecWfaa0rKJ7Dt2wNoVW%2B2IPqguzNBkYzc5qRnQ5uV8FDtyDnFekEHBx3yftdeooV1uZ1oTkapVtg9K24yfCzS7p%2B5AOKJ%2FCCGpWX2I3Dk13MXCUbitA%3D%3D&city=17072&tick=636339452159&isdym=true&searchterm=las%20vegas&txtuuid=791d6b19-bfc4-48c3-a80a-6afd1a79b6a6&pagetypeid=1&origin=KR&cid=-1&tag=&gclid=&aid=130243&userId=b1e82b15-e08a-4264-9212-b8d869c10bbf&languageId=9&sessionId=0zl5u311035arejpz22s0cae&storefrontId=3&currencyCode=KRW&htmlLanguage=ko-kr&trafficType=User&cultureInfoName=ko-KR&textToSearch=las%20vegas&guid=791d6b19-bfc4-48c3-a80a-6afd1a79b6a6&isHotelLandSearch=true&checkIn=2017-07-03&checkOut=2017-07-04&los=1&rooms=1&adults=2&children=0&childages=&ckuid=b1e82b15-e08a-4264-9212-b8d869c10bbf&sort=star5To1';

var names = [];
var prices = [];

function getNames() {
  var link = $('.campaign a');
  return _.map(link, function(e) {
    return e.getAttribute('href');
  });
};

function getPrices() {
  var title = $('.campaign a');
  return _.map(title, function(e) {
    return e.innerHTML.replace(/\:.*$/g,'');
  });
};

casper.start(url, function() {
  this.echo(this.getTitle())
});

casper.then(function() {
  names = this.evaluate(getNames);
  prices = this.evaluate(getPrices);
});

casper.then(function() {
  this.echo(names.length + ' names found');
  this.echo(' - ' + names.join('\n - '));
  this.echo(' - ' + prices.join('\n - ')).exit();
});

casper.run();
