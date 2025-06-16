import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../cubit/bottom_nav_cubit.dart';
import '../../cubit/mall_type_cubit.dart';

class DefaultAppBar extends StatelessWidget {
  const DefaultAppBar(this.bottomNav, {super.key});

  final BottomNav bottomNav;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MallTypeCubit, MallType>(
      builder: (_, state) {
        return Container(
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
          color: (state.isMarket)
              ? Theme.of(context).colorScheme.primary
              : Theme.of(context).colorScheme.surface,
          child: AppBar(
            title: Text(
              bottomNav.toName,
              style: TextStyle(
                color: (state.isMarket)
                    ? Theme.of(context).colorScheme.onPrimary
                    : Theme.of(context).colorScheme.primary,
                fontSize: 20,
              ),
            ),
            backgroundColor: Colors.transparent,
            centerTitle: true,
          ),
        );
      },
    );
  }
}
