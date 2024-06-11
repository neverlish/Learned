// import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:future_provider/models/user.dart';
import 'package:future_provider/providers/dio_provider.dart';

part 'users_providers.g.dart';

// final userListProvider = FutureProvider.autoDispose<List<User>>((ref) async {
//   ref.onDispose(() {
//     print('[userListProvider] disposed');
//   });

//   final response = await ref.watch(dioProvider).get('/users');
//   // throw 'Fail to fetch user list';
//   final List userList = response.data;
//   final users = [for (final user in userList) User.fromJson(user)];
//   return users;
// });

@riverpod
FutureOr<List<User>> userList(UserListRef ref) async {
  ref.onDispose(() {
    print('[userListProvider] disposed');
  });

  final response = await ref.watch(dioProvider).get('/users');
  // throw 'Fail to fetch user list';
  final List userList = response.data;
  final users = [for (final user in userList) User.fromJson(user)];
  return users;
}

// final userDetailProvider =
//     FutureProvider.autoDispose.family<User, int>((ref, id) async {
//   ref.onDispose(() {
//     print('[userDetailProvider({$id})] disposed');
//   });

//   final response = await ref.watch(dioProvider).get('/users/$id');
//   final user = User.fromJson(response.data);
//   return user;
// });

@riverpod
FutureOr<User> userDetail(UserDetailRef ref, int id) async {
  ref.onDispose(() {
    print('[userDetailProvider({$ref.id})] disposed');
  });

  final response = await ref.watch(dioProvider).get('/users/$id');
  final user = User.fromJson(response.data);
  return user;
}
