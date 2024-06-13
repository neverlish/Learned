import 'package:dio/dio.dart';
import 'package:provider_lifecycle/models/product.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'providers.g.dart';

@riverpod
Dio dio(DioRef ref) {
  return Dio(
    BaseOptions(baseUrl: 'https://dummyjson.com'),
  );
}

@riverpod
FutureOr<List<Product>> getProducts(GetProductsRef ref) async {
  print('[getProductsProvider] initialized');
  ref.onDispose(() {
    print('[getProductsProvider] disposed');
  });
  ref.onCancel(() {
    print('[getProductsProvider] canceled');
  });
  ref.onResume(() {
    print('[getProductsProvider] resumed');
  });
  ref.onAddListener(() {
    print('[getProductsProvider] listener added');
  });
  ref.onRemoveListener(() {
    print('[getProductsProvider] listener removed');
  });

  final response = await ref.read(dioProvider).get('/products');
  final List productList = response.data['products'];
  final products = [
    for (final product in productList) Product.fromJson(product),
  ];
  return products;
}

@riverpod
FutureOr<Product> getProduct(GetProductRef ref,
    {required int productId}) async {
  print('[getProductProvider($productId)] initialized');
  ref.onDispose(() {
    print('[getProductProvider($productId)] disposed');
  });
  ref.onCancel(() {
    print('[getProductProvider($productId)] canceled');
  });
  ref.onResume(() {
    print('[getProductProvider($productId)] resumed');
  });
  ref.onAddListener(() {
    print('[getProductProvider($productId)] listener added');
  });
  ref.onRemoveListener(() {
    print('[getProductProvider($productId)] listener removed');
  });

  final response = await ref.read(dioProvider).get('/products/$productId');

  final product = Product.fromJson(response.data);

  return product;
}
