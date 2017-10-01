// 5 함수로 함수 만들기 - 1 함수 조립의 핵심

var _ = require('underscore');
var {invoker, always, dispatch} = require('../functions');

var str = dispatch(
  invoker('toString', Array.prototype.toString),
  invoker('toString', String.prototype.toString)
);

console.log(str('a')); // a
console.log(str(_.range(10))); // 0,1,2,3,4,5,6,7,8,9

////////////

function stringReverse(s) {
  if (!_.isString(s)) return undefined;
  return s.split('').reverse().join('');
}

console.log(stringReverse('abc')); // cba
console.log(stringReverse(1)); // undefined

////////////

var rev = dispatch(
  invoker('reverse', Array.prototype.reverse),
  stringReverse
);

console.log(rev([1,2,3])); // [ 3, 2, 1 ]
console.log(rev('abc')); // cba

var sillyReverse = dispatch(rev, always(42));
console.log(sillyReverse([1,2,3])); // [ 3, 2, 1 ]
console.log(sillyReverse('abc')); // cba
console.log(sillyReverse(100000)); // 42

// 이하 메소드는 실행시 에러가 남. 코드만 볼 것
function performCommandHardcoded(command) {
  var result;

  switch (command.type) {
    case 'notify':
      result = notify(command.message);
      break;
    case 'join':
      result = changeView()
      break;
    default:
      alert(comment.type);
  }
  return result;
}

performCommandHardcoded({type: 'notify', message: 'hi'}); // notify 실행
performCommandHardcoded({type: 'join', target: 'waiting-room'}); // changeView 실행
performCommandHardcoded({type: 'wat'}); // 알림창 팝업

function isa(type, action) {
  return function(obj) {
    if (type === obj.type)
      return action(obj);
  }
}

var performCommand = dispatch(
  isa('notify', function(obj) { return notify(obj.message); }),
  isa('join', function(obj) { return changeView(obj.target); }),
  function(obj) { alert(obj.type) }
);

var performAdminCommand = dispatch(
  isa('kill', function(obj) { return shutdown(obj.hostname); }),
  performCommand
);

performAdminCommand({type: 'kill', hostname: 'localhost'}); // 셧다운 실행
performAdminCommand({type: 'failed'}); // 알림창 팝업
performAdminCommand({type: 'join', target: 'foo'}); // changeView 실행

var performTrialUserCommand = dispatch(
  isa('join', function(obj) { alert('Cannot join until approved'); }),
  performCommand
);

performTrialUserCommand({type: 'join', target: 'foo'}); // 실행할 수 없음을 알리는 창이 팝업됨
performTrialUserCommand({type: 'notify', message: 'Hi new user'}); // notify 실행
