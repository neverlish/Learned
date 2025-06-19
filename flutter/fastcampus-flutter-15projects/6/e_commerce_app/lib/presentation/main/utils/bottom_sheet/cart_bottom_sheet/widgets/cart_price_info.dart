import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../../core/theme/constant/app_icons.dart';
import '../../../../../../core/theme/custom/custom_font_weight.dart';
import '../../../../../../core/theme/custom/custom_theme.dart';
import '../../../../../../core/utils/extensions.dart';
import '../../../../bloc/cart_bloc/cart_bloc.dart';
import '../../../../component/widgets/svg_icon_button.dart';

/// 96
const double _counterWidth = 96;

/// 36
const double _counterHeight = 36;

const double _iconPadding = 8;

class CartPriceInfo extends StatelessWidget {
  const CartPriceInfo({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    final productInfo = context.watch<CartBloc>().state.productInfo;
    final quantity = context.watch<CartBloc>().state.quantity;

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      child: Column(
        children: [
          Text(
            productInfo.title,
            style: textTheme.titleSmall,
            overflow: TextOverflow.ellipsis,
            maxLines: 3,
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Text(
                    productInfo.price.toWon(),
                    style: textTheme.titleMedium?.priceCopyWith(),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    productInfo.originalPrice.toWon(),
                    style: textTheme.titleMedium?.originalPriceCopyWith(),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: colorScheme.outline),
                      borderRadius: const BorderRadius.all(Radius.circular(4)),
                    ),
                    width: _counterWidth,
                    height: _counterHeight,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        SvgIconButton(
                          icon: AppIcons.subtract,
                          color: (quantity != 1)
                              ? colorScheme.contentPrimary
                              : colorScheme.contentFourth,
                          padding: _iconPadding,
                          onPressed: () => context.read<CartBloc>().add(
                            CartQuantityDecreased(),
                          ),
                        ),
                        Text('$quantity', style: textTheme.labelLarge.semiBold),
                        SvgIconButton(
                          icon: AppIcons.add,
                          color: colorScheme.contentPrimary,
                          padding: _iconPadding,
                          onPressed: () => context.read<CartBloc>().add(
                            CartQuantityIncreased(),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 12),
          const Divider(thickness: 1),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(vertical: 2, horizontal: 6),
                decoration: BoxDecoration(
                  color: Color(0xFFF5C142),
                  borderRadius: BorderRadius.all(Radius.circular(9)),
                ),
                child: Text(
                  '적립',
                  style: textTheme.labelSmall.semiBold?.copyWith(
                    color: colorScheme.surface,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text(
                '로그인 후, 할인 및 적립 혜택 적용',
                style: textTheme.labelMedium?.copyWith(
                  color: colorScheme.contentSecondary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
