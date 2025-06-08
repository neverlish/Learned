import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/widget/round_button_theme.dart';
import 'package:fast_app_base/common/widget/w_empty_expanded.dart';
import 'package:fast_app_base/common/widget/w_round_button.dart';
import 'package:fast_app_base/screen/dialog/d_message.dart';
import 'package:fast_app_base/screen/webview/browser_in_app_webview.dart' as in_app_webview;
import 'package:fast_app_base/screen/webview/browser_webview_flutter.dart' as webview_flutter;
import 'package:fast_app_base/screen/webview/example.dart';
import 'package:fast_app_base/screen/webview/notice.dart';
import 'package:flutter/material.dart';

import '../../../dialog/d_color_bottom.dart';
import '../../../dialog/d_confirm.dart';

class HomeFragment extends StatelessWidget {
  const HomeFragment({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.green.withOpacity(0.2),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              IconButton(
                onPressed: () => openDrawer(context),
                icon: const Icon(Icons.menu),
              )
            ],
          ),
          const EmptyExpanded(),
          RoundButton(
            text: 'Snackbar 보이기',
            onTap: () => showSnackbar(context),
            theme: RoundButtonTheme.blue,
          ),
          const Height(20),
          RoundButton(
            text: 'Confirm 다이얼로그',
            onTap: () => showConfirmDialog(context),
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: 'Message 다이얼로그',
            onTap: showMessageDialog,
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: 'webview example',
            onTap: () => Nav.push(const WebViewExample()),
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: '인앱브라우저 - webview_flutter',
            onTap: _showBrowserWebViewFlutter,
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: '인앱브라우저 - flutter_inappwebview',
            onTap: _showBrowserInAppWebView,
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: 'webview 공지사항',
            onTap: () => Nav.push(const Notice()),
            theme: RoundButtonTheme.whiteWithBlueBorder,
          ),
          const Height(20),
          RoundButton(
            text: '메뉴 보기',
            onTap: () => openDrawer(context),
            theme: RoundButtonTheme.blink,
          ),
          const EmptyExpanded()
        ],
      ),
    );
  }

  void showSnackbar(BuildContext context) {
    context.showSnackbar('snackbar 입니다.',
        extraButton: Tap(
          onTap: () {
            context.showErrorSnackbar('error');
          },
          child: '에러 보여주기 버튼'.text.white.size(13).make().centered().pSymmetric(h: 10, v: 5),
        ));
  }

  Future<void> showConfirmDialog(BuildContext context) async {
    final confirmDialogResult = await ConfirmDialog(
      '오늘 기분이 좋나요?',
      buttonText: "네",
      cancelButtonText: "아니오",
    ).show();
    debugPrint(confirmDialogResult?.isSuccess.toString());

    confirmDialogResult?.runIfSuccess((data) {
      ColorBottomSheet(
        '❤️',
        context: context,
        backgroundColor: Colors.yellow.shade200,
      ).show();
    });

    confirmDialogResult?.runIfFailure((data) {
      ColorBottomSheet(
        '❤️힘내여',
        backgroundColor: Colors.yellow.shade300,
        textColor: Colors.redAccent,
      ).show();
    });
  }

  Future<void> showMessageDialog() async {
    final result = await MessageDialog("안녕하세요").show();
    debugPrint(result.toString());
  }

  Future<void> _showBrowserWebViewFlutter() async {
    return Nav.pushFromBottom(
        const webview_flutter.Browser(url: 'https://fastcampus.co.kr/dev_online_dartflutter'));
  }

  Future<void> _showBrowserInAppWebView() async {
    return Nav.pushFromBottom(
        const in_app_webview.Browser(url: 'https://fastcampus.co.kr/dev_online_dartflutter'));
  }

  void openDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }
}
