import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../../core/utils/extensions.dart';
import '../../../../main/component/placeholder/home_placeholder.dart';
import '../../bloc/view_module_bloc/view_module_bloc.dart';
import '../footer/footer.dart';

class ViewModuleList extends StatefulWidget {
  final int tabId;

  const ViewModuleList({super.key, required this.tabId});

  @override
  State<ViewModuleList> createState() => _ViewModuleListState();
}

class _ViewModuleListState extends State<ViewModuleList> {
 

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      child: NotificationListener(
        child: BlocBuilder<ViewModuleBloc, ViewModuleState>(
          builder: (_, state) {
            return (state.status.isInitial || state.viewModules.isEmpty)
                ? HomePlaceholder()
                : ListView.builder(
                    itemBuilder: (_, index) {
                      return Column(
                        children: [
                          ...state.viewModules,
                          if (state.status.isLoading) LoadingWidget(),
                          Footer(),
                        ],
                      );
                    },
                    itemCount: state.viewModules.length,
                  );
          },
        ),
        onNotification: (ScrollNotification notification) {
          final maxScroll = notification.metrics.maxScrollExtent;
          final curScroll = notification.metrics.pixels;

          if (curScroll >= maxScroll * 0.9) {
            context.read<ViewModuleBloc>().add(ViewModuleFetched());
          }
          return false;
        },
      ),
      onRefresh: () async => context.read<ViewModuleBloc>().add(
        ViewModuleInitialized(tabId: widget.tabId, isRefresh: true),
      ),
    );
  }
}

class LoadingWidget extends StatelessWidget {
  const LoadingWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      child: Center(
        child: SizedBox(
          height: 20,
          width: 20,
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }
}
