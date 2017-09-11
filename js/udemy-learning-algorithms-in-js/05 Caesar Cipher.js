function caesarCipher(str, num) {
	var smallChars = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var bigChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	var strArr = str.split('');

	return strArr.map(str => {
		var idx_small = smallChars.indexOf(str);
		var idx_big = bigChars.indexOf(str);
		if (idx_small > -1) {
			return smallChars[(idx_small+num)%26];
		} else if (idx_big > -1) {
			return bigChars[(idx_big+num)%26]
		} else {
			return str;
		}
	}).join('');
}

console.log(caesarCipher('Zoo Keeper', 2));


///////////
// lecture

function caesarCipher2(str, num) {
	num = num % 26;
	var lowerCaseString = str.toLowerCase();
	var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var newString = '';

	for (var i=0; i < lowerCaseString.length; i++) {
		var currentLetter = lowerCaseString[i];

		if (currentLetter == ' ') {
			newString += currentLetter;
			continue;
		}
		var currentIndex = alphabet.indexOf(currentLetter);
		var newIndex = currentIndex + num;
		if (newIndex > 25) newIndex = newIndex - 26;
		if (newIndex < 0) newIndex = 26 + newIndex;
		if(str[i] === str[i].toUpperCase()) {
			newString += alphabet[newIndex].toUpperCase();
		}
		else newString += alphabet[newIndex];
	}

	return newString;
}

console.log(caesarCipher2('Zoo Keeper', 2));