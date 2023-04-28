// String sayHello({
//   required String name,
//   required int age,
//   required String country,
// }) {
//   return "Hello $name, you are $age, and you come from $country";
// }

String sayHello({
  String name = 'anon',
  int age = 99,
  String country = 'wakanda',
}) {
  return "Hello $name, you are $age, and you come from $country";
}

void main() {
  print(sayHello(
    age: 19,
    country: 'cuba',
    name: 'nico',
  ));
  print(sayHello());
}
