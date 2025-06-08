import 'dart:io';

import 'package:dio/dio.dart' hide Headers;

///retrofit Headers를 사용하기 위해 dio의 Headers를 숨김
///retrofit Headers를 사용하기 위해 dio의 Headers를 숨김
import 'package:fast_app_base/data/memory/vo_todo.dart';
import 'package:retrofit/retrofit.dart';

import 'dio/dio_json_response_converter.dart';

part 'todo_client.g.dart';

@RestApi()
abstract class TodoClient {
  factory TodoClient(Dio dio, {String? baseUrl}) {
    dio.interceptors.add(DioJsonResponseConverter());
    return _TodoClient(dio,
        baseUrl: Platform.isAndroid ? 'http://10.0.2.2:8080/' : 'http://localhost:8080/');
  }

  @GET('/todo')
  Future<List<Todo>> getTodoList();

  @POST('/todo')
  Future<void> addTodo(@Body() Todo todo);

  @PUT('/todo')
  Future<void> updateTodo(@Body() Todo todo);

  @DELETE('/todo')
  @Headers(<String, dynamic>{
    "Content-Type": "text/plain",
  })
  Future<void> removeTodo(@Body() int todoId);
}
