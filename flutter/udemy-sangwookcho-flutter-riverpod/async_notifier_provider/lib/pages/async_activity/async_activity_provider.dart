import 'package:async_notifier_provider/models/activity.dart';
import 'package:async_notifier_provider/providers/dio_provider.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'async_activity_provider.g.dart';

@riverpod
class AsyncActivity extends _$AsyncActivity {
  int _errorCount = 0;

  @override
  FutureOr<Activity> build() {
    ref.onDispose(() {
      print('[asyncActivityProvider] disposed');
    });
    return getActivity(activityTypes[0]);
  }

  Future<Activity> getActivity(String activityType) async {
    if (_errorCount++ % 2 != 1) {
      await Future.delayed(const Duration(milliseconds: 500));
      throw 'Fail to fetch activity';
    }
    final response = await ref.read(dioProvider).get('?type=$activityType');

    return Activity.fromJson(response.data);
  }

  Future<void> fetchActivity(String activityType) async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      return getActivity(activityType);
    });
  }
}
