// 5 Create an Array concatAll method

var exchanges = [
  [
    { symbol: "XFX", price: 240.22, volume: 23432 },
    { symbol: "TNJ", price: 332.19, volume: 234 }
  ],
  [
    { symbol: "JXJ", price: 120.22, volume: 5323 },
    { symbol: "NYN", price: 88.47, volume: 98275 }
  ]
];

Array.prototype.concatAll = function() {
  var results = [];
  this.forEach(function(subArray) {
    subArray.forEach(function(item) {
      results.push(item);
    });
  });

  return results;
};

exchanges.forEach(function(exchange) {
  exchange.forEach(function(stock) {
    console.log(stock);
  });
});

var stocks = exchanges.concatAll();
stocks.forEach(function(stock) {
  console.log(stock);
});
