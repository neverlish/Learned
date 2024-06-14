import 'dart:math';

import 'package:bulleted_list/bulleted_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:notifier_provider/models/activity.dart';
import 'package:notifier_provider/pages/enum_activity/enum_activity_state.dart';

import './enum_activity_provider.dart';

class EnumActivityPage extends ConsumerStatefulWidget {
  const EnumActivityPage({super.key});

  @override
  ConsumerState<EnumActivityPage> createState() => _EnumActivityPageState();
}

class _EnumActivityPageState extends ConsumerState<EnumActivityPage> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      ref.read(enumActivityProvider.notifier).fetchActivity(activityTypes[0]);
    });
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<EnumActivityState>(enumActivityProvider, (previous, next) {
      if (next.status == ActivityStatus.failure) {
        showDialog(
          context: context,
          builder: (context) {
            return AlertDialog(content: Text(next.error));
          },
        );
      }
    });
    final activityState = ref.watch(enumActivityProvider);

    return Scaffold(
        appBar: AppBar(
          title: const Text('EnumActivityNotifier'),
          actions: [
            IconButton(
              onPressed: () {
                ref.read(myCounterProvider.notifier).increment();
              },
              icon: const Icon(Icons.add),
            ),
            IconButton(
              onPressed: () {
                ref.invalidate(enumActivityProvider);
              },
              icon: const Icon(Icons.refresh),
            )
          ],
        ),
        body: switch (activityState.status) {
          ActivityStatus.initial => const Center(
              child: Text(
                'Get some activity',
                style: TextStyle(fontSize: 20),
              ),
            ),
          ActivityStatus.loading => const Center(
              child: CircularProgressIndicator(),
            ),
          ActivityStatus.failure => activityState.activity == Activity.empty()
              ? const Center(
                  child: Text(
                    'Get some activity',
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.red,
                    ),
                  ),
                )
              : ActivityWidget(activity: activityState.activity),
          ActivityStatus.success =>
            ActivityWidget(activity: activityState.activity),
        },
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            final randomNumber = Random().nextInt(activityTypes.length);
            ref
                .read(enumActivityProvider.notifier)
                .fetchActivity(activityTypes[randomNumber]);
          },
          label: Text(
            'New Activity',
            style: Theme.of(context).textTheme.titleLarge,
          ),
        ));
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
