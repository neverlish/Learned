import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:kakao_flutter_sdk_user/kakao_flutter_sdk_user.dart';

import 'core/theme/theme_data.dart';
import 'core/utils/constant.dart';
import 'data/entity/display/cart/cart.entity.dart';
import 'data/entity/display/product_info/product_info.entity.dart';
import 'data/entity/display/target_api/target_api.dart';
import 'data/entity/display/view_module/view_module.entity.dart';
import 'data/entity/display/view_module_list/view_module_list.entity.dart';
import 'dependency_injection.dart';
import 'presentation/main/bloc/cart_bloc/cart_bloc.dart';
import 'presentation/main/bloc/user_bloc/user_bloc.dart';
import 'presentation/pages/cart_list/bloc/cart_list_bloc/cart_list_bloc.dart';
import 'presentation/routes/routes.dart';

void main(name, options) async {
  await Hive.initFlutter();
  Hive.registerAdapter(ProductInfoEntityAdapter());
  Hive.registerAdapter(CartEntityAdapter());
  Hive.registerAdapter(ViewModuleEntityAdapter());
  Hive.registerAdapter(ViewModuleListEntityAdapter());
  Hive.registerAdapter(TargetApiAdapter());

  await TargetApiValue().setTargetApi();

  configureDependencies();

  KakaoSdk.init(nativeAppKey: '');

  await Firebase.initializeApp(name: name, options: options);

  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (_) => getIt<UserBloc>()..add(UserLoginWithToken()),
        ),
        BlocProvider(create: (_) => getIt<CartBloc>()..add(CartInitialized())),
        BlocProvider(
          create: (_) => getIt<CartListBloc>()..add(CartListInitialized()),
          lazy: false,
        ),
      ],
      child: MaterialApp.router(
        routerConfig: router,
        theme: CustomThemeData.themeData,
      ),
    );
  }
}

class TargetApiValue {
  TargetApi? targetApi = TargetApi.REMOTE;

  static final TargetApiValue _instance = TargetApiValue._internal();

  bool get isRemoteApi => targetApi == TargetApi.REMOTE;

  factory TargetApiValue() => _instance;

  TargetApiValue._internal();

  Future<void> setTargetApi() async {
    var localStorage = await Hive.openBox<TargetApi>(Constants.targetApiKey);

    targetApi = localStorage.get(
      Constants.targetApiKey,
      defaultValue: TargetApi.REMOTE,
    );
  }
}
