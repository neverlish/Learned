import 'package:flutter/material.dart';

import '../../../../../core/utils/component/common_image.dart';
import '../../../../../domain/model/display/display.model.dart';
import 'factory/view_module_widget.dart';

class BannerViewModule extends StatelessWidget with ViewModuleWidget {
  final ViewModule info;

  const BannerViewModule({Key? key, required this.info}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return info.imageUrl.isNotEmpty
        ? AspectRatio(
            aspectRatio: 375 / 79,
            child: CommonImage(info.imageUrl),
          )
        : const SizedBox.shrink();
  }
}
