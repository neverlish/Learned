import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:todo_riverpod_sync/models/todo_model.dart';

part 'todo_filter_provider.g.dart';

@riverpod
class TodoFilter extends _$TodoFilter {
  @override
  Filter build() {
    return Filter.all;
  }

  void changeFilter(Filter newFilter) {
    state = newFilter;
  }
}
