import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:infinite_scroll/models/product.dart';
import 'package:infinite_scroll/pages/product/product_page.dart';
import 'package:infinite_scroll/repositories/product_repository.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

class ProductsPage extends ConsumerStatefulWidget {
  const ProductsPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _ProductsPageState();
}

class _ProductsPageState extends ConsumerState<ProductsPage> {
  final PagingController<int, Product> _pagingController =
      PagingController(firstPageKey: 1);

  @override
  void initState() {
    super.initState();
    _pagingController.addPageRequestListener((pageKey) {
      _fetchProducts(pageKey);
    });
  }

  Future<void> _fetchProducts(int pageKey) async {
    try {
      final newProducts =
          await ref.read(productRepositoryProvider).getProducts(pageKey);
      final isLastPage = newProducts.length < limit;

      if (isLastPage) {
        _pagingController.appendLastPage(newProducts);
      } else {
        final nextPageKey = pageKey + 1;
        _pagingController.appendPage(newProducts, nextPageKey);
      }
    } catch (error) {
      _pagingController.error = error;
    }
  }

  @override
  void dispose() {
    _pagingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Product List'),
      ),
      body: RefreshIndicator(
        onRefresh: () async => _pagingController.refresh(),
        child: PagedListView<int, Product>.separated(
          pagingController: _pagingController,
          builderDelegate: PagedChildBuilderDelegate(
              itemBuilder: (context, product, index) {
                return GestureDetector(
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (_) => ProductPage(id: product.id),
                      ),
                    );
                  },
                  child: Row(
                    children: [
                      const SizedBox(width: 20),
                      CircleAvatar(child: Text(product.id.toString())),
                      Expanded(
                        child: ListTile(
                          title: Text(product.title),
                          subtitle: Text(product.brand ?? ''),
                        ),
                      ),
                    ],
                  ),
                );
              },
              noMoreItemsIndicatorBuilder: (context) => const Padding(
                    padding: EdgeInsets.symmetric(vertical: 20.0),
                    child: Text(
                      'No more products!',
                      style: TextStyle(fontSize: 20),
                    ),
                  ),
              firstPageErrorIndicatorBuilder: (context) {
                return Padding(
                  padding: const EdgeInsets.symmetric(
                    vertical: 50,
                    horizontal: 30,
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'Something went wrong',
                        style: TextStyle(fontSize: 20),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        '${_pagingController.error}',
                        style: const TextStyle(fontSize: 18),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 20),
                      OutlinedButton(
                        onPressed: () => _pagingController.refresh(),
                        child: const Text(
                          'Try Again!',
                          style: TextStyle(fontSize: 20),
                        ),
                      ),
                    ],
                  ),
                );
              }),
          separatorBuilder: (context, index) {
            return const Divider();
          },
        ),
      ),
    );
  }
}
