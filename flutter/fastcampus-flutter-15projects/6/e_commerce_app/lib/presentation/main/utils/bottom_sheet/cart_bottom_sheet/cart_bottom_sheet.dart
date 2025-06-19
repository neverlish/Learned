import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../bloc/cart_bloc/cart_bloc.dart';
import 'widgets/add_cart_btn.dart';
import 'widgets/cart_price_info.dart';
import 'widgets/cart_product_info.dart';

Future<bool?> cartBottomSheet(BuildContext context) {
  return showModalBottomSheet(
    context: context,
    builder: (_) {
      return SafeArea(
        child: SingleChildScrollView(
          child: BlocBuilder<CartBloc, CartState>(
            builder: (_, state) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CartProductInfo(productInfo: state.productInfo),
                  Divider(thickness: 1),
                  CartPriceInfo(
                    productInfo: state.productInfo,
                    quantity: state.quantity,
                  ),
                  AddCartBtn(totalPrice: state.totalPrice),
                ],
              );
            },
          ),
        ),
      );
    },
    shape: RoundedRectangleBorder(
      borderRadius: const BorderRadius.vertical(top: Radius.circular(12.0)),
    ),
    showDragHandle: true,
  );
}
