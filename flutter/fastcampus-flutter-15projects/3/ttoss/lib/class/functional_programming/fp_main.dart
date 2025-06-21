import 'package:fast_app_base/class/functional_programming/fxDart.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/screen/main/tab/home/bank_accounts_dummy.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/vo_bank_account.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/vo_user.dart';
import 'package:flutter_animate/flutter_animate.dart';

main() async {
  // final accounts = getAccounts();
  // final list = <String>[];
  // for (final account in accounts) {
  //   final user = getUser(account.userId);
  //   list.add(user.name);
  // }
  // print(list);

  // final nameList = (await getAccounts())
  //     .map((account) => account.userId)
  //     .map((userId) => getUser(userId))
  //     .map((user) => user.name)
  //     .toList();

  // print(nameList);

  // final accounts = await (await getAccounts())
  //     .toStream()
  //     .map(accountToUserId)
  //     .asyncMap(userIdToFutureUser)
  //     .map(userToName)
  //     .toList();

  // print(accounts);

  await fxDart([
    await getAccounts(),
    ...accountToEachFutureUser,
    printNames,
  ]);
}

List get accountToEachFutureUser =>
    [accountToUserId, idToFetchedUser, userToName];

printNames(names) => runAll((names) => print(names.toList()), names);

String userToName(user) => user.name;

idToFetchedUser(List<int> userIds) => futureMap(getUser, userIds);

FutureOr<User> userIdToFutureUser(userId) => getUser(userId);

int accountToUserId(account) => account.userId;

Future<List<BankAccount>> getAccounts() async {
  await sleepAsync(300.ms);
  return bankAccounts;
}

Future<User> getUser(int id) async {
  await sleepAsync(300.ms);
  print(id);
  return switch (id) {
    1 => User(id, 'Jason'),
    2 => User(id, 'Dart'),
    3 => User(id, 'Baby'),
    4 => User(id, 'Love'),
    5 => User(id, 'Popcorn'),
    _ => throw Exception('404 not found')
  };
}
