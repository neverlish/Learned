import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/utils/constant.dart';
import '../../../../../domain/model/display/menu/menu.model.dart';
import '../../../../../service_locator.dart';
import '../../bloc/menu_bloc/menu_bloc.dart';
import '../../bloc/view_module_bloc/view_module_bloc.dart';
import '../view_module_list/view_module_list.dart';

class GlobalNavBarView extends StatelessWidget {
  const GlobalNavBarView(this.mallType, this.menus, {super.key});

  final List<Menu> menus;
  final MallType mallType;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MenuBloc, MenuState>(
      builder: (context, state) {
        switch (state.status) {
          case Status.initial:
          case Status.loading:
            return const Expanded(
              child: Center(child: CircularProgressIndicator()),
            );
          case Status.success:
            return Expanded(
              child: TabBarView(
                children: List.generate(state.menus.length, (index) {
                  return BlocProvider(
                    create: (_) => locator<ViewModuleBloc>()
                      ..add(ViewModuleInitialized(tabId: menus[index].tabId)),
                    child: ViewModuleList(),
                  );
                },
                ),
              ),
            );
          case Status.error:
            return const Center(child: Text('menu_module_bloc error'));
        }
      },
    );
  }
}
