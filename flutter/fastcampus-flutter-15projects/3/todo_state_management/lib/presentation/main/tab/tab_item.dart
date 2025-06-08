import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/presentation/main/tab/search/f_search.dart';
import 'package:fast_app_base/presentation/main/tab/todo/f_todo.dart';
import 'package:flutter/material.dart';

enum TabItem {
  home(Icons.event_note_outlined, 'ToDo', TodoFragment()),
  favorite(Icons.search, 'Search', SearchFragment());

  final IconData activeIcon;
  final IconData inActiveIcon;
  final String tabName;
  final Widget firstPage;

  const TabItem(this.activeIcon, this.tabName, this.firstPage, {IconData? inActiveIcon})
      : inActiveIcon = inActiveIcon ?? activeIcon;

  BottomNavigationBarItem toNavigationBarItem(BuildContext context, {required bool isActivated}) {
    return BottomNavigationBarItem(
        icon: Icon(
          key: ValueKey(tabName),
          isActivated ? activeIcon : inActiveIcon,
          color: isActivated ? context.appColors.iconButton : context.appColors.iconButtonInactivate,
        ),
        label: tabName);
  }
}
