// 9 Advanced Flattening

var exchanges = [
  {
    name: 'NYSE',
    stocks: [
      {
        symbol: 'XFX',
        closes: [
          { date: new Date(2014,11,25), price: 240.10 },
          { date: new Date(2014,11,24), price: 232.08 },
          { date: new Date(2014,11,23), price: 241.09 }
        ]
      },
      {
        symbol: 'TNJ',
        closes: [
          { date: new Date(2014,11,25), price: 521.24 },
          { date: new Date(2014,11,24), price: 511.00 },
          { date: new Date(2014,11,23), price: 519.29 }
        ]
      }
    ]
  },
  {
    name: 'TSX',
    stocks: [
      {
        symbol: 'JXJ',
        closes: [
          { date: new Date(2014,11,25), price: 460.00 },
          { date: new Date(2014,11,24), price: 424.84 },
          { date: new Date(2014,11,23), price: 419.72 }
        ]
      },
      {
        symbol: 'NYN',
        closes: [
          { date: new Date(2014,11,25), price: 16.82 },
          { date: new Date(2014,11,24), price: 16.12 },
          { date: new Date(2014,11,23), price: 15.77 }
        ]
      }
    ]
  }
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

var christmasEveCloses = 
  exchanges.map(function(exchange) {
    return exchange.stocks.
      map(function(stock) {
        return stock.closes.
            filter(function(close) {
              return close.date.getMonth() === 11 && close.date.getDate() === 24;
            }).
            map(function(close) {
              return {
                symbol: stock.symbol,
                price: close.price
              };
            });
      }).
      concatAll();
  })
  .concatAll();

console.log(christmasEveCloses)
/*
[ { symbol: 'XFX', price: 232.08 },
  { symbol: 'TNJ', price: 511 },
  { symbol: 'JXJ', price: 424.84 },
  { symbol: 'NYN', price: 16.12 } ]
*/
