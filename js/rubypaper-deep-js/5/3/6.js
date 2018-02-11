// 5 디자인 패턴 실용 - 3 프락시 패턴
// 기존 함수명과 같은 이름으로 래퍼 함수 활용 - 기존 함수와 동일하게 활용 가능한 래퍼 예

(function() {
	function wrap(func, wrapper) {
		return function() {
			var args = [func].concat(Array.prototype.slice.call(arguments));
			return wrapper.apply(this, args);
		};
	}

	function existingFunction() {
		console.log('Existing function is called with arguments');
		console.log(arguments);
	}

	var wrappedFunction = wrap(existingFunction, function(func) {
		console.log('Wrapper function is called with arguments');
		console.log(arguments);
		func.apply(this, Array.prototype.slice.call(arguments, 1));
	});
	console.log('1. Calling wrapped function');
	existingFunction('First argument', 'Second argument', 'Third argument');

	console.log('\n2. Calling wrapped function');
	wrappedFunction('First argument', 'Second argument', 'Third argument');

	(function() {
		var existingFunction = wrappedFunction;
		console.log('\n3. Calling wrapped existing function');
		existingFunction('First argument', 'Second argument', 'Third argument');
	}());
}());
/*
1. Calling wrapped function
Existing function is called with arguments
{ '0': 'First argument',
  '1': 'Second argument',
  '2': 'Third argument' }

2. Calling wrapped function
Wrapper function is called with arguments
{ '0': [Function: existingFunction],
  '1': 'First argument',
  '2': 'Second argument',
  '3': 'Third argument' }
Existing function is called with arguments
{ '0': 'First argument',
  '1': 'Second argument',
  '2': 'Third argument' }

3. Calling wrapped existing function
Wrapper function is called with arguments
{ '0': [Function: existingFunction],
  '1': 'First argument',
  '2': 'Second argument',
  '3': 'Third argument' }
Existing function is called with arguments
{ '0': 'First argument',
  '1': 'Second argument',
  '2': 'Third argument' }
*/