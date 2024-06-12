import 'dart:math';

import 'package:async_notifier_provider/models/activity.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:bulleted_list/bulleted_list.dart';

import 'async_activity_provider.dart';

class AsyncActivityPage extends ConsumerWidget {
  const AsyncActivityPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activityState = ref.watch(asyncActivityProvider);
    print(activityState);
    print(
        'isLoading: ${activityState.isLoading}, isRefreshing: ${activityState.isRefreshing}, isReloading: ${activityState.isReloading}, hasValue: ${activityState.hasValue}, hasError: ${activityState.hasError}');

    return Scaffold(
      appBar: AppBar(
        title: const Text('AsyncActivityProvider'),
      ),
      body: Center(
        child: activityState.when(
          data: (activity) => ActivityWidget(activity: activity),
          error: (e, st) => Text(
            e.toString(),
            style: const TextStyle(
              fontSize: 20,
              color: Colors.red,
            ),
            textAlign: TextAlign.center,
          ),
          loading: () => const CircularProgressIndicator(),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          final randomNumber = Random().nextInt(activityTypes.length);
          ref
              .read(asyncActivityProvider.notifier)
              .fetchActivity(activityTypes[randomNumber]);
        },
        label: Text(
          'New Activity',
          style: Theme.of(context).textTheme.titleLarge,
        ),
      ),
    );
  }
}

class ActivityWidget extends StatelessWidget {
  final Activity activity;

  const ActivityWidget({super.key, required this.activity});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(25),
      child: Column(
        children: [
          Text(
            activity.type,
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const Divider(),
          BulletedList(
            bullet: const Icon(Icons.check, color: Colors.green),
            listItems: [
              'activity: ${activity.activity}',
              'accessibility: ${activity.accessibility}',
              'participants: ${activity.participants}',
              'price: ${activity.price}',
              'key: ${activity.key}'
            ],
            style: Theme.of(context).textTheme.titleLarge,
          )
        ],
      ),
    );
  }
}
