import 'package:fast_app_base/screen/main/tab/home/banks_dummy.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/vo_bank_account.dart';

final bankAccountShinhan1 =
    BankAccount(1, bankShinhan, 300, accountTypeName: "신한 주거래 우대통장(저축예금)");
final bankAccountShinhan2 =
    BankAccount(2, bankShinhan, 200, accountTypeName: "저축예금");
final bankAccountShinhan3 =
    BankAccount(3, bankShinhan, 100, accountTypeName: "저축예금");
final bankAccountToss = BankAccount(4, bankTtoss, 400);
final bankAccountKakao =
    BankAccount(5, bankKakao, 70000, accountTypeName: "입출금통장");
final bankAccountKakao2 =
    BankAccount(6, bankKakao, 1000000, accountTypeName: "특별통장");

abstract class Animal {
  void eat();
}

class Cat extends Animal {
  @override
  void eat() {}
}

class Dog extends Animal {
  @override
  void eat() {}
}

class Cow extends Animal {
  @override
  void eat() {}
}

main() {
  bankAccounts.insert(1, bankAccountKakao2);
  final temp = bankAccounts.removeAt(4);
  bankAccounts.insert(0, temp);

  // final temp1 = bankAccounts.last;
  // bankAccounts[5] = bankAccounts[0];
  // bankAccounts[0] = temp1;

  // bankAccounts.swap(0, 5);

  // final banks = bankAccounts.mapIndexed((e, index) => Row(children: [(index+1).text.make()],)).toList();

  // for (final bank in banks) {
  //   print(bank.toString());
  // }

  // final map = HashMap<String, BankAccount>();

  // map['ttoss'] = bankAccountToss;
  // map['kakao'] = bankAccountKakao;

  // map.putIfAbsent('kakao', () => bankAccountKakao);

  // if (!map.containsKey('kakao')) {
  //   map['kakao'] = bankAccountKakao;
  // }

  // for (final account in bankAccounts) {
  //   print(account.toString());
  // }

  final banks = bankAccounts.map((e) => e.bank).toList();

  final uniqueBanks = banks.toSet();

  for (final bank in uniqueBanks) {
    print(bank.toString());
  }

  final result = doTheWork();
  final result2 = doTheWork2();
  final result3 = doTheWork3(() => Dog());
}

class Result<T> {
  final T data;

  Result(this.data);
}

Result<String> doTheWork() {
  return Result("data");
}

Result<double> doTheWork2() {
  return Result(1.0);
}

Result doTheWork3<Result extends Animal>(Result Function() animalCreator) {
  return animalCreator();
}

final bankAccounts = [
  bankAccountShinhan1,
  bankAccountShinhan2,
  bankAccountShinhan3,
  bankAccountToss,
  bankAccountKakao
];

final bankMap = {
  "shinhan1": bankAccountShinhan1,
  "shinhan2": bankAccountShinhan2,
};

final bankSet = {
  bankAccountShinhan1,
  bankAccountShinhan2,
  bankAccountShinhan3,
  bankAccountToss,
  bankAccountKakao,
};
