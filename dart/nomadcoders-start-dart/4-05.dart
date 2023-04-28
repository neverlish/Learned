class Player {
  String name;
  int xp;
  String team;

  Player({
    required this.name,
    required this.xp,
    required this.team,
  });

  void sayHello() {
    print("Hi my name is $name");
  }
}

void main() {
  // var nico = Player(name: 'nico', xp: 1200, team: 'red')
  //   ..name = 'las'
  //   ..xp = 1200000
  //   ..team = 'blue';
  var nico = Player(name: 'nico', xp: 1200, team: 'red');
  var potato = nico
    ..name = 'las'
    ..xp = 1200000
    ..team = 'blue'
    ..sayHello();
}
