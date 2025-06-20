import 'package:injectable/injectable.dart';

import '../../domain/repository/user.repository.dart';

@Singleton(as: UserRepository)
class UserRepositoryImpl implements UserRepository {
  UserRepositoryImpl();
}
