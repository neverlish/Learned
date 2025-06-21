import 'package:fast_app_base/common/cli_common.dart';
import 'package:fast_app_base/entity/post/vo_product_post.dart';

import '../../../data/network/daangn_api.dart';

Future<ProductPost> requestPost(int id) async {
  await sleepAsync(400.ms);
  return await DaangnApi.getPost(id);
}
