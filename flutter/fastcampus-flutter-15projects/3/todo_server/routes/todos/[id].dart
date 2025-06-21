import 'package:dart_frog/dart_frog.dart';

import '../todos.dart';

final commonHeader = {'Content-Type': 'application/json'};

Future<Response> onRequest(RequestContext context, String stringId) async {
  final request = context.request;
  final method = request.method;
  final id = int.parse(stringId);

  switch (method) {
    case HttpMethod.put:
    case HttpMethod.post:
      final todo = await getTodo(request);
      final savedTodo = todoList.firstWhereOrNull(
        (element) => element.id == id,
      );
      if (savedTodo == null) {
        todoList.add(todo);
        return Response(
          statusCode: 201,
          headers: commonHeader,
        );
      }
      savedTodo.update(todo);
      return Response(
        statusCode: 201,
        headers: commonHeader,
      );
    case HttpMethod.delete:
      todoList.removeWhere((element) => element.id == id);
      return Response(
        statusCode: 201,
        headers: commonHeader,
      );
    case HttpMethod.get:
    case HttpMethod.options:
    case HttpMethod.patch:
    case HttpMethod.head:
      return Response(
        statusCode: 500,
        body: '{"errorMessage": "지원하지 않는 method입니다"}',
        headers: commonHeader,
      );
  }
}

extension FirstWhereOrNullExtension<E> on Iterable<E> {
  E? firstWhereOrNull(bool Function(E) test) {
    for (final element in this) {
      if (test(element)) return element;
    }
    return null;
  }
}
