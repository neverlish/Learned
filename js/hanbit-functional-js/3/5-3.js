// 3 변수 스코프와 클로저 - 5 클로저 - 3 추상화 도구 클로저

var _ = require('underscore');
var {plucker} = require('../functions');

var best = {title: 'Infinite Jest', author: 'DFW'};
var getTitle = plucker('title');
console.log(getTitle(best)); // Infinite Jest

var books = [{title: 'Chthon'}, {stars: 5}, {title: 'Botchan'}];
var third = plucker(2);
console.log(third(books)); // { title: 'Botchan' }

console.log(
  _.filter(books, getTitle)
); // [ { title: 'Chthon' }, { title: 'Botchan' } ]
