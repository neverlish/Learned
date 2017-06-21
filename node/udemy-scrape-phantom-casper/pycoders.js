var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js"]
});

var fs = require('fs');
var url = 'http://pycoders.com/archive/';

var link = [];
var title = [];
var date = [];

casper.start(url, function() {
  // do something
})

casper.then(function() {
  link = this.evaluate(getLink);
});

casper.then(function() {
  title = this.evaluate(getTitle);
});

casper.then(function() {
  date = this.evaluate(getDate);
});

casper.run(function() {
  this.echo(link.length + ' links found: ');
  this.echo(' - ' + link.join('\n - '));
  this.echo(' - ' + title.join('\n - '));
  this.echo(' - ' + date.join('\n - ')).exit();
});

