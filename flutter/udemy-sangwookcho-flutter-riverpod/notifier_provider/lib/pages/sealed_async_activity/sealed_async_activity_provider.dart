import 'package:notifier_provider/models/activity.dart';
import 'package:notifier_provider/pages/sealed_async_activity/sealed_async_activity_state.dart';
import 'package:notifier_provider/providers/dio_provider.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'sealed_async_activity_provider.g.dart';

@riverpod
class SealedAsyncActivity extends _$SealedAsyncActivity {
  int _errorCount = 0;

  SealedAsyncActivity() {
    print('[SealedAsyncActivity] constructor called');
  }

  @override
  SealedAsyncActivityState build() {
    print('[sealedAsyncActivityProvider] initialized');
    ref.onDispose(() {
      print('[sealedAsyncActivityProvider] disposed');
    });
    print('hashCode: $hashCode');
    fetchActivity(activityTypes[0]);
    return const SealedAsyncActivityLoading();
  }

  Future<void> fetchActivity(String activityType) async {
    print('hashCode in fetchActivity: $hashCode');
    state = const SealedAsyncActivityLoading();

    try {
      print('_errorCount: $_errorCount');
      if (_errorCount++ % 2 != 1) {
        await Future.delayed(const Duration(milliseconds: 500));
        throw 'Fail to fetch activity';
      }
      final response = await ref.read(dioProvider).get('?type=$activityType');

      final activity = Activity.fromJson(response.data);

      state = SealedAsyncActivitySuccess(activity: activity);
    } catch (e) {
      state = SealedAsyncActivityFailure(error: e.toString());
    }
  }
}
