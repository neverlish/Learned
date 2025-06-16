import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../../../core/theme/constant/app_icons.dart';
import '../../../../core/theme/custom/custom_theme.dart';
import '../../cubit/mall_type_cubit.dart';

class HomeAppBar extends StatelessWidget {
  const HomeAppBar({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MallTypeCubit, MallType>(
      builder: (_, state) {
        return AnimatedContainer(
          padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
          color: (state.isMarket)
              ? Theme.of(context).colorScheme.primary
              : Theme.of(context).colorScheme.surface,
          child: AppBar(
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: SvgPicture.asset(
                AppIcons.mainLogo,
                colorFilter: ColorFilter.mode(
                  state.isMarket
                      ? Theme.of(context).colorScheme.onPrimary
                      : Theme.of(context).colorScheme.primary,
                  BlendMode.srcIn,
                ),
              ),
            ),
            title: DefaultTabController(
              length: MallType.values.length,
              initialIndex: state.index,
              child: TabBar(
                tabs: List.generate(
                  MallType.values.length,
                  (index) => Tab(text: MallType.values[index].toName),
                ),
                labelColor: Colors.black,
                unselectedLabelColor: Colors.black,
                onTap: (index) =>
                    context.read<MallTypeCubit>().changeMallType(index),
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.all(4.0),
                child: SvgPicture.asset(
                  AppIcons.location,
                  colorFilter: ColorFilter.mode(
                    state.isMarket
                        ? Theme.of(context).colorScheme.surface
                        : Theme.of(context).colorScheme.contentPrimary,
                    BlendMode.srcIn,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(4.0),
                child: SvgPicture.asset(
                  AppIcons.cart,
                  colorFilter: ColorFilter.mode(
                    state.isMarket
                        ? Theme.of(context).colorScheme.surface
                        : Theme.of(context).colorScheme.contentPrimary,
                    BlendMode.srcIn,
                  ),
                ),
              ),
            ],
            backgroundColor: Colors.transparent,
            centerTitle: true,
            leadingWidth: 86,
          ),
          duration: const Duration(milliseconds: 400),
        );
      },
    );
  }
}
