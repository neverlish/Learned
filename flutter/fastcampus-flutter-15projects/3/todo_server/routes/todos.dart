import 'dart:convert';

import 'package:dart_frog/dart_frog.dart';

import '../vo/vo_todo.dart';

List<Todo> todoList = [];
final commonHeader = {'Content-Type': 'application/json'};

Future<Response> onRequest(RequestContext context) async {
  final request = context.request;
  final method = request.method;

  switch (method) {
    case HttpMethod.get:
      return Response(
        statusCode: 200,
        headers: commonHeader,
        body: json.encode(
          todoList.map((e) => e.toJson()).toList(),
        ),
      );
    case HttpMethod.post:
      final todo = await getTodo(request);
      todoList.add(todo);
      return Response(
        statusCode: 201,
        headers: commonHeader,
      );
    case HttpMethod.put:
    case HttpMethod.delete:
      return Response(
        statusCode: 400,
        body: '{"errorMessage": "path에 id값을 추가해주세요."}',
        headers: commonHeader,
      );
    case HttpMethod.head:
    case HttpMethod.options:
    case HttpMethod.patch:
      return Response(
        statusCode: 500,
        body: '{"errorMessage": "지원하지 않는 method입니다."}',
        headers: commonHeader,
      );
  }
}

Future<Todo> getTodo(Request request) async {
  final body = await request.body();
  final todo = Todo.fromJson(json.decode(body) as Map<String, Object?>);
  return todo;
}
