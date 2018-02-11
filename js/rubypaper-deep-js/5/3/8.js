// 5 디자인 패턴 실용 - 3 프락시 패턴
// 래퍼를 활용한 로그 기록 구현 - 로그 기록을 위한 래퍼 예
(function() {
	var car = {
		beep: function beep() {
			console.log('BEEP');
		},
		brake: function brake() {
			console.log('STOP!');
		},
		accelerator: function accelerator() {
			console.log('GO');
		}
	};

	function wrap(func, wrapper) {
		return function() {
			var args = [func].concat(Array.prototype.slice.call(arguments));
			return wrapper.apply(this, args);
		};
	}

	function wrapObject(obj, wrapper) {
		var prop;
		for (prop in obj) {
			if (obj.hasOwnProperty(prop) && typeof obj[prop] === 'function') {
				obj[prop] = wrap(obj[prop], wrapper);
			}
		}
	}

	wrapObject(car, function(func) {
		console.log(func.name, ' has been invoked');
		func.apply(this, Array.prototype.slice(arguments, 1));
	});

	car.accelerator();
	car.beep();
	car.brake();
	/*
	accelerator  has been invoked
	GO
	beep  has been invoked
	BEEP
	brake  has been invoked
	STOP!
	*/
}());