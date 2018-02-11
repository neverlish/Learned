// 9 자바스크립트 표준 - 1 ECMAScript 6 표준 - 7 함수 인자 기능 확대

// 가변 인자 등 기능 예
function dynamicArguments(arg1, ...rest) {
  console.log(arg1);
  console.log(rest);
}

dynamicArguments(1, 2, 3, 4);

var spread = ['P', 'R', 'E', 'A']; // 1, [ 2, 3, 4 ]
dynamicArguments('S', ...spread, 'D'); // S, [ 'P', 'R', 'E', 'A', 'D' ]

function previousDynamicArguments(arg1) {
  var rest = Array.prototype.slice.call(arguments, 1);

  console.log(arg1);
  console.log(rest);
}

previousDynamicArguments(1, 2, 3, 4); // 1, [ 2, 3, 4 ]
previousDynamicArguments.apply(this, ['S'].concat(spread).concat(['D'])); // S, [ 'P', 'R', 'E', 'A', 'D' ]

// 함수 인자의 기본값 설정 예

function defaultValue(color='black', isNull='Nullable') {
  console.log('color=' + color + ' , isNull=' + isNull);
}

defaultValue(undefined, null); // color=black , isNull=null

function previousDefaultValue(color, isNull) {
  color = color || 'black';
  isNull = isNull || 'Nullable';
  console.log('color=' + color + ' , isNull =' + isNull);
}

previousDefaultValue(undefined, null); // color=black , isNull =Nullable
