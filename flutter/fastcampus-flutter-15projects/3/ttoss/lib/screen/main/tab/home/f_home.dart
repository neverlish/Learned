import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/widget/w_big_button.dart';
import 'package:fast_app_base/common/widget/w_rounded_container.dart';
import 'package:fast_app_base/screen/dialog/d_message.dart';
import 'package:fast_app_base/screen/main/s_main.dart';
import 'package:fast_app_base/screen/main/tab/home/bank_accounts_dummy.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/s_number.dart';
import 'package:fast_app_base/screen/main/tab/home/w_bank_account.dart';
import 'package:fast_app_base/screen/main/tab/home/w_ttoss_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:live_background/object/palette.dart';
import 'package:live_background/widget/live_background_widget.dart';

import '../../../dialog/d_color_bottom.dart';
import '../../../dialog/d_confirm.dart';

class HomeFragment extends StatefulWidget {
  const HomeFragment({
    Key? key,
  }) : super(key: key);

  @override
  State<HomeFragment> createState() => _HomeFragmentState();
}

class _HomeFragmentState extends State<HomeFragment> {
  bool isLike = false;
  // int count = 0;

  late final stream = countStream(5).asBroadcastStream();

  @override
  void initState() {
    // countStream(5).listen((event) {
    //   setState(() {
    //     count = event;
    //   });
    // });
    super.initState();
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.black,
      child: Container(
        child: Stack(
          children: [
            const LiveBackgroundWidget(
              palette: Palette(colors: [Colors.red, Colors.green]),
              velocityX: 1,
              particleMaxSize: 20,
            ),
            RefreshIndicator(
              edgeOffset: TtossAppBar.appBarHeight,
              onRefresh: () async {},
              child: SingleChildScrollView(
                padding: const EdgeInsets.only(
                  top: TtossAppBar.appBarHeight,
                  bottom: MainScreenState.bottomNavigatorHeight,
                ),
                child: Column(
                  children: [
                    StreamBuilder(
                      stream: stream,
                      builder: (context, snapshot) {
                        final count = snapshot.data;

                        switch (snapshot.connectionState) {
                          case ConnectionState.active:
                            if (count == null) {
                              return const CircularProgressIndicator();
                            }
                            return count.text.size(30).bold.make();
                          case ConnectionState.waiting:
                          case ConnectionState.none:
                            return const CircularProgressIndicator();
                          case ConnectionState.done:
                            return '완료'.text.size(30).bold.make();
                        }

                        // if (count == null) {
                        //   return const CircularProgressIndicator();
                        // }
                        // return count.text.size(30).bold.make();
                      },
                    ),
                    StreamBuilder(
                      stream: stream,
                      builder: (context, snapshot) {
                        final count = snapshot.data;

                        switch (snapshot.connectionState) {
                          case ConnectionState.active:
                            if (count == null) {
                              return const CircularProgressIndicator();
                            }
                            return count.text.size(30).bold.make();
                          case ConnectionState.waiting:
                          case ConnectionState.none:
                            return const CircularProgressIndicator();
                          case ConnectionState.done:
                            return '완료'.text.size(30).bold.make();
                        }

                        // if (count == null) {
                        //   return const CircularProgressIndicator();
                        // }
                        // return count.text.size(30).bold.make();
                      },
                    ),
                    BigButton(
                      "토스뱅크",
                      onTap: () async {
                        print('start');
                        final result = await Nav.push(const NumberScreen());
                        print(result);
                        print('end');
                      },
                    ),
                    height10,
                    RoundedContainer(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          "자산".text.bold.white.make(),
                          height5,
                          ...bankAccounts
                              .map((e) => BankAccountWidget(e))
                              .toList()
                        ],
                      ),
                    ),
                  ],
                )
                    .pSymmetric(h: 20),
              ),
            ),
            const TtossAppBar(),
          ],
        ),
      ),
    );
  }

  Stream<int> countStream(int max) async* {
    await sleepAsync(2.seconds);
    for (int i = 1; i <= max; i++) {
      await sleepAsync(1.seconds);
      yield i;
    }
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

  void openDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }
}

