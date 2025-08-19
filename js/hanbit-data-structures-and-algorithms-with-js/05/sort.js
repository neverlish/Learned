var {Queue} = require('./Queue');

function distribute(nums, queues, n, digit) { // digit는 1의 자리 숫자인지, 10의 자리 숫자인지를 구분하는 인자
	for (var i = 0; i < n; ++i) {
		if (digit == 1) {
			queues[nums[i] % 10].enqueue(nums[i]);
		} else {
			queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
		}
	}
}

function collect(queues, nums) {
	var i = 0;
	for (var digit = 0; digit < 10; ++digit) {
		while (!queues[digit].empty()) {
			nums[i++] = queues[digit].dequeue();
		}
	}
}

function dispArray(arr) {
	var result = '';
	for (var i = 0; i < arr.length; ++i) {
		result += arr[i] + ' ';
	}
	console.log(result);
}

var queues = [];
for (var i = 0; i < 10; ++i) {
	queues[i] = new Queue();
}

var nums = [];
for (var i = 0; i < 10; ++i) {
	nums[i] = Math.floor(Math.floor(Math.random() * 101));
}

console.log('Before radix sort: ');
dispArray(nums);
distribute(nums, queues, 10, 1);
collect(queues, nums);
distribute(nums, queues, 10, 10);
collect(queues, nums);

console.log('\n\nAfter radix sort: ');
dispArray(nums);