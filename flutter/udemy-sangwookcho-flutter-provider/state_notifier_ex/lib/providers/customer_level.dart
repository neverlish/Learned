import 'package:state_notifier/state_notifier.dart';

import 'counter.dart';

enum Level {
  bronze,
  silver,
  gold,
}

class CustomerLevel extends StateNotifier<Level> with LocatorMixin {
  CustomerLevel() : super(Level.bronze);

  @override
  void update(Locator watch) {
    final currentCounter = watch<CounterState>().counter;

    if (currentCounter >= 100) {
      state = Level.gold;
    } else if (currentCounter > 50 && currentCounter < 100) {
      state = Level.silver;
    } else {
      state = Level.bronze;
    }

    super.update(watch);
  }
}
