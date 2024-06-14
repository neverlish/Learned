import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:optimize_rebuild/items/item_list_provider.dart';

class NewItem extends ConsumerStatefulWidget {
  const NewItem({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _NewItemState();
}

class _NewItemState extends ConsumerState<NewItem> {
  final _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
      decoration: const InputDecoration(
        labelText: 'Add item',
      ),
      onSubmitted: (String? newItem) {
        if (newItem != null && newItem.trim().isNotEmpty) {
          ref.read(itemListProvider.notifier).addItem(newItem);
          _controller.clear();
        }
      },
    );
  }
}
