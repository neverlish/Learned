function reverseArrayInPlace(arr) {
	return arr.map((each, i) => {
		return arr[arr.length-(i+1)];
	});
}

console.log(reverseArrayInPlace(['a','b','c']));

/////////////
// lecture

function reverseArrayInPlace2(arr) {
	for (var i=0; i < arr.length / 2; i++) {
		var tempVar = arr[i];
		arr[i] = arr[arr.length-1-i];
		arr[arr.length-1-i] = tempVar;
	}
	return arr;
}

console.log(reverseArrayInPlace2([1,2,3,4,5,6,7])); 