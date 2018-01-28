// 4 프로토타입과 객체지향, 그리고 상속 - 1 프로토타입을 통한 객체 지향 - 3 this의 이해

// 일반 함수 호출 예
function say(something) {
  console.log(something);
}

say('Hello world!');

// 멤버함수 호출 예
var unikys = {
  say: function(something) {
    console.log(something);
  }
}
unikys.say('Hello world!');

// call()과 apply()를 이용한 함수 호출 예
function say(something) {
  console.log(something);
}

say.call(undefined, 'Hello world!');
say.apply(undefined, ['Hello world!']);

// 함수 호출 방법에 따른 this의 변화
function whatsThis() {
  console.log(this.toString());
}

var unikys = {
  what: whatsThis,
  toString: function() {
    return '[Object unikys]';
  }
}

whatsThis(); // [object global]
unikys.what(); // [Object unikys]
whatsThis.call(); // [object global]
whatsThis.apply(unikys); // [Object unikys]
unikys.what.call(undefined); // [object global]
unikys.what.call(unikys); // [Object unikys]

// 멤버함수를 다른 방법으로 호출하는 예
var newWhat = unikys.what;
newWhat(); // [Object global]
