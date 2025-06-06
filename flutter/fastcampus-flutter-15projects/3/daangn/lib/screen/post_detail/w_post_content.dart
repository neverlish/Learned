import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/entity/post/vo_product_post.dart';
import 'package:fast_app_base/entity/post/vo_simple_product_post.dart';
import 'package:flutter/material.dart';
import 'package:timeago/timeago.dart' as timeago;

class PostContent extends StatelessWidget {
  final SimpleProductPost simpleProductPost;
  final ProductPost? productPost;

  const PostContent({
    super.key,
    required this.simpleProductPost,
    this.productPost,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        simpleProductPost.title.text.bold.make(),
        height20,
        timeago
            .format(simpleProductPost.createdTime,
                locale: context.locale.languageCode)
            .text
            .size(13)
            .color(context.appColors.lessImportant)
            .make(),
        if (productPost == null)
          const Center(
            child: CircularProgressIndicator(),
          ),
        if (productPost != null)
          productPost!.content.text.make().pOnly(top: 30, bottom: 60),
      ],
    ).pSymmetric(h: 15);
  }
}
