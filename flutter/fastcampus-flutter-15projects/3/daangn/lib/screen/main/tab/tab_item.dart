import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/screen/main/tab/chat/f_chat.dart';
import 'package:fast_app_base/screen/main/tab/home/f_home.dart';
import 'package:fast_app_base/screen/main/tab/local_life/f_local_life.dart';
import 'package:fast_app_base/screen/main/tab/my/f_my.dart';
import 'package:fast_app_base/screen/main/tab/near_me/f_near_me.dart';
import 'package:flutter/material.dart';

enum TabItem {
home(Icons.home, 'home', HomeFragment()),
  localLife(Icons.holiday_village_outlined, 'local_life', LocalLifeFragment()),
  nearMe(Icons.pin_drop_outlined, 'nearMe', NearMeFragment()),
  chat(Icons.chat_bubble_outline, 'chat', ChatFragment()),
  my(Icons.person_outline_rounded, 'my_daangn', MyFragment());

  final IconData activeIcon;
  final IconData inActiveIcon;
  final String tabNameKey;
  final Widget firstPage;

  const TabItem(this.activeIcon, this.tabNameKey, this.firstPage,
      {IconData? inActiveIcon})
      : inActiveIcon = inActiveIcon ?? activeIcon;

  static TabItem find(String? name) {
    return values.asNameMap()[name] ?? TabItem.home;
  }

  BottomNavigationBarItem toNavigationBarItem(BuildContext context,
      {required bool isActivated}) {
    return BottomNavigationBarItem(
        icon: Icon(
          key: ValueKey(tabNameKey),
          isActivated ? activeIcon : inActiveIcon,
          color: isActivated
              ? context.appColors.iconButton
              : context.appColors.iconButtonInactivate,
        ),
        label: tabNameKey.tr());
  }
}
