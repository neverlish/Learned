import 'dart:async';

import 'package:fast_app_base/screen/main/tab/home/bank_accounts_dummy.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/vo_bank_account.dart';
import 'package:flutter_animate/flutter_animate.dart';

void main() async {
  print("start");
  // final account = await getBankAccounts()
  //     .timeout(1.seconds)
  //     .onError((error, stackTrace) => []);
  // try {
  //   final account = await getBankAccounts().timeout(1.seconds);
  //   print(account);
  // } catch (e) {
  //   print(e);
  // }
  getBankAccounts().timeout(1.seconds).then((value) {
    print(value);
  }).catchError((error) {
    print(error);
  });
  print("end");
  //
}

abstract class DoWorkInterface {
  FutureOr<String> doWork();
}

class SyncWork implements DoWorkInterface {
  @override
  String doWork() {
    return "wow";
  }
}

class AsyncWork implements DoWorkInterface {
  @override
  Future<String> doWork() async {
    return "wow";
  }
}

Future<List<BankAccount>> getBankAccounts() async {
  await sleepAsync(2.seconds);
  return bankAccounts;
}

Future sleepAsync(Duration duration) async {
  await Future.delayed(duration, () => {});
}
