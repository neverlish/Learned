import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/constant/app_icons.dart';
import '../../../core/theme/custom/custom_font_weight.dart';
import '../../../core/theme/custom/custom_theme.dart';
import '../../../core/utils/constant.dart';
import '../../main/component/widgets/svg_icon_button.dart';
import 'bloc/cart_list_bloc/cart_list_bloc.dart';
import 'component/cart_product_card.dart';
import 'component/cart_total_price.dart';

class CartListPage extends StatelessWidget {
  const CartListPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: BlocProvider.of<CartListBloc>(context)..add(CartListInitialized()),
      child: const CartListView(),
    );
  }
}

class CartListView extends StatelessWidget {
  const CartListView({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        leading: Center(
          child: SvgIconButton(
            icon: AppIcons.close,
            color: colorScheme.contentPrimary,
            onPressed: () {
              if (context.canPop()) {
                context.pop();
              }
            },
          ),
        ),
        title: Text(
          '장바구니',
          style: textTheme.titleMedium.semiBold?.copyWith(
            color: colorScheme.contentPrimary,
          ),
        ),
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(48),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    SvgIconButton(
                      icon: AppIcons.checkMarkCircle,
                      color: colorScheme.contentFourth,
                      onPressed: null,
                    ),
                    const SizedBox(width: 8),
                    BlocBuilder<CartListBloc, CartListState>(
                      builder: (context, state) {
                        return Text(
                          '전체 선택 (${state.selectedProduct.length}/${state.cartList.length})',
                        );
                      },
                    ),
                  ],
                ),
                GestureDetector(
                  child: Text(
                    '선택 삭제',
                    style: textTheme.titleSmall.semiBold?.copyWith(
                      color: colorScheme.contentSecondary,
                    ),
                  ),
                  onTap: null,
                ),
              ],
            ),
          ),
        ),
        backgroundColor: colorScheme.surface,
        centerTitle: true,
      ),
      body: BlocBuilder<CartListBloc, CartListState>(
        builder: (_, state) {
          switch (state.status) {
            case Status.initial:
            case Status.loading:
            case Status.error:
              return const Center(child: CircularProgressIndicator());
            case Status.success:
              return ListView(
                children: [
                  Divider(height: 8, thickness: 8, color: colorScheme.surface),
                  Column(
                    children: List.generate(
                      state.cartList.length,
                      (index) => CartProductCard(cart: state.cartList[index]),
                    ),
                  ),
                  CartTotalPrice(isEmpty: state.cartList.isEmpty),
                ],
              );
          }
        },
      ),
    );
  }
}
