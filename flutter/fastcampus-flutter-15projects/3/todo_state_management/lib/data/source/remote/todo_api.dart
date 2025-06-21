import 'dart:io';

import 'package:dio/dio.dart' hide Headers;

///retrofit Headers를 사용하기 위해 dio의 Headers를 숨김
///retrofit Headers를 사용하기 위해 dio의 Headers를 숨김
import 'package:retrofit/retrofit.dart';

import '../../entity/todo_dto.dart';
import 'dio/dio_json_response_converter.dart';

part 'todo_api.g.dart';

@RestApi()
abstract class TodoApi {
  factory TodoApi(Dio dio, {String? baseUrl}) {
    dio.interceptors.add(DioJsonResponseConverter());
    return _TodoApi(dio, baseUrl: Platform.isAndroid ? 'http://10.0.2.2:8080/' : 'http://localhost:8080/');
  }

  @GET('/todo')
  Future<List<TodoDTO>> getTodoList();

  @POST('/todo')
  Future<void> addTodo(@Body() TodoDTO todo);

  @PUT('/todo')
  Future<void> updateTodo(@Body() TodoDTO todo);

  @DELETE('/todo')
  @Headers(<String, dynamic>{
    "Content-Type": "text/plain",
  })
  Future<void> removeTodo(@Body() int todoId);
}
