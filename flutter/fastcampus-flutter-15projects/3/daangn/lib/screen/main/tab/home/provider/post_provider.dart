import 'package:fast_app_base/entity/dummies.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../../entity/post/vo_simple_product_post.dart';

final postProvider = StateProvider<List<SimpleProductPost>>((ref) => postList);
