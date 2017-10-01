// 1 함수형 자바스크립트 소개 - 2 함수형 프로그래밍 시작하기 - 5 데이터 추상화

var _ = require('underscore');

var {nth, second} = require('../functions');

function lameCSV(str) {
  return _.reduce(str.split('\n'), function(table, row) {
    table.push(_.map(row.split(','), function(c) { return c.trim(); }));
    return table;
  }, []);
}

var peopleTable = lameCSV('name,age,hair\nMerble,35,red\nBob,64,blonde');

console.log(peopleTable);
/*
[ [ 'name', 'age', 'hair' ],
  [ 'Merble', '35', 'red' ],
  [ 'Bob', '64', 'blonde' ] ]
*/

console.log(
  _.rest(peopleTable).sort()
); // [ [ 'Bob', '64', 'blonde' ], [ 'Merble', '35', 'red' ] ]

/////////

function selectNames(table) {
  return _.rest(_.map(table, _.first));
}

function selectAges(table) {
  return _.rest(_.map(table, second));
}

function selectHairColor(table) {
  return _.rest(_.map(table, function(row) {
    return nth(row, 2);
  }));
}

var mergeResults = _.zip;

console.log(
  selectNames(peopleTable)
); // [ 'Merble', 'Bob' ]

console.log(
  selectAges(peopleTable)
); // [ '35', '64' ]

console.log(
  selectHairColor(peopleTable)
); // [ 'red', 'blonde' ]

console.log(
  mergeResults(selectNames(peopleTable), selectAges(peopleTable))
); // [ [ 'Merble', '35' ], [ 'Bob', '64' ] ]
