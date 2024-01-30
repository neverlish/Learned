import 'user.dart';

void main(List<String> arguments) {
  final User user1 = User(
    id: '1',
    name: 'name',
    email: 'email',
  );
  final User user2 = User(
    id: '1',
    name: 'name',
    email: 'email',
  );
  print(user1 == user2);
  print(user1.hashCode);
  print(user2.hashCode);
}
