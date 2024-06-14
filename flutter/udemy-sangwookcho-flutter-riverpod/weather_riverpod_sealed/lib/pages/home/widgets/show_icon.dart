import 'package:flutter/material.dart';
import 'package:weather_riverpod_sealed/constants/constants.dart';

class ShowIcon extends StatelessWidget {
  final String icon;
  const ShowIcon({super.key, required this.icon});

  @override
  Widget build(BuildContext context) {
    return FadeInImage.assetNetwork(
      placeholder: 'assets/images/loading.gif',
      image: 'https://$kIconHost/img/wn/$icon@4x.png',
      width: 96,
      height: 96,
      imageErrorBuilder: (context, e, st) {
        return Image.asset(
          'assets/images/no_image_icon.png',
          width: 96,
          height: 96,
        );
      },
    );
  }
}
