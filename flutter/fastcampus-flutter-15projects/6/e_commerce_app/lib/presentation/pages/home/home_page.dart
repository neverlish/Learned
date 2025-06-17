import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../core/utils/constant.dart';
import '../../../core/utils/dialog/common_dialog.dart';
import '../../../domain/usecase/display/display.usecase.dart';
import '../../../service_locator.dart';
import '../../main/cubit/mall_type_cubit.dart';
import 'bloc/menu_bloc.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MallTypeCubit, MallType>(
      builder: (context, state) {
        return BlocProvider(
          create: (_) =>
              MenuBloc(locator<DisplayUsecase>())..add(MenuInitialized(state)),
          child: HomePageView(),
        );
      },
    );
  }
}

class HomePageView extends StatelessWidget {
  const HomePageView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<MallTypeCubit, MallType>(
      listener: (context, state) =>
          context.read<MenuBloc>().add(MenuInitialized(state)),
      listenWhen: (prev, curr) => prev.index != curr.index,
      child: BlocConsumer<MenuBloc, MenuState>(
        builder: (_, state) {
          switch (state.status) {
            case Status.initial:
            case Status.loading:
              return Center(child: CircularProgressIndicator());
            case Status.success:
              return Center(child: Text('${state.menus}'));
            case Status.error:
              return Center(child: Text('error'));
          }
        },
        listener: (context, state) async {
          if (state.status == Status.error) {
            final bool result =
                (await CommonDialog.errorDialog(context, state.error)) ?? false;
            if (result) {
              context.read<MenuBloc>().add(MenuInitialized(MallType.market));
            }
          }
        },
        listenWhen: (prev, curr) => prev.status != curr.status,
      ),
    );
  }
}
