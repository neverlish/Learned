// Dumps title + price in console

var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["../vendor/jquery.min.js"]
});

var utils = require('utils');

var url = 'http://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?asq=BmKqhl3O58ZrT2PWlpmsbVp4q%2b%2b0p%2bBtvuHhek3A%2feZH5D2RdFDOA1T0OAT1UZapu6%2bhYWjL8DABIq3woyGLeBxLqO6yzkivCUEqE8RlnG99zqAKR93GsQPngXvxN3e7RyOTrg3gn4cK%2bPlxSq3gK9mx071C3J90yX8J8UNolFIOm9ZOdCNcoP7K42oXcoshP8YjJYBvi1hk4tSnmwNboP4UhAs9F5v0lI%2fJ%2f0t%2bmRHLmDO7XMeWtcwrg3GArmrV&city=17072&tick=635903544940&sort=agodaRecommended';

var names = [];
var prices = [];

function getHotelName() {
  var rows = $('[data-selenium=hotel-name]');
  return Array.prototype.map.call(rows, function(e) {
    return e.innerHTML;
  });
}

function getHotelPrice() {
  var price = $('[data-selenium=display-price]');
  return Array.prototype.map.call(price, function(e) {
    return e.innerHTML;
  });
}

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.waitForSelector('.hotel-name', function() {
  console.log('.hotel-name' + ' is loaded.');
});

casper.then(function() {
  names = this.evaluate(getHotelName);
  prices = this.evaluate(getHotelPrice);
});

casper.then(function() {
  utils.dump(names);
  utils.dump(prices);
});

casper.run();
