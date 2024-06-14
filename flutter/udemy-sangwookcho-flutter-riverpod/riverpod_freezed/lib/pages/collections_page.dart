import 'package:flutter/material.dart';
import 'package:riverpod_freezed/models/collections.dart';

class CollectionsPage extends StatelessWidget {
  const CollectionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    // final immutableColl = ImmutableColl([]);
    // immutableColl.list.add(42);

    final mutableColl = MutableColl([]);
    mutableColl.list.add(42);
    print(mutableColl);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Collections'),
      ),
    );
  }
}
