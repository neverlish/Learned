// 6 재귀 - 1 자신을 호출하는 함수 - 2 메모리에서 깊이 우선 재귀 탐색하기

var _ = require('underscore');

var {cat, construct, nexts, rev} = require('../functions');

function depthSearch(graph, nodes, seen) {
  if (_.isEmpty(nodes)) return rev(seen);

  var node = _.first(nodes);
  var more = _.rest(nodes);

  if (_.contains(seen, node))
    return depthSearch(graph, more, seen);
  else
    return depthSearch(
      graph,
      cat(nexts(graph, node), more),
      construct(node, seen)
    );
}


var influences = [
  ['Lisp', 'Smalltalk'],
  ['Lisp', 'Scheme'],
  ['Smalltalk', 'Self'],
  ['Scheme', 'JavaScript'],
  ['Scheme', 'Lua'],
  ['Self', 'Lua'],
  ['Self', 'Javascript']
];

console.log(depthSearch(influences, ['Lisp'], []));
// [ 'Lisp', 'Smalltalk', 'Self', 'Lua', 'Javascript', 'Scheme', 'JavaScript' ]

console.log(depthSearch(influences, ['Smalltalk', 'Self'], []));
// [ 'Smalltalk', 'Self', 'Lua', 'Javascript' ]

console.log(depthSearch(construct(['Lua','Io'], influences), ['Lisp'], []));
// [ 'Lisp', 'Smalltalk', 'Self', 'Lua', 'Io', 'Javascript', 'Scheme', 'JavaScript' ]

//////////// 꼬리 재귀

function tcLength(ary, n) {
  var l = n ? n : 0;

  if (_.isEmpty(ary))
    return l;
  else
    return tcLength(_.rest(ary), l + 1);
}

console.log(tcLength(_.range(10))); // 10
