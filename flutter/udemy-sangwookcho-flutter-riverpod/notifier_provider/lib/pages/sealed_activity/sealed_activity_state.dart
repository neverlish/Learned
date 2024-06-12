import 'package:notifier_provider/models/activity.dart';

sealed class SealedActivityState {
  const SealedActivityState();
}

final class SealedActivityInitial extends SealedActivityState {
  const SealedActivityInitial();

  @override
  String toString() => 'SealedActivityInitial()';
}

final class SealedActivityLoading extends SealedActivityState {
  const SealedActivityLoading();

  @override
  String toString() => 'SealedActivityLoading()';
}

final class SealedActivitySuccess extends SealedActivityState {
  final Activity activity;
  const SealedActivitySuccess({
    required this.activity,
  });

  @override
  String toString() => 'SealedActivitySuccess(activity: $activity)';
}

final class SealedActivityFailure extends SealedActivityState {
  final String error;
  const SealedActivityFailure({
    required this.error,
  });

  @override
  String toString() => 'SealedActivityFailure(error: $error)';
}
