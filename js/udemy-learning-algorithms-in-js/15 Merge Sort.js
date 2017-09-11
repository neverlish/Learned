function mergeSort(array1, array2) {
	var result = [];
	while (array1.length > 0 || array2.length > 0) {
		if (array1[0] < array2[0]) {
			result.push(array1[0]);
			array1 = array1.slice(1, array1.length);
		} else if (array1[0] >= array2[0]) {
			result.push(array2[0]);
			array2 = array2.slice(1, array2.length);
		} else if (array1.length > 0) {
			result.push(array1[0]);
			array1 = array1.slice(1, array1.length);
		} else if (array2.length > 0) {
			result.push(array2[0]);
			array2 = array2.slice(1, array2.length);
		}
	}
	return result;
}

console.log(mergeSort([1,2,8,20], [3,5,12,17]));

////////////
// lecture

function mergeSort2(arr) {
	if (arr.length < 2) return arr;
	var middleIndex = Math.floor(arr.length / 2);
	var firstHalf = arr.slice(0, middleIndex);
	var secondHalf = arr.slice(middleIndex);

	return merge(mergeSort2(firstHalf), mergeSort2(secondHalf));
}

function merge(array1, array2) {
	var result = [];
	while(array1.length && array2.length) {
		var minElem;
		if (array1[0] < array2[0]) minElem = array1.shift();
		else minElem = array2.shift();
		result.push(minElem);
	}

	if (array1.length) result = result.concat(array1);
	else result = result.concat(array2);
	return result;
}

console.log(mergeSort2([1,2,8,20,3,5,12,17]));