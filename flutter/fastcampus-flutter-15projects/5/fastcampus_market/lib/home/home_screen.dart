import 'package:fastcampus_market/home/product_add_screen.dart';
import 'package:fastcampus_market/home/widgets/home_widget.dart';
import 'package:fastcampus_market/home/widgets/seller_widget.dart';
import 'package:fastcampus_market/login/provider/login_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _menuIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text('패캠 마트'),
        centerTitle: true,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.logout,
            ),
          ),
          if (_menuIndex == 0)
            IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.search,
              ),
            ),
        ],
      ),
      body: IndexedStack(
        index: _menuIndex,
        children: const [
          HomeWidget(),
          SellerWidget(),
        ],
      ),
      floatingActionButton: Consumer(builder: (context, ref, child) {
        final user = ref.watch(userCredentialProvider);
        return switch (_menuIndex) {
          0 => FloatingActionButton(
              onPressed: () {
                final uid = user?.user?.uid;
                if (uid == null) {
                  return;
                }
                context.go('/cart/$uid');
              },
              child: const Icon(Icons.shopping_cart_outlined),
            ),
          1 => FloatingActionButton(
              onPressed: () {
                Navigator.of(context).push(MaterialPageRoute(
                  builder: (context) => const ProductAddScreen(),
                ));
              },
              child: const Icon(Icons.add),
            ),
          _ => Container(),
        };
      }),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _menuIndex,
        onDestinationSelected: (indx) {
          setState(() {
            _menuIndex = indx;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.store_outlined),
            label: '홈',
          ),
          NavigationDestination(
            icon: Icon(Icons.storefront),
            label: '사장님(판매자)',
          ),
        ],
      ),
    );
  }
}
