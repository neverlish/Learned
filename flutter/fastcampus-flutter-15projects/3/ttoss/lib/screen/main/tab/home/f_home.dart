import 'dart:convert';
import 'dart:isolate';

import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/widget/w_big_button.dart';
import 'package:fast_app_base/common/widget/w_rounded_container.dart';
import 'package:fast_app_base/screen/dialog/d_message.dart';
import 'package:fast_app_base/screen/main/s_main.dart';
import 'package:fast_app_base/screen/main/tab/home/bank_accounts_dummy.dart';
import 'package:fast_app_base/screen/main/tab/home/vo/s_number.dart';
import 'package:fast_app_base/screen/main/tab/home/w_bank_account.dart';
import 'package:fast_app_base/screen/main/tab/home/w_rive_like_button.dart';
import 'package:fast_app_base/screen/main/tab/home/w_ttoss_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
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
  final double appBarHeight = 60;

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
              edgeOffset: appBarHeight,
              onRefresh: () async {},
              child: SingleChildScrollView(
                padding: EdgeInsets.only(
                  top: appBarHeight,
                  bottom: MainScreenState.bottomNavigatorHeight,
                ),
                child: Column(
                  children: [
                    SizedBox(
                      width: 250,
                      height: 250,
                      child: RiveLikeButton(
                        isLike,
                        onTapLike: (bool isLike) async {
                          debugPrint('onTapLike: $isLike');
                          setState(() {
                            this.isLike = isLike;
                          });

                          delay(() async {
                            await veryHeavyComputationWorkWithIsolateSpawn();
                          }, 250.ms);
                        },
                      ),
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
            TtossAppBar(appBarHeight: appBarHeight),
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

  Future<void> veryHeavyComputationWork() async {
    int count = 0;
    debugPrint('count start');
    final startTime = DateTime.now();

    for (int i = 0; i < 1800000000; i++) {
      count++;
      if (count % 150000000 == 0) {
        debugPrint('progress: ${count.toString()}');
        debugPrint(
            '${DateTime.now().difference(startTime).inMilliseconds / 1000}sec');
      }
    }

    print(count);
  }

  Future<void> veryHeavyComputationWorkWithIsolateSpawn() async {
    final errorPort = ReceivePort();
    errorPort.listen((element) {
      debugPrint('Isolate Error!');
      debugPrint(element);
    });
    final exitPort = ReceivePort();
    exitPort.listen((message) {
      debugPrint('Exit - Done');
    });
    final progressListenPort = ReceivePort();
    progressListenPort.listen((message) {
      debugPrint('received from isolate');
      debugPrint(message.toString());
    });
    final isolate = await Isolate.spawn((port) {
      int count = 0;
      debugPrint('Isolate Count Start');
      final startTime = DateTime.now();
      for (int i = 0; i <= 800000000; i++) {
        count += 1;

        if (i % 100000000 == 0) {
          port.send(count);
          debugPrint(
              "${DateTime.now().difference(startTime).inMilliseconds / 1000}sec");
        }

        // if (i % 10000000 == 0) {
        //   throw Exception('error');
        // }
      }
      debugPrint(count.toString());
      debugPrint(
          "${DateTime.now().difference(startTime).inMilliseconds / 1000}sec");
    }, progressListenPort.sendPort,
        onError: errorPort.sendPort, onExit: exitPort.sendPort);

    debugPrint('spawn done');
    delay(() {
      // debugPrint('force kill');
      // isolate.kill(priority: Isolate.immediate);

      // debugPrint('force exit isolate');
      // Isolate.exit(isolate.controlPort);
    }, 500.ms);
  }

  void veryHeavyComputationWorkWithIsolateRun() async {
    const message = '{"message": "Flutter is good"}';
    final isolateResult = await Isolate.run<String>(() {
      final jsonObject = json.decode(message);
      debugPrint(jsonObject["message"]);
      int count = 0;
      debugPrint('Isolate Count Start');
      final startTime = DateTime.now();
      for (int i = 0; i <= 900000000; i++) {
        count += 7;
      }

      debugPrint(count.toString());
      debugPrint(
          "${DateTime.now().difference(startTime).inMilliseconds / 1000}sec");
      return "Run Isolate Done";
    });
    debugPrint(isolateResult);
  }
}

