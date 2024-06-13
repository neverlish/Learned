import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class NewItem extends ConsumerStatefulWidget {
  const NewItem({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _NewItemState();
}

class _NewItemState extends ConsumerState<NewItem> {
  @override
  Widget build(BuildContext context) {
    return const Text('NewItem');
  }
}
