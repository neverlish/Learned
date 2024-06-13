import 'package:dio/dio.dart';
import 'package:num_pagination/models/product.dart';
import 'package:num_pagination/repositories/dio_provider.dart';

import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'product_repository.g.dart';

const limit = 10;
int totalProducts = 0;
int totalPages = 1;

class ProductRepository {
  final Dio dio;

  ProductRepository(this.dio);

  Future<List<Product>> getProducts(int page) async {
    try {
      final Response response = await dio.get(
        '/products',
        queryParameters: {
          'limit': limit,
          'skip': (page - 1) * limit,
        },
      );
      if (response.statusCode != 200) {
        throw 'Fail to fetch products';
      }

      final List productList = response.data['products'];

      totalProducts = response.data['total'];

      totalPages = totalProducts ~/ limit + (totalProducts % limit > 0 ? 1 : 0);

      final products = [
        for (final product in productList) Product.fromJson(product)
      ];

      return products;
    } catch (e) {
      rethrow;
    }
  }

  Future<Product> getProduct(int id) async {
    try {
      final Response response = await dio.get('/products/$id');
      if (response.statusCode != 200) {
        throw 'Fail to fetch product';
      }

      return Product.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}

@riverpod
ProductRepository productRepository(ProductRepositoryRef ref) {
  return ProductRepository(ref.watch(dioProvider));
}
