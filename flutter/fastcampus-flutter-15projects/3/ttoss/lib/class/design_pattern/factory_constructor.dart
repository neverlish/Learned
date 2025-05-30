abstract class Choco {}

class MilkChoco extends Choco {
  MilkChoco(this.companyName);

  final String companyName;

  factory MilkChoco.creator(String companyName) => MilkChoco(companyName);
}

class DarkChoco extends Choco {
  DarkChoco();

  factory DarkChoco.creator(String companyName) => DarkChoco();
}

enum ChocoType {
  Milk(MilkChoco.creator),
  Dark(DarkChoco.creator);

  const ChocoType(this.chocoCreator);

  final Choco Function(String companyName) chocoCreator;
}

main() {
  final type = ChocoType.Milk;
  final chocoCreator = type.chocoCreator;
  final willyMilkChoco = chocoCreator("윌리웡카");
  print(willyMilkChoco);
}
