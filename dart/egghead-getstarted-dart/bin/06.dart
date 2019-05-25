// 06 Define Optional Named and Positional Parameters for Functions and Methods in Dart

void main() {
  yell('Hello world');
  yell('Hello world', true);
  yell('Hello world', true, '🐱');

  whisper('Hello world', mysteriously: true);
  whisper('Hello world', mysteriously: false, emoji: '🤔');

  Person('Jermaine').speak(emoji: '😎');
}

yell(String str, [bool exclaim = false, String emoji = '']) {
  var result = str.toUpperCase();
  if (exclaim) result += '!!!';
  if (emoji.isNotEmpty) result += emoji;
  print(result);
}

whisper(String str, {bool mysteriously, String emoji = ''}) {
  var result = str.toLowerCase();
  if (mysteriously) result += '...';
  if (emoji.isNotEmpty) result += emoji;
  print(result);
}

class Person {
  var name;

  Person(this.name);

  speak({String emoji = ''}) {
    var result = 'My name is $name';
    if (emoji.isNotEmpty) result += emoji;
    print(result);
  }
}
