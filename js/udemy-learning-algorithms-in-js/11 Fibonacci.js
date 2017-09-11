function fibonacci(position) {
	if ([1,2].indexOf(position) > -1) return 1;
	else return fibonacci(position - 1) + fibonacci(position - 2);
}

console.log(fibonacci(9))