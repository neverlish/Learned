import 'package:bulleted_list/bulleted_list.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'product_providers.dart';

class ProductPage extends ConsumerWidget {
  final int id;
  const ProductPage({
    super.key,
    required this.id,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final singleProduct = ref.watch(getProductProvider(id));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Product Detail'),
      ),
      body: singleProduct.when(
        data: (product) {
          return ListView(
            padding: const EdgeInsets.only(top: 20, left: 20, right: 20),
            children: [
              Row(
                children: [
                  CircleAvatar(
                    child: Text(
                      id.toString(),
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      product.title,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                  )
                ],
              ),
              const Divider(),
              BulletedList(
                bullet: const Icon(Icons.check, color: Colors.green),
                listItems: [
                  'brand: ${product.brand}',
                  'price: \$${product.price}',
                  'discount(%): ${product.discountPercentage}',
                  'stock: ${product.stock}',
                  'category: ${product.category}',
                  'description: ${product.description}',
                ],
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const Divider(),
              SizedBox(
                width: double.infinity,
                child: Image.network(product.thumbnail, fit: BoxFit.cover),
              ),
            ],
          );
        },
        error: (e, st) => Center(
          child: Padding(
            padding: const EdgeInsets.all(30.0),
            child: Text(
              e.toString(),
              style: Theme.of(context).textTheme.headlineMedium,
              textAlign: TextAlign.center,
            ),
          ),
        ),
        loading: () => const Center(
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }
}
