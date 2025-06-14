import 'package:fastcampus_market/home/cart_screen.dart';
import 'package:fastcampus_market/home/home_screen.dart';
import 'package:fastcampus_market/home/product_add_screen.dart';
import 'package:fastcampus_market/home/product_detail_screen.dart';
import 'package:fastcampus_market/login/login_screen.dart';
import 'package:fastcampus_market/login/sign_up_screen.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  MyApp({super.key});

  final router = GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
        routes: [
          GoRoute(
            path: 'cart/:uid',
            builder: (context, state) => CartScreen(
              uid: state.pathParameters['uid'] ?? '',
            ),
          ),
          GoRoute(
            path: 'product',
            builder: (context, state) => const ProductDetailScreen(),
          ),
          GoRoute(
            path: 'product/add',
            builder: (context, state) => const ProductAddScreen(),
          ),
        ],
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/sign_up',
        builder: (context, state) => const SignUpScreen(),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: '패캠마트',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      routerConfig: router,
    );
  }
}
