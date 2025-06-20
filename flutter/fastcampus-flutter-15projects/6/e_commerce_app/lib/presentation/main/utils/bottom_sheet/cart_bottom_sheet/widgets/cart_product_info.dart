import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../../core/utils/component/common_image.dart';
import '../../../../../../core/utils/extensions.dart';
import '../../../../bloc/cart_bloc/cart_bloc.dart';

class CartProductInfo extends StatelessWidget {
  const CartProductInfo({super.key});

  @override
  Widget build(BuildContext context) {
    final productInfo = context.watch<CartBloc>().state.productInfo;
    
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          CommonImage(
            productInfo.imageUrl,
            height: 40,
            width: 40,
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  productInfo.title,
                  style: Theme.of(
                    context,
                  ).textTheme.titleSmall?.titleCopyWith(),
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  productInfo.subtitle,
                  style: Theme.of(
                    context,
                  ).textTheme.labelMedium?.copyWith(color: Colors.grey),
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
