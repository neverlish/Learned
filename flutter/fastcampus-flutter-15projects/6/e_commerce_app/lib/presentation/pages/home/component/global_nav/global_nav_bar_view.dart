import 'package:flutter/material.dart';

import '../../../../../core/utils/constant.dart';
import '../../../../../domain/model/display/menu/menu.model.dart';

class GlobalNavBarView extends StatelessWidget {
  const GlobalNavBarView(this.mallType, this.menus, {super.key});

  final List<Menu> menus;
  final MallType mallType;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: TabBarView(
        children: List.generate(
          menus.length,
          (index) => Column(
            children: [
              Text('mallType: $mallType'),
              Text('menu: ${menus[index].title}'),
            ],
          ),
        ),
      ),
    );
  }
}
