function binarySearch(numArray, key) {
	var center = Math.floor(numArray.length/2);
	if (numArray.length == 1 && key != numArray[center]) {
		return false;
	} else {
		if (key < numArray[center]) {
			return binarySearch(numArray.slice(0, center), key);
		} else if (key > numArray[center]) {
			return binarySearch(numArray.slice(center, numArray.length), key);
		} else if (key == numArray[center]) {
			return true;
		}
	} 	
}

console.log(binarySearch([5,7,12,16,36,39,42,56,71],56))

/////////////
// lecture

function binarySearch2(numArray, key) {
	var middleIdx = Math.floor(numArray.length / 2);
	var middleElem = numArray[middleIdx];

	if (middleElem === key) return true;
	else if (middleElem < key && numArray.length > 1) {
		return binarySearch2(numArray.splice(middleIdx, numArray.length), key);
	} else if (middleElem > key && numArray.length > 1) {
		return binarySearch2(numArray.splice(0, middleIdx), key);
	}
	else return false;
}

console.log(binarySearch2([5,7,12,16,36,39,42,56,71],56))