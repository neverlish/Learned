import 'package:cached_network_image/cached_network_image.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/entity/post/vo_simple_product_post.dart';
import 'package:flutter/material.dart';
import 'package:timeago/timeago.dart' as timeago;

class ProductPostItem extends StatelessWidget {
  final SimpleProductPost post;
  const ProductPostItem(this.post, {super.key});

  @override
  Widget build(BuildContext context) {
    return Tap(
      onTap: () {
        context.go('/main/localLife/${post.id}', extra: post);
        // Nav.push(
        //   PostDetailScreen(post.id, simpleProductPost: post),
        //   durationMs: 800,
        // );
      },
      child: Stack(
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Hero(
                  tag: '${post.id}_${post.product.images[0]}',
                  child: CachedNetworkImage(
                    imageUrl: post.product.images[0],
                    width: 150,
                  ),
                ),
              ),
              const Width(10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Hero(
                      tag: '${post.id}_title',
                      child:
                          Material(child: post.title.text.size(17).bold.make()),
                    ),
                    Row(
                      children: [
                        post.address.simpleAddress.text
                            .color(context.appColors.lessImportant)
                            .make(),
                        '•'.text.color(context.appColors.lessImportant).make(),
                        timeago
                            .format(post.createdTime,
                                locale: context.locale.languageCode)
                            .text
                            .color(context.appColors.lessImportant)
                            .make(),
                      ],
                    ),
                    post.product.price.toWon().text.bold.make(),
                  ],
                ),
              )
            ],
          ).p(15),
          Positioned.fill(
            child: Align(
              alignment: Alignment.bottomRight,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset("$basePath/home/post_comment.png"),
                  post.chatCount.text.make(),
                  Image.asset("$basePath/home/post_heart_off.png"),
                  post.likeCount.text.make(),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
