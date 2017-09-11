function isPalindrome(string) {
	string = string.toLowerCase()
	var a = '';
	var b = '';

	for (var i=0; i < string.length; i++) {
		if (/[a-z]/.test(string[i])) a+= string[i]
	}

	for (var i=string.length; i > 0; i--) {
		if (/[a-z]/.test(string[i-1])) b+= string[i-1];
	}
	return a == b;
}

console.log(isPalindrome('AbC Qws'));
console.log(isPalindrome('race car'));


////////
// lecture

function isPalindrome2(string) {
	string = string.toLowerCase();
	var charactersArr = string.split('');
	var validCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var lettersArr = [];
	charactersArr.forEach(char => {
		if(validCharacters.indexOf(char) > -1) lettersArr.push(char);
	});

	if (lettersArr.join('') === lettersArr.reverse().join('')) return true;
	else return false;
}

console.log(isPalindrome2('AbC Qws'));
console.log(isPalindrome2('race car'));