// 04 Understand Built-in types in Dart

void main() {
  // Number
  int num1 = 5;
  double num2 = 10.0;

  print(num1 * num2);
  print(num1 / num2);
  print(num1 + num2);
  print(num1 - num2);

  // String
  var str1 = 'Lorem';
  var str2 = "ipsum";
  String str3 = '$str1 $str2 dolor';
  var str4 = """Multi
  Line
  String""";
  var str5 = 'These '
      'are '
      'adjacent';
  print(str1);
  print(str2);
  print(str3);
  print(str4);
  print(str5);

  // Boolean
  bool isBrowser = true;
  var isInvisible = false;
  print(isBrowser || isInvisible);
  print(isBrowser && isInvisible);

  // Function
  sum(a, b) {
    return a + b;
  }

  print(sum(5, 10));

  var difference = (int a, int b) {
    return a - b;
  };
  print(difference(20, 10));

  var product = (int a, int b) => a * b;
  print(product(3, 3));

  // Lists
  var fruits = ['banana', 'pineapple', 'lemon'];
  print(fruits.length);

  fruits.forEach((fruit) => print(fruit));
  var mappedFruits = fruits.map((fruit) => 'I love $fruit').toList();
  print(mappedFruits[1]);

  // Maps
  var user = {
    'name': 'Sam',
    'age': 25,
    'isSubscriber': true,
  };
  print(user['name']);
  user.forEach((key, value) => print("key: $key, value: $value"));

  // Runes
  Runes input = new Runes('I \u2764 Dart');
  print(new String.fromCharCodes(input));

  // Symbol
  Symbol simb1 = Symbol('input');
  var simb2 = #input;

  print(simb1);
  print(simb2);
}
