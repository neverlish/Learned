import 'package:fast_app_base/entity/post/vo_simple_product_post.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'vo_product_post.freezed.dart';

@freezed
class ProductPost with _$ProductPost {
  const factory ProductPost({
    required final SimpleProductPost simpleProductPost,
    required final String content,
  }) = _ProductPost;
}
