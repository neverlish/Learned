import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/utils/constant.dart';
import '../../../../../domain/model/display/menu/menu.model.dart';
import '../../../../../domain/usecase/display/display.usecase.dart';
import '../../../../../service_locator.dart';
import '../../bloc/menu_bloc/menu_bloc.dart';
import '../../bloc/view_module_bloc/view_module_bloc.dart';

class GlobalNavBarView extends StatelessWidget {
  const GlobalNavBarView(this.mallType, this.menus, {super.key});

  final List<Menu> menus;
  final MallType mallType;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<MenuBloc, MenuState>(
      builder: (context, state) {
        return Expanded(
          child: TabBarView(
            children: List.generate(
              state.menus.length, (index) {
              return BlocProvider(
                create: (_) =>
                    ViewModuleBloc(locator<DisplayUsecase>())
                      ..add(ViewModuleInitialized(tabId: menus[index].tabId)),
                child: ViewModuleList(),
              );
            }),
          ),
        );
      },
    );
  }
}

class ViewModuleList extends StatelessWidget {
  const ViewModuleList({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ViewModuleBloc, ViewModuleState>(
      builder: (_, state) {
        switch (state.status) {
          case Status.initial:
          case Status.loading:
            return const Center(child: CircularProgressIndicator());
          case Status.success:
            return Column(
              children: [
                Container(
                  color: Colors.deepOrangeAccent,
                  height: 50,
                  child: Center(child: Text('${state.tabId}')),
                ),
                Expanded(
                  child: ListView.separated(
                    itemBuilder: (_, index) {
                      return SizedBox(
                        height: 200,
                        child: Center(
                          child: Text('${state.viewModules[index].type}'),
                        ),
                      );
                    },
                    separatorBuilder: (_, index) => Divider(thickness: 4),
                    itemCount: state.viewModules.length,
                  ),
                ),
              ],
            );
          case Status.error:
            return Center(child: Text('error'));
        }
      },
    );
  }
}
