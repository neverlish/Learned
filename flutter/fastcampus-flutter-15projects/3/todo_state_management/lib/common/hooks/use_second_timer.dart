import 'package:fast_app_base/common/cli_common.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

int useTimerSecond() {
  final count = useState(0);

  useEffect(() {
    final timer = Timer.periodic(400.ms, (timer) {
      count.value = timer.tick;
    });

    return () => timer.cancel();
  }, []);
  return count.value;
}
