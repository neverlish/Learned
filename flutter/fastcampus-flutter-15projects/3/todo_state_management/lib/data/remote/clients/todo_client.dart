import 'dart:io';

import 'package:dio/dio.dart' hide Headers;
import 'package:fast_app_base/data/memory/vo_todo.dart';
import 'package:retrofit/retrofit.dart';

part 'todo_client.g.dart';

@RestApi()
abstract class TodoClient {
  factory TodoClient(Dio dio, {String? baseUrl}) {
    return _TodoClient(dio,
        baseUrl: Platform.isAndroid
            ? 'http://10.0.2.2:8080/'
            : 'http://localhost:8080/');
  }

  @GET('/todos')
  Future<List<Todo>> getTodoList();

  @POST('/todos')
  Future<void> addTodo(@Body() Todo todo);

  @PUT('/todos/{id}')
  Future<void> updateTodo(@Path("id") int id, @Body() Todo todo);

  @DELETE('/todos/{id}')
  @Headers(<String, dynamic>{
    "Content-Type": "text/plain",
    "Content-Length": 0,
  })
  Future<void> removeTodo(@Path("id") int id);
}
