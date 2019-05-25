// 13 Manipulate Strings in Dart

main() {
  var str = 'Lorem ipsum dolor sit amet';
  var str2 = '$str consectetur';
  var str3 = '''Multi
  Line
  String''';

  print(str.replaceAll('e', 'è')); // Lorèm ipsum dolor sit amèt
  print(str.replaceAll(RegExp(r'e'), 'è')); // Lorèm ipsum dolor sit amèt
  print(str.replaceAllMapped(RegExp(r'(.)e'), (match) {
    var matchedGroup = match.group(1);
    return '($matchedGroup)e';
  })); // Lo(r)em ipsum dolor sit a(m)et

  print('Lorem'.padLeft(8, 'x')); // xxxLorem
  print('Lorem'.padRight(8, 'x')); // Loremxxx

  print('  *$str*  '.trim()); // *Lorem ipsum dolor sit amet*
  print('  *$str*  '); //   *Lorem ipsum dolor sit amet*

  print(str2.indexOf('m')); // 4
  print(str2.indexOf(RegExp(r'e?me?'))); // 3
  print(str2.lastIndexOf('m')); // 23

  print(str3.splitMapJoin(
      RegExp(r'^', multiLine: true), // Matches the beginning of the line
      onMatch: (m) => '** ${m.group(0)}', // Add asterisk to our match
      onNonMatch: (n) => n // Leaves non-matches as is
      ));
  // ** Multi
  // **   Line
  // **   String

  print(str2.split(' ')); // [Lorem, ipsum, dolor, sit, amet, consectetur]
  print(str3.split('\n')); // [Multi,   Line,   String]

  print(str.toUpperCase()); // LOREM IPSUM DOLOR SIT AMET
  print(str.toLowerCase()); // lorem ipsum dolor sit amet

  print(str.endsWith('amet')); // true
  print(str.endsWith('oomet')); // false

  print(str.startsWith('Lorem')); // true
  print(str.startsWith('Morem')); // false

  print(str.contains('con')); // false
  print(str.contains(RegExp(r'[A-Z]'))); // true
}
