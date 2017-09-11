function reverseWords(string) {
	return string.split(' ').map(word => {
		var word_split = word.split('');
		var result = '';
		for (var i=word_split.length; i > 0; i--) {
			result += word_split[i-1];
		}
		return result;
	}).join(' ');
}

console.log(reverseWords('this is a string of words'));

///////////////
// lecture

function reverseWords2(string) {
	var wordsArr = string.split(' ');
	var reversedWordsArr = [];

	wordsArr.forEach(word => {
		var reversedWord = '';
		for (var i = word.length-1; i >= 0; i--) {
			reversedWord += word[i];
		}
		reversedWordsArr.push(reversedWord);
	});

	return reversedWordsArr.join(' ');
}

console.log(reverseWords2('this is a string of words'));