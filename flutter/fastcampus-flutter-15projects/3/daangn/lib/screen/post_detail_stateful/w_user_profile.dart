import 'package:cached_network_image/cached_network_image.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/entity/user/vo_address.dart';
import 'package:flutter/material.dart';

import '../../entity/user/vo_user.dart';

class UserProfileWidget extends StatelessWidget {
  final User user;
  final Address address;

  const UserProfileWidget(this.user, {required this.address, super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        ClipOval(
            child: CachedNetworkImage(
          imageUrl: user.profileUrl,
          width: 60,
        )),
        width20,
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              user.nickname.text.bold.make(),
              height10,
              address.simpleAddress.text.make(),
            ],
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            //귀여운위젯
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    '${user.temperature}℃'.text.color(Colors.green).bold.make(),
                    const SizedBox(
                        width: 60,
                        child: LinearProgressIndicator(
                          value: 0.3,
                          color: Colors.green,
                        ))
                  ],
                ),
                Image.asset(
                  '$basePath/detail/smile.png',
                  width: 30,
                )
              ],
            ),
            '매너온도'.text.color(context.appColors.lessImportant).underline.make()
          ],
        )
      ],
    ).p(15);
  }
}
