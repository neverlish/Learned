// 4 Chaining the Array map and filter methods

var stocks = [
  { symbol: "XFX", price: 240.22, volume: 23432 },
  { symbol: "TNJ", price: 332.19, volume: 234 },
  { symbol: "JXJ", price: 120.22, volume: 5323 }
];

var filteredStockSymbols = 
  stocks.
    filter(function(stock) {
      return stock.price >= 150.00;
    }).
    map(function(stock) {
      return stock.symbol;
    });

filteredStockSymbols.forEach(function(symbol) {
  console.log(symbol);
  /*
  XFX
  TNJ
  */
});
