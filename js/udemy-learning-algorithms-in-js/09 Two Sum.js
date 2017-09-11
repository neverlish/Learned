function twoSum(numArray, sum) {
	var result = [];
	for (var i = 0; i < numArray.length; i++) {
		for (var j = i+1; j < numArray.length; j++) {
			if ((numArray[i] + numArray[j]) == sum) {
				result.push([numArray[i], numArray[j]]);
			}
		}
	}
	return result;
}

console.log(twoSum([1,6,4,5,3,3], 7));


/////////
// lecture

function twoSum2(numArray, sum) {
	var pairs = [];
	var hashtable = [];

	for (var i = 0; i < numArray.length; i++) {
		var curNum = numArray[i];
		var counterpart = sum - curNum;
		if (hashtable.indexOf(counterpart) !== -1) {
			pairs.push([curNum, counterpart]);
		}
		hashtable.push(curNum);
	}
	return pairs;
}

console.log(twoSum2([1,6,4,5,3,3], 7));