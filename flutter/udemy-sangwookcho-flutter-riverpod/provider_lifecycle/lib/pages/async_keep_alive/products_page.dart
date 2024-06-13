import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:provider_lifecycle/pages/async_keep_alive/product_page.dart';
import 'package:provider_lifecycle/pages/async_keep_alive/providers.dart';

class ProductsPage extends ConsumerWidget {
  const ProductsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productList = ref.watch(getProductsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Products'),
      ),
      body: productList.when(
        data: (products) {
          return ListView.separated(
            itemCount: products.length,
            separatorBuilder: (BuildContext context, int index) {
              return const Divider();
            },
            itemBuilder: (BuildContext context, int index) {
              final product = products[index];
              return GestureDetector(
                onTap: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) {
                      return ProductPage(productId: product.id);
                    }),
                  );
                },
                child: ListTile(
                  leading: CircleAvatar(child: Text('${product.id}')),
                  title: Text(product.title),
                ),
              );
            },
          );
        },
        error: (e, st) => Center(
          child: Text(
            e.toString(),
            style: Theme.of(context).textTheme.headlineMedium,
            textAlign: TextAlign.center,
          ),
        ),
        loading: () => const Center(
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }
}
