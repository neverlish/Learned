// Trigger Scrolling infinite scroll
casper.start(url, function() {
  this.wait(10000, function() {
    this.page.scrollPosition = {
      top: this.page.scrollPosition["top"] + document.body.scrollHeight,
      left: 0
    };
    if (this.visible("div.load-more")) {
      this.echo("I am here");
    }
  })
});


// Working on boingboing.net
casper.start('http://boingboing.net', function() {
  this.scrollToBottom();
  this.wait(1000);
});

casper.then(function() {
  this.capture('boingboing.png');
});