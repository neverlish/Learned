// 14 Manipulate Lists/Arrays in Dart

void main() {
  var fruits = ['banana', 'pineapple', 'orange', 'watermelon', 'apple'];
  var fiboNumbers = [1, 2, 3, 5, 8, 13, 21];
  List<Map<String, dynamic>> users = [
    {'name': 'John', 'age': 18},
    {'name': 'Jane', 'age': 21},
    {'name': 'Mary', 'age': 23},
  ];

  fruits.forEach((fruit) => print('Got fruit: $fruit'));
  /*
  Got fruit: banana
  Got fruit: pineapple
  Got fruit: orange
  Got fruit: watermelon
  Got fruit: apple
  */

  var mappedFruits = fruits.map((fruit) => 'I love $fruit').toList();
  print(
      mappedFruits); // [I love banana, I love pineapple, I love orange, I love watermelon, I love apple]

  print(fiboNumbers.contains(2)); // true
  print(fiboNumbers.contains(6)); // false

  fiboNumbers.sort((num1, num2) => num1 - num2);
  fiboNumbers.sort(); // same as previous
  print(fiboNumbers); // [1, 2, 3, 5, 8, 13, 21]

  var sum = fiboNumbers.reduce((curr, next) => curr + next);
  print(sum); // 53

  const initialValue = 10;
  var sum2 = fiboNumbers.fold(initialValue, (curr, next) => curr + next);
  print(sum2); // 63

  var is18OrOver = users.every((user) => user['age'] >= 18);
  print(is18OrOver); // true

  var hasNamesWithJ = users.every((user) => user['name'].startsWith('J'));
  print(hasNamesWithJ); // false

  var over21s = users.where((user) => user['age'] > 21);
  print(over21s.length); // 1

  var nameJ = users.firstWhere((user) => user['name'].startsWith('J'),
      orElse: () => null);
  print(nameJ); // {name: John, age: 18}

  var under18 = users.singleWhere((user) => user['age'] < 18,
      orElse: () => {'error': 'Not Found'});
  print(under18); // {error: Not Found}

  print(fiboNumbers.take(3).toList()); // [1, 2, 3]
  print(fiboNumbers.skip(5).toList()); // [13, 21]
  print(fiboNumbers.take(3).skip(2).take(1).toList()); // [3]

  var flattened = [
    [1, 2],
    [3, 4]
  ].expand((pair) => pair).toList();
  print(flattened); // [1, 2, 3, 4]

  var duplicated = fiboNumbers.expand((i) => [i, i]).toList();
  print(duplicated); // [1, 1, 2, 2, 3, 3, 5, 5, 8, 8, 13, 13, 21, 21]

  var generatedList = List.generate(8, (i) => ++i, growable: false);
  print(generatedList); // [1, 2, 3, 4, 5, 6, 7, 8]

  // generatedList.add(9); // Cannot add to a fixed-length list

  var clonedFiboNumbers = List.from(fiboNumbers);
  print(clonedFiboNumbers); // [1, 2, 3, 5, 8, 13, 21]
}
