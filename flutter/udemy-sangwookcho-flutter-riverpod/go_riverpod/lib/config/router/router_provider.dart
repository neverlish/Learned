import 'package:flutter/material.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_riverpod/pages/first_details_page.dart';
import 'package:go_riverpod/pages/first_page.dart';
import 'package:go_riverpod/pages/scaffold_with_nav_bar.dart';
import 'package:go_riverpod/pages/second_details_page.dart';
import 'package:go_riverpod/pages/second_page.dart';
import 'package:go_riverpod/pages/signin_page.dart';
import 'package:go_riverpod/pages/signup_page.dart';
import 'package:go_riverpod/pages/third_details_page.dart';
import 'package:go_riverpod/pages/third_page.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router_provider.g.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>();

@riverpod
GoRouter route(RouteRef ref) {
  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: '/first',
    routes: [
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
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return ScaffoldWithNavBar(navigationShell: navigationShell);
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/first',
                name: RouteNames.first,
                builder: (context, state) {
                  return const FirstPage();
                },
                routes: [
                  GoRoute(
                    path: 'details',
                    name: RouteNames.firstDetails,
                    builder: (context, state) {
                      return const FirstDetailsPage();
                    },
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/second',
                name: RouteNames.second,
                builder: (context, state) {
                  return const SecondPage();
                },
                routes: [
                  GoRoute(
                    path: 'details/:id',
                    name: RouteNames.secondDetails,
                    builder: (context, state) {
                      final id = state.pathParameters['id']!;
                      return SecondDetailsPage(id: id);
                    },
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/third',
                name: RouteNames.third,
                builder: (context, state) {
                  return const ThirdPage();
                },
                routes: [
                  GoRoute(
                    path: 'details/:id',
                    name: RouteNames.thirdDetails,
                    builder: (context, state) {
                      final id = state.pathParameters['id']!;
                      final firstName =
                          state.uri.queryParameters['firstName'] ?? 'Anonymous';
                      final lastName =
                          state.uri.queryParameters['lastName'] ?? 'Anonymous';

                      return ThirdDetailsPage(
                        id: id,
                        firstName: firstName,
                        lastName: lastName,
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
