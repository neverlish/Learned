function sieveOfEratosthenes(num) {
	var result = [];
	for (var i=2; i < num+1; i++) {
		var each = true;
		for (var j=2; j < i; j++) {
			if (i/j == parseInt(i/j)) {
				each = false;
				break;
			}
		}
		if (each) result.push(i);
	}
	return result;
}

console.log(sieveOfEratosthenes(200));


//////////////
// lecture

function sieveOfEratosthenes2(n) {
	var primes = [];
	for (var i=0; i <= n; i++) {
		primes[i] = true;
	}

	primes[0] = false;
	primes[1] = false;

	for (var i=2; i <= Math.sqrt(n); i++) {
		for (var j=2; j+i < n; j++) {
			primes[i*j] = false;
		}
	}

	var result = [];
	for (var i = 0; i < primes.length; i++) {
		if (primes[i]) result.push(i);
	}

	return result;
}

console.log(sieveOfEratosthenes2(20));