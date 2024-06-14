import 'package:num_pagination/models/product.dart';
import 'package:num_pagination/repositories/product_repository.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'product_providers.g.dart';

@riverpod
FutureOr<Product> getProduct(GetProductRef ref, int id) {
  ref.onDispose(() {
    print('product with $id disposed');
  });
  return ref.watch(productRepositoryProvider).getProduct(id);
}
