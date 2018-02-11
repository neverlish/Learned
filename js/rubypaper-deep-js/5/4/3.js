// 5 디자인 패턴 실용 - 4 데커레이터 패턴
// 함수 기반 데커레이터 패턴 - 모니터링 기능을 위한 데커레이터 패턴과 프락시 패턴의 조합
(function() {
	var monitorTool,
			car,
			wrapperFunction;

	monitorTool = (function() {
		var functionSequence = [];
		return {
			decorate: function(name, func) {
				functionSequence.push({
					name: name,
					func: func
				});
			},
			monitor: function(func) {
				var length = functionSequence.length;
				for (i = 0; i< length; i++) {
					functionSequence[i].func.apply(this, arguments);
				}
			}
		}
	}());
	monitorTool.decorate('before', function(func) {
		console.log(func.name + ' function has started at ' + Date.now());
	});
	monitorTool.decorate('decorated', function(func) {
		func.apply(this, Array.prototype.slice(arguments, 1));
	});
	monitorTool.decorate('after', function(func) {
		console.log(func.name + ' function has finished at ' + Date.now());
	});
	wrapperFunction = monitorTool.monitor;

	car = {
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

	wrapObject(car, wrapperFunction);

	console.log('A. car.accelerator() monitor');
	car.accelerator();
	console.log('\nB. car.beep() monitor');
	car.beep();
	console.log('\nC. car.brake() monitor');
	car.brake();
}());
/*
A. car.accelerator() monitor
accelerator function has started at 1517244850741
GO
accelerator function has finished at 1517244850827

B. car.beep() monitor
beep function has started at 1517244850828
BEEP
beep function has finished at 1517244850828

C. car.brake() monitor
brake function has started at 1517244850828
STOP!
brake function has finished at 1517244850841
*/

