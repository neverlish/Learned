// 3 The Array filter method

function getStocksOver(stocks, minPrice) {
  /*
  var results = [];

  stocks.forEach(function(stock) {
    if (stock.price >= minPrice) {
      results.push(stock);
    }
  });

  return results;
  */

  return stocks.filter(function(stock) {
    return stock.price >= minPrice;
  });
}

Array.prototype.filter = function(predicate) {
  var results = [];

  this.forEach(function(item) {
    if (predicate(item)) {
      results.push(item);
    }
  });

  return results;
}

var expensiveStocks = getStocksOver(
  [
    { symbol: "XFX", price: 240.22, volume: 23432 },
    { symbol: "TNJ", price: 332.19, volume: 234 },
    { symbol: "JXJ", price: 120.22, volume: 5323 }
  ],
  150.00);

console.log(expensiveStocks)
/*
[ { symbol: 'XFX', price: 240.22, volume: 23432 },
  { symbol: 'TNJ', price: 332.19, volume: 234 } ]
*/
