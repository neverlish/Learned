// String capitalizeName(String? name) {
//   if (name != null) {
//     name.toUpperCase();
//   }
//   return 'ANON';
// }

// String capitalizeName(String? name) =>
//     name != null ? name.toUpperCase() : 'ANON';

String capitalizeName(String? name) => name?.toUpperCase() ?? 'ANON';

void main() {
  capitalizeName('nico');
  capitalizeName(null);

  String? name;
  name ??= 'nico';
  name = null;
  name ??= 'another';
  print(name);
}
