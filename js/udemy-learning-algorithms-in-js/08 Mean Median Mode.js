function getMean(array) {
	var sum = 0;
	array.forEach(each => sum += each);
	return sum/array.length;
}

function getMedian(array) {
	array = array.sort()
	return array[Math.floor((array.length-1)/2)];
}

function getMode(array) {
	var result = {};
	array.forEach(each => {
		if (result[each]) result[each]++;
		else result[each] = 1;
	});

	return Math.max.apply(null, Object.keys(result).map(each => result[each]));
}

function meanMedianMode(array) {
	return {
		mean: getMean(array),
		median: getMedian(array),
		mode: getMode(array)
	}
}

console.log(meanMedianMode([0,1,2,3,3,5]));


/////////////
// lectures

function getMean2(array) {
	var sum = 0;
	array.forEach(each => {
		sum += each
	});
	var mean = sum/array.length;
	return mean;
}

function getMedian2(array) {
	array.sort(function(a,b) {return a-b});
	var median;

	if(array.length % 2 !== 0) {
		median = array[Math.floor(array.length /2)];
	}
	else {
		var mid1 = array[(array.length / 2) - 1];
		var mid2 = array[array.length / 2];
		median = (mid1 + mid2) / 2;
	}

	return median;
}

function getMode2(array) {
	var modeObj = {};

	array.forEach(num => {
		if(!(modeObj[num])) modeObj[num] = 0;
		modeObj[num]++;
	});

	var maxFrequency = 0;
	var modes = [];
	for (var num in modeObj) {
		if (modeObj[num] > maxFrequency) {
			modes = [num];
			maxFrequency = modeObj[num];
		}
		else if (modeObj[num] === maxFrequency) modes.push(num);
	}

	if (modes.length == Object.keys(modeObj).length) modes = [];
	return modes;
}

function meanMedianMode2(array) {
	return {
		mean: getMean2(array),
		median: getMedian2(array),
		mode: getMode2(array)
	}
}

console.log(meanMedianMode2([1,2,3,3,4,5]))