import 'package:notifier_provider/models/activity.dart';
import 'package:notifier_provider/pages/sealed_activity/sealed_activity_state.dart';
import 'package:notifier_provider/providers/dio_provider.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'sealed_activity_provider.g.dart';

@riverpod
class SealedActivity extends _$SealedActivity {
  int _errorCount = 0;

  @override
  SealedActivityState build() {
    ref.onDispose(() {
      print('[sealedActivityProvider] disposed');
    });
    print('hashCode: $hashCode');
    return const SealedActivityInitial();
  }

  Future<void> fetchActivity(String activityType) async {
    print('hashCode in fetchActivity: $hashCode');
    state = const SealedActivityLoading();

    try {
      print('_errorCount: $_errorCount');
      if (_errorCount++ % 2 != 1) {
        await Future.delayed(const Duration(milliseconds: 500));
        throw 'Fail to fetch activity';
      }
      final response = await ref.read(dioProvider).get('?type=$activityType');

      final activity = Activity.fromJson(response.data);

      state = SealedActivitySuccess(activity: activity);
    } catch (e) {
      state = SealedActivityFailure(error: e.toString());
    }
  }
}
