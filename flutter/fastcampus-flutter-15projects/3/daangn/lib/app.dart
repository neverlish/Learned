import 'package:fast_app_base/auth.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/fcm/fcm_manager.dart';
import 'package:fast_app_base/common/route/transition/fade_transition_page.dart';
import 'package:fast_app_base/common/theme/custom_theme_app.dart';
import 'package:fast_app_base/common/widget/w_round_button.dart';
import 'package:fast_app_base/entity/post/vo_simple_product_post.dart';
import 'package:fast_app_base/screen/main/s_main.dart';
import 'package:fast_app_base/screen/main/tab/tab_item.dart';
import 'package:fast_app_base/screen/post_detail/s_post_detail.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'common/theme/custom_theme.dart';

class App extends StatefulWidget {
  static final GlobalKey<NavigatorState> navigatorKey = GlobalKey();

  ///light, dark 테마가 준비되었고, 시스템 테마를 따라가게 하려면 해당 필드를 제거 하시면 됩니다.
  static const defaultTheme = CustomTheme.dark;
  static bool isForeground = true;
  static final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey =
      GlobalKey();


  const App({super.key});

  @override
  State<App> createState() => AppState();
}

class AppState extends State<App> with WidgetsBindingObserver, Nav {
  final ValueKey<String> _scaffoldKey = const ValueKey<String>('App scaffold');

  final _auth = DaangnAuth();


  @override
  void initState() {
    super.initState();
    FcmManager.requestPermission();
    FcmManager.initialize();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CustomThemeApp(
      child: Builder(builder: (context) {
        return ProviderScope(
          child: DaangnAuthScope(
            notifier: _auth,
            child: MaterialApp.router(
              scaffoldMessengerKey: App.scaffoldMessengerKey,
              routerConfig: _router,
              localizationsDelegates: context.localizationDelegates,
              supportedLocales: context.supportedLocales,
              locale: context.locale,
              title: 'Image Finder',
              theme: context.themeType.themeData,
            ),
          ),
        );
      }),
    );
  }

  late final GoRouter _router = GoRouter(
    navigatorKey: App.navigatorKey,
    routes: <GoRoute>[
      GoRoute(
        path: '/',
        redirect: (_, __) => '/main',
      ),
      GoRoute(
        path: '/signin',
        pageBuilder: (BuildContext context, GoRouterState state) =>
            FadeTransitionPage(
          key: state.pageKey,
          child: Container(
            color: Colors.green,
            child: Center(
              child: RoundButton(
                text: '로그인',
                onTap: () {
                  _auth.signIn('hong', '1234');
                },
              ),
            ),
          ),
        ),
      ),
      GoRoute(
        path: '/main',
        redirect: (_, __) => '/main/home',
      ),
      GoRoute(
        path: '/productPost/:postId',
        redirect: (BuildContext context, GoRouterState state) =>
            '/main/home/${state.pathParameters['postId']}',
      ),
      GoRoute(
        path: '/main/:kind(home|localLife|nearMy|chat|my)',
        pageBuilder: (BuildContext context, GoRouterState state) =>
            FadeTransitionPage(
          key: _scaffoldKey,
          child: MainScreen(
            firstTab: TabItem.find(state.pathParameters['kind']),
          ),
        ),
        routes: <GoRoute>[
          GoRoute(
            path: ':postId',
            builder: (BuildContext context, GoRouterState state) {
              final String postId = state.pathParameters['postId']!;
              if (state.extra != null) {
                final post = state.extra as SimpleProductPost;
                return PostDetailScreen(
                  int.parse(postId),
                  simpleProductPost: post,
                );
              } else {
                return PostDetailScreen(int.parse(postId));
              }
            },
          ),
        ],
      ),
    ],
    redirect: _auth.guard,
    refreshListenable: _auth,
    debugLogDiagnostics: true,
  );

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.resumed:
        App.isForeground = true;
        break;
      case AppLifecycleState.inactive:
        break;
      case AppLifecycleState.paused:
        App.isForeground = false;
        break;
      case AppLifecycleState.detached:
        break;
      case AppLifecycleState.hidden: //Flutter 3.13 이하 버전을 쓰신다면 해당 라인을 삭제해주세요.
        break;
    }
    super.didChangeAppLifecycleState(state);
  }
  
  @override
  GlobalKey<NavigatorState> get navigatorKey => App.navigatorKey;
}
