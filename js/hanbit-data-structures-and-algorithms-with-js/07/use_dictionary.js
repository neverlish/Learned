var {Dictionary} = require('./Dictionary');

var pbook = new Dictionary();
pbook.add('Mike', '123');
pbook.add('David', '345');
pbook.add('Cynthia', '456');
console.log("David's extension: " + pbook.find('David')); // 345
pbook.remove('David');
pbook.showAll();
/*
Mike -> 123
Cynthia -> 456
*/
pbook.clear();
console.log('Number of entries: ' + pbook.count()); // 0