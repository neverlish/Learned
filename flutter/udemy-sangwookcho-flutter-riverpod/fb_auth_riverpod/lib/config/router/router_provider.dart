import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../pages/auth/reset_password/reset_password_page.dart';
import '../../pages/auth/signin/signin_page.dart';
import '../../pages/auth/signup/signup_page.dart';
import '../../pages/auth/verify_email/verify_email_page.dart';
import '../../pages/content/change_password/change_password_page.dart';
import '../../pages/content/home/home_page.dart';
import '../../pages/page_not_found.dart';
import '../../pages/splash/firebase_error_page.dart';
import '../../pages/splash/splash_page.dart';
import 'route_names.dart';

part 'router_provider.g.dart';

@riverpod
GoRouter router(RouterRef ref) {
  return GoRouter(
    initialLocation: '/splash',
    routes: [
      GoRoute(
        path: '/splash',
        name: RouteNames.splash,
        builder: (context, state) {
          print('##### Splash #####');
          return const SplashPage();
        },
      ),
      GoRoute(
        path: '/firebaseError',
        name: RouteNames.firebaseError,
        builder: (context, state) {
          return const FirebaseErrorPage();
        },
      ),
      GoRoute(
        path: '/signin',
        name: RouteNames.signin,
        builder: (context, state) {
          return const SigninPage();
        },
      ),
      GoRoute(
        path: '/signup',
        name: RouteNames.signup,
        builder: (context, state) {
          return const SignupPage();
        },
      ),
      GoRoute(
        path: '/resetPassword',
        name: RouteNames.resetPassword,
        builder: (context, state) {
          return const ResetPasswordPage();
        },
      ),
      GoRoute(
        path: '/verifyEmail',
        name: RouteNames.verifyEmail,
        builder: (context, state) {
          return const VerifyEmailPage();
        },
      ),
      GoRoute(
        path: '/home',
        name: RouteNames.home,
        builder: (context, state) {
          return const HomePage();
        },
        routes: [
          GoRoute(
            path: 'changePassword',
            name: RouteNames.changePassword,
            builder: (context, state) {
              return const ChangePasswordPage();
            },
          ),
        ],
      ),
    ],
    errorBuilder: (context, state) {
      return PageNotFound(
        errorMessage: state.error.toString(),
      );
    },
  );
}
