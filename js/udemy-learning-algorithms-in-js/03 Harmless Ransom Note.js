function harmlessRansomNote(noteText, magazineText) {
	var noteTextArray = noteText.split(' ');
	var magazineTextArray = magazineText.split(' ');

	for (var i=0; i<noteTextArray.length; i++) {
		if (magazineTextArray.indexOf(noteTextArray[i]) < 0) return false;
	}
	return true;
}

console.log(harmlessRansomNote(
	'this is a note for you from a secret admirer', 
	'puerto rico is a great place you must hike far from town to find a secret waterfall that i am an admirer of but note that it is not as hard as it seems this is my advice for you'
));

//////
// lecture

function harnlessRansomNote2(noteText, magazineText) {
	var noteArr = noteText.split(' ');
	var magazineArr = magazineText.split(' ');
	var magezineObj = {};

	magazineArr.forEach(word => {
		if(!magezineObj[word]) magezineObj[word] = 0;
		magazineObj[word]++;
	});

	var noteIsPossible = true;
	noteArr.forEach(word => {
		if (magazineObj[word]) {
			magazineObj[word]--;
			if (magazineObj[word] < 0) noteIsPossible = false;
		}
		else noteIsPossible = false;
	});
	return noteIsPossible;
}