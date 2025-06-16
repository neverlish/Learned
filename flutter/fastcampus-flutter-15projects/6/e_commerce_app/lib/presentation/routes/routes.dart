import 'package:go_router/go_router.dart';

import '../main/main_screen.dart';
import '../pages/splash/splash_page.dart';
import 'routes_path.dart';

final GoRouter router = GoRouter(
  routes: [
    GoRoute(
      path: RoutePath.splash,
      name: 'splash',
      builder: (context, state) => const SplashPage(),
    ),
    GoRoute(
      path: RoutePath.main,
      name: 'home',
      builder: (context, state) => const MainScreen(),
    ),
  ],
  initialLocation: '/',
);
