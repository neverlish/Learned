import 'dart:convert';
import 'dart:math';

import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';

import 'dto/product_info.dto.dart';
import 'dto/view_module.dto.dart';

part 'data.dart';
part 'request.dart';

Handler handler =
    (Router()
          ..get('/api/menus/<mallType>', menuHandler)
          ..get('/api/view-modules/<tabId>/<page>', viewModuleHandler))
        .call;

void main(List<String> args) async {
  final server = await serve(handler, '127.0.0.1', 8080);
  print('Server listening on port 8080...');
}
